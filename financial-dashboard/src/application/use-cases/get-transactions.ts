// Caso de uso: obtener todas las transacciones y el balance

import type { ITransactionRepository } from '@/domain/repositories/transaction-repository';
import type { Transaction, Balance } from '@/domain/entities/transaction';

export class GetTransactionsUseCase {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute(): Promise<{ transactions: Transaction[]; balance: Balance }> {
    const [transactions, balance] = await Promise.all([
      this.repository.findAll(),
      this.repository.getBalance(),
    ]);

    return { transactions, balance };
  }
}
