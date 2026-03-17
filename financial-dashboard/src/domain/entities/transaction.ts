// Entidades puras del dominio — sin dependencias externas

export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'health'
  | 'shopping'
  | 'housing'
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  rawInput: string; // Frase original del usuario
  createdAt: Date;
}

export interface Balance {
  total: number;
  totalIncome: number;
  totalExpenses: number;
}
