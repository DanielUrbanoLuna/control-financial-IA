# Design System — Financial Dashboard

## Filosofía

Interfaz oscura, densa en información y visualmente clara. Inspirada en dashboards financieros profesionales. El usuario debe poder leer el estado de sus finanzas de un vistazo, sin ruido visual.

---

## Estética: Bento Grid

La interfaz se organiza en un **Bento Grid**: una cuadrícula de tarjetas (cards) de distintos tamaños que encajan entre sí como piezas de un puzzle. Cada card encapsula un concepto financiero (balance total, gastos del mes, ingresos, gráfico, etc.).

**Principios del layout:**
- Grid base de 12 columnas en desktop, 4 en mobile.
- Las cards pueden ocupar 1, 2, 3 o 4 columnas según su importancia.
- Espaciado uniforme entre cards: `gap-4` (16px).
- Sin líneas divisorias entre secciones — el espacio y las cards hablan por sí solos.

---

## Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `background` | `#0a0a0a` | Fondo global de la app |
| `surface` | `#111111` | Fondo de cards |
| `surface-raised` | `#1a1a1a` | Cards elevadas / hover |
| `border` | `#2a2a2a` | Bordes sutiles entre elementos |
| `text-primary` | `#f5f5f5` | Texto principal |
| `text-secondary` | `#a3a3a3` | Labels, subtítulos |
| `text-muted` | `#525252` | Metadatos, fechas |
| `income` | `#22c55e` | Ingresos (green-500) |
| `income-muted` | `#166534` | Fondo de badge de ingreso |
| `expense` | `#ef4444` | Gastos (red-500) |
| `expense-muted` | `#7f1d1d` | Fondo de badge de gasto |
| `accent` | `#6366f1` | Acciones primarias, highlights |

> **Regla de oro:** Los ingresos son **siempre verdes**, los gastos son **siempre rojos**. Sin excepciones. El color es semántico, no decorativo.

---

## Tipografía: Geist Sans

Fuente principal: **Geist Sans** (de Vercel/Next.js). Moderna, legible a tamaños pequeños, perfecta para datos numéricos y dashboards.

```css
/* Importar en el layout raíz de Next.js */
import { GeistSans } from 'geist/font/sans';
```

| Escala | Clase Tailwind | Uso |
|---|---|---|
| Display | `text-4xl font-bold` | Balance total, cifras hero |
| Title | `text-xl font-semibold` | Títulos de card |
| Body | `text-sm font-normal` | Texto general |
| Label | `text-xs font-medium` | Labels, badges, metadatos |
| Mono | `font-mono text-sm` | Cantidades exactas, IDs |

---

## Cards (Bento Tiles)

Todas las cards comparten la misma base:

```css
/* Base de card */
bg-[#111111] border border-[#2a2a2a] rounded-2xl p-4
```

**Variantes:**

| Variante | Clases adicionales | Cuándo usarla |
|---|---|---|
| Default | — | La mayoría de cards |
| Elevated | `shadow-lg shadow-black/50` | Card destacada (ej: balance total) |
| Accent | `border-indigo-500/30 bg-indigo-950/20` | Acción principal o CTA |
| Income | `border-green-500/20 bg-green-950/10` | Cards de resumen de ingresos |
| Expense | `border-red-500/20 bg-red-950/10` | Cards de resumen de gastos |

---

## Badges de transacción

```
Ingreso:  bg-green-900/50  text-green-400  → "+ €1.200,00"
Gasto:    bg-red-900/50    text-red-400    → "- €340,00"
```

Siempre mostrar el signo (`+` / `-`) antes de la cantidad. Las cantidades negativas nunca se muestran en negro o gris — siempre en rojo.

---

## Iconografía

- Librería: **Lucide React** (ya incluida en Next.js ecosystem).
- Tamaño estándar: `size-4` (16px) en inline, `size-5` (20px) en cards.
- Color: heredar del texto del contenedor (`currentColor`).

---

## Estados interactivos

```css
/* Hover de card */
hover:bg-[#1a1a1a] transition-colors duration-200

/* Focus ring */
focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]

/* Botón primario */
bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors
```

---

## Configuración Tailwind

Añadir al `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        'surface-raised': '#1a1a1a',
        border: '#2a2a2a',
        income: '#22c55e',
        expense: '#ef4444',
        accent: '#6366f1',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Ejemplo de estructura Bento Grid

```
┌─────────────────────┬──────────┬──────────┐
│                     │ Ingresos │  Gastos  │
│   Balance Total     │  mes     │  mes     │
│   (hero card)       ├──────────┴──────────┤
│                     │  Últimas transacc.  │
├──────────┬──────────┤                     │
│ Gráfico  │ Categ.   │                     │
│ mensual  │ top      ├─────────────────────┤
│          │          │    Presupuesto      │
└──────────┴──────────┴─────────────────────┘
```

---

## Accesibilidad

- Contraste mínimo AA para todo el texto sobre fondo oscuro.
- Los colores de ingreso/gasto nunca son el único indicador — siempre acompañados de signo (`+`/`-`) o icono.
- Soporte para `prefers-reduced-motion`: desactivar transiciones si el usuario lo prefiere.
