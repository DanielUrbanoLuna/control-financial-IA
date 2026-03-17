// Interfaz del servicio de IA — el dominio no sabe qué modelo se usa

import type { TransactionType, TransactionCategory } from '../entities/transaction';

export interface ParsedTransaction {
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
}

export interface IAIParser {
  parseTransaction(rawInput: string): Promise<ParsedTransaction>;
}
