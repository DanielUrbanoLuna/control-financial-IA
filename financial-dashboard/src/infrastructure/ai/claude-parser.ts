// Implementación concreta del parser de IA usando Claude (Anthropic)
// Solo se ejecuta en el servidor — nunca exponer en el cliente

import Anthropic from '@anthropic-ai/sdk';
import type { IAIParser, ParsedTransaction } from '@/domain/services/ai-parser';
import type { TransactionType, TransactionCategory } from '@/domain/entities/transaction';

// Categorías válidas del dominio — usadas para validar la respuesta de la IA
const VALID_CATEGORIES: TransactionCategory[] = [
  'food', 'transport', 'entertainment', 'health',
  'shopping', 'housing', 'salary', 'freelance', 'investment', 'other',
];

const VALID_TYPES: TransactionType[] = ['income', 'expense'];

const SYSTEM_PROMPT = `Eres un extractor de datos financieros. El usuario te describe un gasto o ingreso en lenguaje natural (en español).

Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, sin markdown, sin bloques de código. Solo el JSON.

Estructura exacta:
{
  "amount": number,
  "type": "income" | "expense",
  "category": "food" | "transport" | "entertainment" | "health" | "shopping" | "housing" | "salary" | "freelance" | "investment" | "other",
  "description": string
}

Reglas:
- amount: número positivo en euros. "20€" → 20, "1.500€" → 1500, "9,99€" → 9.99.
- type: "expense" para gastos/pagos/compras. "income" para ingresos/cobros/nóminas/transferencias recibidas.
- category:
    food          → comida, restaurante, supermercado, sushi, café, bar
    transport     → gasolina, taxi, metro, bus, tren, parking, Uber
    entertainment → ocio, cine, concierto, Netflix, Spotify, videojuegos, suscripciones
    health        → médico, farmacia, gimnasio, dentista, psicólogo
    shopping      → ropa, zapatos, electrónica, Amazon, compras en general
    housing       → alquiler, hipoteca, luz, agua, gas, internet, comunidad
    salary        → nómina, sueldo mensual
    freelance     → proyecto freelance, factura cliente, trabajo independiente
    investment    → bolsa, cripto, fondos, dividendos
    other         → cualquier cosa que no encaje en las anteriores
- description: frase corta y clara en español, máximo 40 caracteres.`;

interface RawParsedResponse {
  amount: unknown;
  type: unknown;
  category: unknown;
  description: unknown;
}

export class ClaudeParser implements IAIParser {
  private readonly client: Anthropic;

  constructor() {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY no está definida en las variables de entorno');
    }
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  async parseTransaction(rawInput: string): Promise<ParsedTransaction> {
    const message = await this.client.messages.create({
      // Haiku: rápido y económico para extracción estructurada simple
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: rawInput }],
    });

    const firstBlock = message.content[0];
    if (firstBlock.type !== 'text') {
      throw new Error('La IA devolvió un tipo de contenido inesperado');
    }

    const cleaned = firstBlock.text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    const raw: RawParsedResponse = JSON.parse(cleaned);

    return this.validate(raw);
  }

  // Valida y normaliza la respuesta antes de devolverla al caso de uso
  private validate(raw: RawParsedResponse): ParsedTransaction {
    const amount = Number(raw.amount);
    if (!isFinite(amount) || amount <= 0) {
      throw new Error(`Cantidad inválida recibida de la IA: ${raw.amount}`);
    }

    if (!VALID_TYPES.includes(raw.type as TransactionType)) {
      throw new Error(`Tipo inválido recibido de la IA: ${raw.type}`);
    }

    if (!VALID_CATEGORIES.includes(raw.category as TransactionCategory)) {
      throw new Error(`Categoría inválida recibida de la IA: ${raw.category}`);
    }

    return {
      amount,
      type: raw.type as TransactionType,
      category: raw.category as TransactionCategory,
      description: String(raw.description).slice(0, 40),
    };
  }
}
