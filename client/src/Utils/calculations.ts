export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomInt(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}
