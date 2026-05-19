export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(n: number): string {
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억원`;
  if (n >= 10_000) return `${Math.round(n / 10_000).toLocaleString()}만원`;
  return `${n.toLocaleString()}원`;
}

export function competitionLabel(level: string): string {
  const map: Record<string, string> = {
    low: "낮음",
    medium: "보통",
    high: "높음",
  };
  return map[level] ?? level;
}
