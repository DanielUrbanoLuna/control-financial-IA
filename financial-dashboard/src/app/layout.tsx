import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'Gestiona tus finanzas con IA — registra gastos e ingresos en lenguaje natural',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={GeistSans.variable}>
      <body className="bg-[#0a0a0a] text-[#f5f5f5] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
