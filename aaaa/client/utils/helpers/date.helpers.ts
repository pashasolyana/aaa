// import {
//   differenceInYears,
//   format,
//   formatISO,
//   isAfter,
//   isBefore,
//   isEqual,
//   isValid,
//   parse
// } from 'date-fns'
// import { declintateYears } from '../../utils/declination'

// export const formatBirthDate = (birthDate: string) => {
//   const date = new Date(birthDate)
//   const now = Date.now()
//   const dateString = format(date, 'dd.MM.yyyy')
//   const fullYears = Math.abs(differenceInYears(now, date))

//   return `${dateString} (${fullYears} ${declintateYears(fullYears)})`
// }

// export const formatDateToDMY = (date: string) =>
//   isValid(new Date(date)) ? format(new Date(date), 'dd.MM.yyyy') : ''

// export const formatFullYears = (birthDate: string) => {
//   const date = new Date(birthDate)
//   const now = Date.now()
//   const fullYears = Math.abs(differenceInYears(now, date))

//   return `${fullYears} ${declintateYears(fullYears)}`
// }

// export const formatDateToTime = (date: string) =>
//   format(new Date(date), 'HH:mm')

// export const formatTimeToISO = (time: string, date = new Date()) =>
//   formatISO(parse(time.split(':', 2).join(':'), 'HH:mm', date))

// export const dateIsValid = (date) => !Number.isNaN(new Date(date).getTime())

// export const isBetween = (date, from, to, inclusivity = '()') => {
//   if (!['()', '[]', '(]', '[)'].includes(inclusivity)) {
//     throw new Error('Inclusivity parameter must be one of (), [], (], [)')
//   }

//   const isBeforeEqual = inclusivity[0] === '[',
//     isAfterEqual = inclusivity[1] === ']'

//   return (
//     (isBeforeEqual
//       ? isEqual(from, date) || isBefore(from, date)
//       : isBefore(from, date)) &&
//     (isAfterEqual ? isEqual(to, date) || isAfter(to, date) : isAfter(to, date))
//   )
// }

// export const getDurationTime = (seconds: number) => {
//   const hours = Math.floor(seconds / (60 * 60))

//   const minutes = (seconds - hours * 60 * 60) / 60

//   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
// }
