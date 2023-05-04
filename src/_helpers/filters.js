const filters = {
  toCurrency(value) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    })
    return formatter.format(value)
  }
}
export default filters
