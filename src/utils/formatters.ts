export const FICHO_VALUE_COP = 1000; // Standard rate: $1,000 COP = 1 Ficho

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateFichos(amountCOP: number, fichoRate: number = FICHO_VALUE_COP): number {
  if (!amountCOP || amountCOP <= 0) return 0;
  return Math.ceil(amountCOP / fichoRate);
}

export function formatFichos(fichosCount: number): string {
  if (fichosCount === 1) return '1 Ficho';
  return `${fichosCount.toLocaleString('es-CO')} Fichos`;
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
