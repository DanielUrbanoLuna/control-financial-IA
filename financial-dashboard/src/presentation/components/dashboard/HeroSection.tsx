// Hero Section — bienvenida + input inteligente centrados en pantalla

import { SmartInput } from './SmartInput';

interface HeroSectionProps {
  onSubmit: (rawInput: string) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

export function HeroSection({ onSubmit, isLoading, error }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center text-center px-4 pt-16 pb-10 sm:pt-24 sm:pb-14">

      {/* Badge superior */}
      <span className="inline-flex items-center gap-1.5 mb-6 px-3 py-1 rounded-full text-xs font-medium bg-indigo-950/50 border border-indigo-500/20 text-indigo-400">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        IA activa
      </span>

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f5] leading-tight tracking-tight max-w-2xl">
        Tus finanzas,{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
          en una frase
        </span>
      </h1>

      {/* Subtítulo */}
      <p className="mt-4 text-sm sm:text-base text-[#a3a3a3] max-w-md leading-relaxed">
        Escribe lo que has gastado o ingresado y la IA lo clasificará automáticamente.
        Sin formularios, sin categorías manuales.
      </p>

      {/* Input inteligente */}
      <div className="w-full max-w-xl mt-8">
        <SmartInput onSubmit={onSubmit} isLoading={isLoading} error={error} />
      </div>

    </section>
  );
}
