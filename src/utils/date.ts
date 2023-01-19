export function getDate(formDate: string): Date {
  const date = new Date()
  const newDate = formDate.replaceAll("-","")

  const year = Number(newDate.slice(0, 4))
  const month = Number(newDate.slice(4, 6)) - 1
  const day = Number(newDate.slice(6, 8))
  
  return new Date(year, month, day, date.getHours(), date.getMinutes())
}