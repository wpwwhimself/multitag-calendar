export function short(day: Date) : string {
  return(day.getDate() + "." + String(day.getMonth() + 1).padStart(2, "0"));
}

export function long(day: Date) : string {
  return(day.getDate() + "." + String(day.getMonth() + 1).padStart(2, "0") + "." + day.getFullYear());
}