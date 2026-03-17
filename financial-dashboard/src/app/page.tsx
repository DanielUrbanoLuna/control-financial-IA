'use client';

// Página principal — gestiona el estado global y conecta la IA con el Bento Grid

import { useState, useMemo, useEffect } from 'react';
import { HeroSection } from '@/presentation/components/dashboard/HeroSection';
import { BentoGrid } from '@/presentation/components/dashboard/BentoGrid';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';
import type { Transaction, Balance } from '@/domain/entities/transaction';

// La API devuelve createdAt como string ISO — necesitamos convertirlo a Date
interface ApiTransaction extends Omit<Transaction, 'createdAt'> {
  createdAt: string;
}

function computeBalance(transactions: Transaction[]): Balance {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  return { total: totalIncome - totalExpenses, totalIncome, totalExpenses };
}

export default function HomePage() {
  // Inicializar con mock data para visualizar la UI sin necesidad de llamadas previas
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Balance derivado — se recalcula automáticamente al añadir transacciones
  const balance = useMemo(() => computeBalance(transactions), [transactions]);

  const [currentMonth, setCurrentMonth] = useState('');
  useEffect(() => {
    setCurrentMonth(new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }));
  }, []);

  const handleSubmit = async (rawInput: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/parse-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Error al procesar la transacción');
      }

      const apiTransaction: ApiTransaction = data.transaction;

      // Convertir la fecha de string ISO a objeto Date
      const newTransaction: Transaction = {
        ...apiTransaction,
        createdAt: new Date(apiTransaction.createdAt),
      };

      // Añadir al principio de la lista para que aparezca inmediatamente
      setTransactions((prev) => [newTransaction, ...prev]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#2a2a2a]">
        <span className="text-sm font-semibold text-[#f5f5f5] tracking-tight">
          fintrack<span className="text-indigo-400">.</span>
        </span>
        <span className="text-xs text-[#525252]">
          {currentMonth}
        </span>
      </nav>

      {/* Hero + Input inteligente */}
      <HeroSection
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />

      {/* Bento Grid — se actualiza en tiempo real al añadir transacciones */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-16"
        aria-label="Panel de finanzas"
      >
        <BentoGrid
          transactions={transactions}
          balance={balance}
        />
      </section>

    </main>
  );
}
