export const getISODate = (date: string | number | Date) =>
  new Date(date).toISOString().split('T')[0]
