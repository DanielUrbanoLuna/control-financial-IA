// Componente primitivo de Card — base del sistema Bento Grid

import type { ReactNode } from 'react';

type CardVariant = 'default' | 'elevated' | 'accent' | 'income' | 'expense';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default:  'bg-[#111111] border border-[#2a2a2a]',
  elevated: 'bg-[#111111] border border-[#2a2a2a] shadow-lg shadow-black/50',
  accent:   'bg-indigo-950/20 border border-indigo-500/30',
  income:   'bg-green-950/10 border border-green-500/20',
  expense:  'bg-red-950/10 border border-red-500/20',
};

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  return (
    <div className={`rounded-2xl p-4 ${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </div>
  );
}
