// In your FormatCurrency.ts file
export const FormatCurrency = (amount: number | string, currency: string) => {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(numericAmount);
};
