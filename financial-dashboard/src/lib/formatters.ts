// Utilidades de formateo — moneda y fechas en locale español

const EUR_FORMAT = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});

const DATE_FORMAT = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'short',
});

const TIME_FORMAT = new Intl.DateTimeFormat('es-ES', {
  hour: '2-digit',
  minute: '2-digit',
});

export function formatCurrency(amount: number): string {
  return EUR_FORMAT.format(amount);
}

export function formatDate(date: Date): string {
  return DATE_FORMAT.format(date);
}

export function formatTime(date: Date): string {
  return TIME_FORMAT.format(date);
}
