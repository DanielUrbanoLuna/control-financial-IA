'use client';

// Input inteligente de lenguaje natural — el núcleo de la experiencia de usuario

import { useState, useRef, type FormEvent, type KeyboardEvent } from 'react';
import { SendHorizonal, Loader2 } from 'lucide-react';

interface SmartInputProps {
  onSubmit: (rawInput: string) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

const PLACEHOLDER_EXAMPLES = [
  'He gastado 20€ en sushi...',
  'Cobré mi nómina de 1.800€...',
  'Pagué 45€ de gasolina...',
  'Ingresé 300€ de un proyecto freelance...',
];

export function SmartInput({ onSubmit, isLoading, error }: SmartInputProps) {
  const [value, setValue] = useState('');
  // Índice del placeholder rotativo para guiar al usuario
  const [placeholderIndex] = useState(
    () => Math.floor(Math.random() * PLACEHOLDER_EXAMPLES.length),
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;

    await onSubmit(trimmed);
    setValue('');
    inputRef.current?.focus();
  };

  // Enviar con Enter; Shift+Enter reservado por si se expande a textarea
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const canSubmit = value.trim().length > 0 && !isLoading;

  return (
    <div className="w-full flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="w-full">
        <div
          className={`
            flex items-center gap-3
            bg-[#111111] border rounded-2xl px-4 py-3
            transition-all duration-200
            ${isLoading
              ? 'border-indigo-500/40 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]'
              : error
              ? 'border-red-500/40'
              : 'border-[#2a2a2a] hover:border-[#3a3a3a] focus-within:border-indigo-500/60'
            }
          `}
        >
          {/* Icono de estado: spinner animado cuando carga, símbolo decorativo en reposo */}
          <span className="shrink-0 select-none text-sm text-[#525252]">
            {isLoading
              ? <Loader2 size={15} className="animate-spin text-indigo-400" />
              : '✦'
            }
          </span>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isLoading
                ? 'La IA está analizando tu transacción...'
                : PLACEHOLDER_EXAMPLES[placeholderIndex]
            }
            disabled={isLoading}
            autoComplete="off"
            spellCheck={false}
            aria-label="Describe tu gasto o ingreso en lenguaje natural"
            aria-busy={isLoading}
            className="
              flex-1 bg-transparent text-sm text-[#f5f5f5]
              placeholder:text-[#525252]
              outline-none border-none
              disabled:opacity-60
            "
          />

          {/* Botón: expande con texto "Procesando..." mientras la IA trabaja */}
          <button
            type="submit"
            disabled={!canSubmit}
            aria-label={isLoading ? 'Procesando transacción' : 'Añadir transacción'}
            className={`
              shrink-0 flex items-center justify-center gap-1.5
              h-8 rounded-xl px-3
              text-xs font-medium
              transition-all duration-200
              focus-visible:ring-2 focus-visible:ring-indigo-500
              focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]
              ${isLoading
                ? 'bg-indigo-900/50 text-indigo-300 cursor-not-allowed w-auto'
                : canSubmit
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer w-8'
                : 'bg-[#1a1a1a] text-[#525252] cursor-not-allowed w-8'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <SendHorizonal size={14} />
            )}
          </button>
        </div>
      </form>

      {/* Mensaje de error inline */}
      {error && (
        <p className="text-xs text-red-400 text-center px-2" role="alert">
          {error}
        </p>
      )}

      {/* Hint de teclado — solo en desktop, oculto durante la carga */}
      {!isLoading && !error && (
        <p className="hidden sm:block text-xs text-[#525252] text-center">
          Pulsa{' '}
          <kbd className="font-mono bg-[#1a1a1a] border border-[#2a2a2a] rounded px-1 py-0.5">
            Enter
          </kbd>{' '}
          para añadir
        </p>
      )}
    </div>
  );
}
