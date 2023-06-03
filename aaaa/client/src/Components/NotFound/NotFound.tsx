import React from 'react'
import s from './NotFound.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Footer from './Footer'

const NotFound = () => {
  return (
    <div className={s.cont}>
      <Image src='/logo.svg' alt='Люблтно Экпресс' width={213} height={68} />
      <div className={s.body}>
        <h1>Ошибка 404. Такой страницы нет</h1>
        <Link href={'/'}>Перейти на главную</Link>
      </div>
      <Footer/>
    </div>
  )
}

export default NotFound
