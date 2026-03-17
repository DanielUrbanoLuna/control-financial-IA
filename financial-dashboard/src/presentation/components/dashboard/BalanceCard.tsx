// BalanceCard — pieza hero del Bento Grid, ocupa 2 columnas en desktop

import { Wallet, TrendingUp } from 'lucide-react';
import { Card } from '@/presentation/components/ui/Card';
import { formatCurrency } from '@/lib/formatters';
import type { Balance } from '@/domain/entities/transaction';

interface BalanceCardProps {
  balance: Balance;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const isPositive = balance.total >= 0;

  return (
    <Card
      variant="elevated"
      className="lg:col-span-2 lg:row-span-2 flex flex-col justify-between gap-6 p-6"
    >
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#a3a3a3] uppercase tracking-widest">
          Balance total
        </span>
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a]">
          <Wallet size={16} className="text-[#a3a3a3]" />
        </span>
      </div>

      {/* Cifra principal */}
      <div>
        <p
          className={`text-4xl sm:text-5xl font-bold tracking-tight leading-none ${
            isPositive ? 'text-[#f5f5f5]' : 'text-red-400'
          }`}
        >
          {isPositive ? '' : '−'}{formatCurrency(Math.abs(balance.total))}
        </p>
        <p className="mt-2 text-xs text-[#525252]">
          Actualizado ahora
        </p>
      </div>

      {/* Desglose ingresos / gastos */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 rounded-xl bg-green-950/20 border border-green-500/15 px-4 py-3">
          <span className="text-xs font-medium text-[#a3a3a3]">Ingresos</span>
          <span className="text-lg font-semibold text-green-400">
            +{formatCurrency(balance.totalIncome)}
          </span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl bg-red-950/20 border border-red-500/15 px-4 py-3">
          <span className="text-xs font-medium text-[#a3a3a3]">Gastos</span>
          <span className="text-lg font-semibold text-red-400">
            −{formatCurrency(balance.totalExpenses)}
          </span>
        </div>
      </div>

      {/* Ratio de ahorro */}
      {balance.totalIncome > 0 && (
        <div className="flex items-center gap-2 text-xs text-[#525252]">
          <TrendingUp size={13} className="text-green-500 shrink-0" />
          <span>
            Tasa de ahorro:{' '}
            <span className="text-[#a3a3a3] font-medium">
              {Math.round(
                ((balance.totalIncome - balance.totalExpenses) / balance.totalIncome) * 100,
              )}
              %
            </span>
          </span>
        </div>
      )}
    </Card>
  );
}
