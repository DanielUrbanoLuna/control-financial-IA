// Caso de uso: parsear input del usuario y guardar la transacción

import type { ITransactionRepository } from '@/domain/repositories/transaction-repository';
import type { IAIParser } from '@/domain/services/ai-parser';
import type { Transaction } from '@/domain/entities/transaction';
import { randomUUID } from 'crypto';

export class AddTransactionUseCase {
  constructor(
    private readonly repository: ITransactionRepository,
    private readonly aiParser: IAIParser,
  ) {}

  async execute(rawInput: string): Promise<Transaction> {
    // La IA interpreta la frase del usuario
    const parsed = await this.aiParser.parseTransaction(rawInput);

    const transaction: Transaction = {
      id: randomUUID(),
      ...parsed,
      rawInput,
      createdAt: new Date(),
    };

    return this.repository.save(transaction);
  }
}
