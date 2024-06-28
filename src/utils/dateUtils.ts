export const formatedDate = (date: string): string => {
  return new Date(date).toLocaleString('pt-BR', {
    dateStyle: 'short'
  })
}