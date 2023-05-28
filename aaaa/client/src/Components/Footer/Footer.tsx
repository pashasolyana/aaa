import React from 'react'
import s from './Footer.module.scss'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={s.cont} id='documents'>
      <div className={s.leftB}>
        <span className={s.write}>Пишите нам</span>
        <div className={s.ico}>
          <Image src={'telegram.svg'} width={50} height={50} alt='telegram' />
          <Image src={'/vk.svg'} width={50} height={50} alt='vk' />
          <Image src={'/whatsApp.svg'} width={50} height={50} alt='whatsApp' />
        </div>
        <p>© ООО «Люблино экспресс», 2023</p>
        <p>Политика обработки данных</p>
      </div>
      <div className={s.rightB}>
        <span className={s.write}>Наши документы</span>
        <p>Свидетельство</p>
        <p>Лицензия</p>
        <p>Документ номер один</p>
        <p>Документ номер два</p>
      </div>
    </div>
  )
}

export default Footer
