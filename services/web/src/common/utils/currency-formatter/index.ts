export const currencyFormatter = (
  number: number,
  currency: string,
  minimumFractionDigits: number = 2,
  locale: string = 'en'
): string => {
  if (isNaN(number)) {
    return 'N/A';
  }
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    currencyDisplay: 'symbol',
  });
  return currencyFormatter.format(number).replace(/\s/g, '');
};

export const audFormatter = (number: number) => {
  return currencyFormatter(number, 'AUD', 2, 'en');
};

export const eurFormatter = (number: number) => {
  return currencyFormatter(number, 'EUR', 2, 'en');
};

export const gbpFormatter = (number: number) => {
  return currencyFormatter(number, 'GBP', 2, 'en');
};

export const usdFormatter = (number: number) => {
  return currencyFormatter(number, 'USD', 2, 'en');
};

export const vndFormatter = (number: number) => {
  return currencyFormatter(number, 'VND', 0, 'vi');
};

export default currencyFormatter;
