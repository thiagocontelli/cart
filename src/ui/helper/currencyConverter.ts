export function currencyConverter (value: number): string {
  return new Intl.NumberFormat(
    'en-US',
    { style: 'currency', currency: 'USD' })
    .format(value)
}
