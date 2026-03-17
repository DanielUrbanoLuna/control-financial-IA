// Contrato del repositorio — el dominio define la interfaz, la infraestructura la implementa

import type { Transaction, Balance } from '../entities/transaction';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  delete(id: string): Promise<void>;
  getBalance(): Promise<Balance>;
}
