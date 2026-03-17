// Lista de movimientos recientes — ocupa el ancho completo del Bento Grid

import { Clock } from 'lucide-react';
import { Card } from '@/presentation/components/ui/Card';
import { TransactionItem } from './TransactionItem';
import type { Transaction } from '@/domain/entities/transaction';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card variant="default" className="lg:col-span-3 p-6">

      {/* Cabecera */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-[#525252]" />
          <h2 className="text-sm font-semibold text-[#f5f5f5]">Movimientos recientes</h2>
        </div>
        <span className="text-xs text-[#525252]">
          {transactions.length} {transactions.length === 1 ? 'transacción' : 'transacciones'}
        </span>
      </div>

      {/* Lista o estado vacío */}
      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <ul role="list" className="divide-y divide-transparent">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}

    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
      <span className="text-3xl" role="img" aria-label="Sin movimientos">💸</span>
      <p className="text-sm text-[#a3a3a3]">Aún no hay movimientos</p>
      <p className="text-xs text-[#525252]">
        Escribe tu primer gasto o ingreso arriba para empezar
      </p>
    </div>
  );
}
