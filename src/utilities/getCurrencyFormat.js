export const getCurrencyFormat = (money) => {
  return money.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
