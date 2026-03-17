// Fila individual de transacción en la lista de movimientos recientes

import { formatCurrency, formatDate, formatTime } from '@/lib/formatters';
import type { Transaction } from '@/domain/entities/transaction';

// Mapa de categorías a emojis — más legible que iconos en listas densas
const CATEGORY_EMOJI: Record<Transaction['category'], string> = {
  food:          '🍜',
  transport:     '🚗',
  entertainment: '🎬',
  health:        '🏥',
  shopping:      '🛍️',
  housing:       '🏠',
  salary:        '💼',
  freelance:     '💻',
  investment:    '📈',
  other:         '📦',
};

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';

  return (
    <li className="flex items-center gap-4 py-3 border-b border-[#1a1a1a] last:border-0">

      {/* Icono de categoría */}
      <span
        className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-[#1a1a1a] text-base"
        role="img"
        aria-label={transaction.category}
      >
        {CATEGORY_EMOJI[transaction.category]}
      </span>

      {/* Descripción + fecha */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#f5f5f5] truncate">
          {transaction.description}
        </p>
        <p className="text-xs text-[#525252] mt-0.5">
          {formatDate(transaction.createdAt)} · {formatTime(transaction.createdAt)}
        </p>
      </div>

      {/* Cantidad con signo y color semántico */}
      <span
        className={`shrink-0 font-mono text-sm font-semibold tabular-nums ${
          isIncome ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {isIncome ? '+' : '−'}{formatCurrency(transaction.amount)}
      </span>

    </li>
  );
}
