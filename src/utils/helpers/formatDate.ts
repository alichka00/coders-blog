export const formatDate = (date: string) => {
  const newDate = new Date(date)
  const formattedDate = [
    '0' + newDate.getDate(),
    '0' + (newDate.getMonth() + 1),
    '' + newDate.getFullYear(),
    '0' + newDate.getHours(),
    '0' + newDate.getMinutes(),
  ].map((item) => item.slice(-2))
  return formattedDate.slice(0, 3).join('.') + ' ' + formattedDate.slice(3).join(':')
}
