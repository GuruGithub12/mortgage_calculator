export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function getMonthName(monthNumber: number): string {
  const yearNumber = Math.floor((monthNumber - 1) / 12) + 1;
  const monthIndex = (monthNumber - 1) % 12;
  return `${monthNames[monthIndex]} ${yearNumber}`;
}
