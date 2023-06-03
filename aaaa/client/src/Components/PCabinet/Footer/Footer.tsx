import Link from 'next/link'
import React from 'react'
import s from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={s.footer}>
        <p>© ООО «Люблино экспресс», 2023</p>
        <Link href={'#'}>Политика обработки данных</Link>
    </div>
  )
}

export default Footer