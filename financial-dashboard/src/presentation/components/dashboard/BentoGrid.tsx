// Contenedor Bento Grid — orquesta el layout de todas las cards del dashboard

import { BalanceCard } from './BalanceCard';
import { SummaryCard } from './SummaryCard';
import { RecentTransactions } from '@/presentation/components/transactions/RecentTransactions';
import type { Transaction, Balance } from '@/domain/entities/transaction';

interface BentoGridProps {
  transactions: Transaction[];
  balance: Balance;
}

export function BentoGrid({ transactions, balance }: BentoGridProps) {
  const incomeTransactions  = transactions.filter((t) => t.type === 'income');
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');

  return (
    /*
     * Grid de 1 columna en móvil → 3 columnas en desktop.
     * BalanceCard: col-span-2 + row-span-2 (hero visual).
     * SummaryCards: 1 columna cada una, apiladas a la derecha.
     * RecentTransactions: ancho completo en la última fila.
     */
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-auto">

      {/* ── Fila 1-2: Balance (izquierda) + Summary cards (derecha) ── */}
      <BalanceCard balance={balance} />

      <SummaryCard
        type="income"
        amount={balance.totalIncome}
        transactionCount={incomeTransactions.length}
      />

      <SummaryCard
        type="expense"
        amount={balance.totalExpenses}
        transactionCount={expenseTransactions.length}
      />

      {/* ── Fila 3: Movimientos recientes (ancho completo) ── */}
      <RecentTransactions transactions={transactions} />

    </div>
  );
}
