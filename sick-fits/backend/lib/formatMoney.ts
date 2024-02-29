const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

export default function formatMoney(subunit: number) {
  const units = subunit / 100;
  return formatter.format(units);
}
