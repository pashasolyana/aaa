// @ts-nocheck

const maxValueMonth = [31, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const formatOrder = ['yyyy', 'yy', 'mm', 'dd', 'HH', 'MM', 'SS']
export default function createAutoCorrectedDatePipe(
	dateFormat = 'mm dd yyyy',
	{ minYear = 1, maxYear = 9999 } = {}
) {
	const dateFormatArray = dateFormat
		.split(/[^dmyHMS]+/)
		.sort((a, b) => formatOrder.indexOf(a) - formatOrder.indexOf(b))
	return function (conformedValue) {
		const indexesOfPipedChars = []
		const maxValue = {
			dd: 31,
			mm: 12,
			yy: 99,
			yyyy: maxYear,
			HH: 23,
			MM: 59,
			SS: 59
		}
		const minValue = { dd: 1, mm: 1, yy: 0, yyyy: minYear, HH: 0, MM: 0, SS: 0 }
		const conformedValueArr = conformedValue.split(' - ')
		const start = conformedValueArr[0].split('')
		const end = conformedValueArr[1].split('')

		// Check first digit
		function checkFirstDigit(date) {
			dateFormatArray.forEach((format) => {
				const position = dateFormat.indexOf(format)
				const maxFirstDigit = parseInt(
					maxValue[format].toString().substr(0, 1),
					10
				)

				if (parseInt(date[position], 10) > maxFirstDigit) {
					date[position + 1] = date[position]
					date[position] = 0
					indexesOfPipedChars.push(position)
				}
			})
		}

		checkFirstDigit(start)
		checkFirstDigit(end)

		// Check for invalid date
		function checkDateValidity(date, offset = 0) {
			let month = 0
			const isInvalid = dateFormatArray.some((format) => {
				const position = dateFormat.indexOf(format)
				const length = format.length
				const textValue = conformedValue
					.substr(position + offset, length + 1)
					.replace(/\D/g, '')
				const value = parseInt(textValue, 10)

				if (format === 'mm') {
					month = value || 0
				}
				const maxValueForFormat =
					format === 'dd' ? maxValueMonth[month] : maxValue[format]
				if (format === 'yyyy' && (minYear !== 1 || maxYear !== 9999)) {
					const scopedMaxValue = parseInt(
						maxValue[format].toString().substring(0, textValue.length),
						10
					)
					const scopedMinValue = parseInt(
						minValue[format].toString().substring(0, textValue.length),
						10
					)
					return value < scopedMinValue || value > scopedMaxValue
				}
				return (
					value > maxValueForFormat ||
					(textValue.length === length && value < minValue[format])
				)
			})

			return isInvalid
		}

		const validity =
			[checkDateValidity(start), checkDateValidity(end, 12)] || []

		if (validity.some((v) => v)) {
			return false
		}

		return {
			value: start.join('') + ' - ' + end.join(''),
			indexesOfPipedChars
		}
	}
}
