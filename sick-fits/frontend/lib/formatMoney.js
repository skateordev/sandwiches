export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  };

  // check if it's a whole dollar amount
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  // english-Eurozone (countries that fully support the euro)
  const formatter = Intl.NumberFormat('en-EZ', options);

  return formatter.format(amount / 100);
}
