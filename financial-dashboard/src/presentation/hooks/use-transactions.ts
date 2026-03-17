'use client';

// Hook personalizado para gestionar el estado de transacciones en el cliente

import { useState, useCallback } from 'react';
import type { Transaction, Balance } from '@/domain/entities/transaction';

interface UseTransactionsReturn {
  transactions: Transaction[];
  balance: Balance;
  isLoading: boolean;
  error: string | null;
  addTransaction: (rawInput: string) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const EMPTY_BALANCE: Balance = { total: 0, totalIncome: 0, totalExpenses: 0 };

export function useTransactions(): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>(EMPTY_BALANCE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/transactions');
      if (!res.ok) throw new Error('Error al cargar las transacciones');
      const data = await res.json();
      setTransactions(data.transactions);
      setBalance(data.balance);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTransaction = useCallback(async (rawInput: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawInput }),
      });
      if (!res.ok) throw new Error('Error al añadir la transacción');
      const newTransaction: Transaction = await res.json();
      setTransactions((prev) => [newTransaction, ...prev]);
      // Refrescar balance tras añadir
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  const deleteTransaction = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar la transacción');
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  return { transactions, balance, isLoading, error, addTransaction, deleteTransaction, refresh };
}
