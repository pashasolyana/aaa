export function declination(number: any, titles: any, cases = [2, 0, 1, 1, 1, 2]) {
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}

export const declintateYears = (num: number) =>
  declination(num, [' год', ' года', ' лет'])

export const declinateReps = (num: number) =>
  declination(num, [' подход', ' подхода', ' подходов'])
