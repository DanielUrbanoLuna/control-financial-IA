# fintrack. — AI Financial Dashboard

> Registra gastos e ingresos en lenguaje natural. La IA hace el resto.

Una aplicación de gestión financiera personal construida con **Next.js 16**, **Claude AI** y un diseño **Bento Grid** oscuro e inspirado en dashboards profesionales. Sin formularios. Sin categorías manuales. Solo escribe lo que gastaste.

---

## Features

### AI Parsing — lenguaje natural
Escribe frases como `"Pagué 45€ en el super"` o `"Cobré nómina 1.800€"` y Claude extrae automáticamente el importe, tipo (ingreso / gasto) y categoría. Sin campos, sin clics extra.

### Bento Grid — información de un vistazo
La interfaz se organiza en una cuadrícula de tarjetas de distintos tamaños: balance total, resumen de ingresos y gastos del mes, y el historial de transacciones recientes. Todo visible sin hacer scroll.

### Diseño oscuro y responsive
Paleta `#0a0a0a` con tipografía **Geist Sans**. Adaptado a móvil (4 columnas) y escritorio (12 columnas). Contraste AA garantizado en todos los textos.

### Arquitectura limpia
Separación en capas `domain → application → infrastructure → presentation`. El parser de IA es intercambiable: está aislado en `infrastructure/ai/`.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| IA | Claude Haiku via `@anthropic-ai/sdk` |
| Estilos | Tailwind CSS v4 |
| Iconos | Lucide React |
| Tipografía | Geist Sans |
| Lenguaje | TypeScript 5 |

---

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/DanielUrbanoLuna/control-financial-IA.git
cd control-financial-IA/financial-dashboard
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura tu API Key

> ⚠️ **Necesitas una API Key de Anthropic** para que el parsing con IA funcione.
> Consíguela en [console.anthropic.com](https://console.anthropic.com) — el plan gratuito es suficiente para uso personal.

Crea el archivo `.env.local` en la raíz del proyecto:

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
```

> Este archivo está en `.gitignore` y **nunca se sube a GitHub**. No lo compartas.

### 4. Arranca el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Uso

1. Escribe una transacción en el campo de texto, por ejemplo:
   - `"Cena con amigos 38€"`
   - `"Gasolina 60 euros"`
   - `"Cobré factura cliente 950€"`
2. Pulsa **Enter** o el botón de envío.
3. Claude procesa la frase y añade la transacción al dashboard al instante.

---

## Estructura del proyecto

```
src/
├── app/                        # Next.js App Router
│   ├── api/parse-transaction/  # Endpoint que llama a Claude
│   ├── layout.tsx
│   └── page.tsx
├── domain/                     # Entidades y contratos (puro TypeScript)
│   ├── entities/transaction.ts
│   ├── repositories/
│   └── services/ai-parser.ts
├── application/                # Casos de uso
│   └── use-cases/
├── infrastructure/             # Implementaciones concretas
│   ├── ai/claude-parser.ts     # Parser de IA (Claude)
│   └── repositories/
└── presentation/               # Componentes React
    ├── components/dashboard/   # BentoGrid, BalanceCard, HeroSection…
    └── components/transactions/
```

---

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `ANTHROPIC_API_KEY` | Sí | API Key de Anthropic para Claude |

---

## Scripts

```bash
npm run dev      # Servidor de desarrollo con Turbopack
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

---

## Licencia

MIT — úsalo, modifícalo y compártelo libremente.
