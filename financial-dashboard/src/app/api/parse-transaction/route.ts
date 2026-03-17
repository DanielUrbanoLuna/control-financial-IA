// API Route — recibe texto libre del usuario y devuelve una Transaction clasificada por la IA
// Solo se ejecuta en el servidor (Node.js runtime de Next.js)

import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { ClaudeParser } from '@/infrastructure/ai/claude-parser';
import type { Transaction } from '@/domain/entities/transaction';

interface ParseTransactionRequest {
  rawInput: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: ParseTransactionRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'El cuerpo de la petición no es JSON válido' },
      { status: 400 },
    );
  }

  const { rawInput } = body;

  if (!rawInput || typeof rawInput !== 'string' || rawInput.trim().length === 0) {
    return NextResponse.json(
      { error: 'El campo rawInput es obligatorio y no puede estar vacío' },
      { status: 400 },
    );
  }

  if (rawInput.trim().length > 500) {
    return NextResponse.json(
      { error: 'La descripción es demasiado larga (máximo 500 caracteres)' },
      { status: 400 },
    );
  }

  try {
    const parser = new ClaudeParser();
    const parsed = await parser.parseTransaction(rawInput.trim());

    const transaction: Transaction = {
      id: randomUUID(),
      ...parsed,
      rawInput: rawInput.trim(),
      createdAt: new Date(),
    };

    return NextResponse.json({ transaction }, { status: 201 });

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[parse-transaction] Error:', message);

    // Distinguir errores de configuración de errores de la IA
    if (message.includes('ANTHROPIC_API_KEY')) {
      return NextResponse.json(
        { error: 'El servidor no está configurado correctamente. Falta la API Key.' },
        { status: 500 },
      );
    }

    const detail = process.env.NODE_ENV === 'development' ? ` (${message})` : '';
    return NextResponse.json(
      { error: `No se pudo procesar la transacción. Intenta reformular la frase.${detail}` },
      { status: 500 },
    );
  }
}
