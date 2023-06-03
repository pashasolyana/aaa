import React, { useState } from 'react'
import s from './Header.module.scss'
import Image from 'next/image'

const Header = () => {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const reverseDirection = (id: string) => {
    document.getElementById(id)?.classList.toggle(s.el_rev)
  }

  return (
    <div className={s.cont}>
      <div className={s.wrap}>
        <div className={s.dateCont}>
          <div className={s.el}>
            <input
              type='date'
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <Image
              src={'/PCabinet/stat/calendar.svg'}
              alt='календарь'
              width={13}
              height={13}
            />
            <p>{fromDate !== '' ? fromDate : 'От'}</p>
          </div>
          <div className={s.el}>
            <input
              type='date'
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <Image
              src={'/PCabinet/stat/calendar.svg'}
              alt='календарь'
              width={13}
              height={13}
            />
            <p>{toDate !== '' ? toDate : 'До'}</p>
          </div>
          <div
            className={s.el}
            id='oneRev'
            onClick={(e) => reverseDirection('oneRev')}
          >
            <Image
              src={'/PCabinet/stat/arrow.svg'}
              alt='направление'
              width={8}
              height={13}
            />
          </div>
        </div>
        <div
          className={s.el}
          id='twoRev'
          onClick={(e) => reverseDirection('twoRev')}
        >
          <p>По теме</p>
          <Image
            src={'/PCabinet/stat/arrow.svg'}
            alt='направление'
            width={8}
            height={13}
          />
        </div>
      </div>
      <div className={s.exel}>
        <p>Выгрузить в excel</p>
        <Image
          src={'/PCabinet/stat/download.svg'}
          alt='направление'
          width={16}
          height={16}
        />
      </div>
    </div>
  )
}

export default Header
