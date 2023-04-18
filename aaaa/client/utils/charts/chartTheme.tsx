export const chartTheme =
	// You can pass this object to the `theme` property
	{
		background: 'transparent',
		textColor: '#333333',
		fontSize: 11,
		axis: {
			domain: {
				line: {
					stroke: 'rgba(255, 255, 255, 0.1)',
					strokeWidth: 1
				}
			},
			legend: {
				text: {
					fontSize: 12,
					fill: '#fff'
				}
			},
			ticks: {
				line: {
					stroke: 'transparent',
					strokeWidth: 1
				},
				text: {
					fontFamily: 'Ubuntu',
					fontSize: 15,
					fontWeight: 300,
					fill: 'rgba(255, 255, 255, 0.5)'
				}
			}
		},
		grid: {
			line: {
				stroke: 'rgba(255, 255, 255, 0.1)',
				strokeWidth: 1
			}
		},
		legends: {
			title: {
				text: {
					fontSize: 11,
					fill: '#333333'
				}
			},
			text: {
				fontSize: 11,
				fill: '#333333'
			},
			ticks: {
				line: {},
				text: {
					fontSize: 10,
					fill: '#333333'
				}
			}
		},
		annotations: {
			text: {
				fontSize: 13,
				fill: '#333333',
				outlineWidth: 2,
				outlineColor: '#ffffff',
				outlineOpacity: 1
			},
			link: {
				stroke: '#000000',
				strokeWidth: 1,
				outlineWidth: 2,
				outlineColor: '#ffffff',
				outlineOpacity: 1
			},
			outline: {
				stroke: '#000000',
				strokeWidth: 2,
				outlineWidth: 2,
				outlineColor: '#ffffff',
				outlineOpacity: 1
			},
			symbol: {
				fill: '#000000',
				outlineWidth: 2,
				outlineColor: '#ffffff',
				outlineOpacity: 1
			}
		},
		tooltip: {
			container: {
				background: '#ffffff',
				color: '#333333',
				fontSize: 12
			},
			basic: {},
			chip: {},
			table: {},
			tableCell: {},
			tableCellValue: {}
		}
	}
