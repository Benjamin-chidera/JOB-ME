export const FormatCurrency = (amount: string, currency: string, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
