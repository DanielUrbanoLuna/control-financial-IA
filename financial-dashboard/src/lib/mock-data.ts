// Datos de prueba tipados — se eliminan cuando la API esté operativa

import type { Transaction, Balance } from '@/domain/entities/transaction';

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 1800,
    type: 'income',
    category: 'salary',
    description: 'Nómina de marzo',
    rawInput: 'Cobré mi nómina de 1800€',
    createdAt: new Date('2026-03-01T09:00:00'),
  },
  {
    id: '2',
    amount: 20,
    type: 'expense',
    category: 'food',
    description: 'Sushi para cenar',
    rawInput: 'He gastado 20€ en sushi',
    createdAt: new Date('2026-03-10T21:30:00'),
  },
  {
    id: '3',
    amount: 45,
    type: 'expense',
    category: 'transport',
    description: 'Gasolina',
    rawInput: 'Pagué 45€ de gasolina',
    createdAt: new Date('2026-03-11T11:15:00'),
  },
  {
    id: '4',
    amount: 300,
    type: 'income',
    category: 'freelance',
    description: 'Proyecto freelance diseño web',
    rawInput: 'Ingresé 300€ de un proyecto freelance',
    createdAt: new Date('2026-03-12T16:00:00'),
  },
  {
    id: '5',
    amount: 9.99,
    type: 'expense',
    category: 'entertainment',
    description: 'Suscripción Netflix',
    rawInput: 'Pagué 9.99€ de Netflix',
    createdAt: new Date('2026-03-13T00:00:00'),
  },
  {
    id: '6',
    amount: 120,
    type: 'expense',
    category: 'shopping',
    description: 'Ropa nueva',
    rawInput: 'Gasté 120€ en ropa',
    createdAt: new Date('2026-03-14T17:45:00'),
  },
];

export const MOCK_BALANCE: Balance = {
  totalIncome: MOCK_TRANSACTIONS
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0),
  totalExpenses: MOCK_TRANSACTIONS
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0),
  get total() {
    return this.totalIncome - this.totalExpenses;
  },
};
