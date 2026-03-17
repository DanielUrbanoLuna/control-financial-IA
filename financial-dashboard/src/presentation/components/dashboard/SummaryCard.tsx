// SummaryCard — tarjeta minimalista de ingreso o gasto del mes

import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Card } from '@/presentation/components/ui/Card';
import { formatCurrency } from '@/lib/formatters';
import type { TransactionType } from '@/domain/entities/transaction';

interface SummaryCardProps {
  type: TransactionType;
  amount: number;
  transactionCount: number;
}

const CONFIG = {
  income: {
    label: 'Ingresos',
    variant: 'income' as const,
    amountClass: 'text-green-400',
    iconClass: 'text-green-400 bg-green-950/50 border-green-500/20',
    sign: '+',
    Icon: ArrowDownLeft,
  },
  expense: {
    label: 'Gastos',
    variant: 'expense' as const,
    amountClass: 'text-red-400',
    iconClass: 'text-red-400 bg-red-950/50 border-red-500/20',
    sign: '−',
    Icon: ArrowUpRight,
  },
};

export function SummaryCard({ type, amount, transactionCount }: SummaryCardProps) {
  const { label, variant, amountClass, iconClass, sign, Icon } = CONFIG[type];

  return (
    <Card variant={variant} className="flex flex-col justify-between gap-4 p-5">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#a3a3a3] uppercase tracking-widest">
          {label}
        </span>
        <span className={`flex items-center justify-center w-7 h-7 rounded-lg border ${iconClass}`}>
          <Icon size={14} />
        </span>
      </div>

      {/* Cantidad */}
      <div>
        <p className={`text-2xl font-bold tracking-tight ${amountClass}`}>
          {sign}{formatCurrency(amount)}
        </p>
        <p className="mt-1 text-xs text-[#525252]">
          {transactionCount} {transactionCount === 1 ? 'movimiento' : 'movimientos'}
        </p>
      </div>
    </Card>
  );
}
