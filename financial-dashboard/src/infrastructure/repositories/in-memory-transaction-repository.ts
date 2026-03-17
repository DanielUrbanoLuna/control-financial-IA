// Implementación en memoria del repositorio — útil para desarrollo y tests
// Reemplazar por implementación con base de datos en producción

import type { ITransactionRepository } from '@/domain/repositories/transaction-repository';
import type { Transaction, Balance } from '@/domain/entities/transaction';

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Map<string, Transaction> = new Map();

  async save(transaction: Transaction): Promise<Transaction> {
    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  async findAll(): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactions.get(id) ?? null;
  }

  async delete(id: string): Promise<void> {
    this.transactions.delete(id);
  }

  async getBalance(): Promise<Balance> {
    const all = Array.from(this.transactions.values());

    const totalIncome = all
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = all
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      total: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
    };
  }
}
