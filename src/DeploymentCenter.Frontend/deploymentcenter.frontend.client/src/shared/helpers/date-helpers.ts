function pad(n: number) {
  return n < 10 ? `0${n}` : n;
}

export function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function getNowFormatedTime() {
  return formatTime(new Date());
}