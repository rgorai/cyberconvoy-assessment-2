export const getISODate = (date: string) =>
  new Date(date).toISOString().split('T')[0]
