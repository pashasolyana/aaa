import React from 'react'
import Head from 'next/head'
import { IMeta } from '../../utils/meta/meta.interface'

const Meta: React.FC<IMeta> = ({ title = '', description }) => {
	const pageTitle = title ? `${title} | AAClinic` : 'AAClinic'

	return (
		<Head>
			<title>{pageTitle}</title>
			{description ? (
				<meta itemProp="description" name="description" content={description} />
			) : (
				<meta name="robots" content="noindex, nofollow" />
			)}
		</Head>
	)
}

export default Meta
