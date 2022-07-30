export function short(day: Date) : string {
  return(day.getDate() + "." + String(day.getMonth() + 1).padStart(2, "0"));
}

export function long(day: Date) : string {
  return(day.getDate() + "." + String(day.getMonth() + 1).padStart(2, "0") + "." + day.getFullYear());
}

export function longToDate(day: string) : Date {
  const numbers = day.split(".");
  return(new Date(`${numbers[2]}-${numbers[1]}-${numbers[0].padStart(2, "0")}`));
}

export function diffInMonths(start: string, now: string) : number | undefined {
  const starts = start.split(".");
  const nows = now.split(".");
  if(starts[0] != nows[0]) { //days of the month not equal, not applicable
    return undefined;
  }
  const startMonths = parseInt(starts[2])*12 + parseInt(starts[1]);
  const nowMonths = parseInt(nows[2])*12 + parseInt(nows[1]);
  return(startMonths - nowMonths);  
}

export function diffInYears(start: string, now: string) : number | undefined {
  const starts = start.split(".");
  const nows = now.split(".");
  if(starts[0] != nows[0] || starts[1] != nows[1]) { //days & months not equal, not applicable
    return undefined;
  }
  const startYears = parseInt(starts[2]);
  const nowYears = parseInt(nows[2]);
  return(startYears - nowYears);  
}