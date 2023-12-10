export function formatDollarValue(number: number): string {
  // Use the built-in Intl.NumberFormat to format the number
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (!number) return "$0";
  return formatter.format(number);
}
