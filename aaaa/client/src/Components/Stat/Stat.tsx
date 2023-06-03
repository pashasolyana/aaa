import React from 'react'
import Header from './Header/Header'
import s from './Stat.module.scss'
import Image from 'next/image'
import clsx from 'clsx'

const Stat = () => {
  return (
    <div className={s.cont}>
      <Header />
      <div className={s.wrap}>
        <div className={s.wrap__el}>
          <p>Дата</p>
          <p>Тема</p>
          <p>Текст обращения</p>
        </div>
        <div className={s.wrap__el}>
          <p>28.04.2023 22:33</p>
          <p>Отслеживание</p>
          <p>
            Хотел бы уточнить статус моего заказа под номером 7729398173,
            который был сделан 21.02.2023 Хотел бы уточнить статус моего заказа
            под номером 7729398173, который был сделан 21.02.2023
          </p>
        </div>
        <div className={s.wrap__el}>
          <p>28.04.2023 22:33</p>
          <p>Отслеживание</p>
          <p>
            Хотел бы уточнить статус моего заказа под номером 7729398173,
            который был сделан 21.02.2023 Хотел бы уточнить 
          </p>
        </div>
      </div>
      <Image
        src='/PCabinet/stat/load.svg'
        alt='load'
        width={30}
        height={30}
        className={clsx(s.spiner, s.spiner__active)}
      />
    </div>
  )
}

export default Stat
