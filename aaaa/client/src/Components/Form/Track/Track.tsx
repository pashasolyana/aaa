import React, { FC } from 'react'
import styles from './Track.module.scss'
import search from '../../../assets/svg/search.svg'
import TrackList from '../TrackList/TrackList'
import { Link } from 'react-scroll'
import Image from 'next/image'

interface Tracker {
  vvv?: () => void
  handleChange: () => void
  isSearch: any
  some: []
  number: string | undefined
  setPath: (x: any) => void
}

const Track: FC<Tracker> = ({
  vvv,
  handleChange,
  isSearch,
  some,
  number,
  setPath
}) => {
  const getList = () => {
    if (some?.join('')?.length < 1) {
      return (
        <div style={{ color: 'red' }}>Ошибка при введении номера заказа</div>
      )
    } else if (some?.join('')?.length > 0) {
      return <TrackList some={some} />
    }
  }

  return (
    <div className={styles.cont}>
      <div className={styles.search}>
        <h1 className={styles.title}>Введите номер заказа чтобы отследить</h1>
        <div className={styles.search__input}>
          <img src={search.src} alt='search' />
          <input
            type='text'
            value={number}
            placeholder='Введите номер заказа'
            onChange={handleChange}
          />
        </div>
        <Link
          activeClass='active'
          to='track'
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          className={styles.search__button}
          onClick={() =>
            //@ts-ignore
            number && number.length > 0 ? vvv() : null
          }
        >
          Отследить
        </Link>
      </div>
      {some ? (
        getList()
      ) : (
        <div className={styles.info}>
          <p>
            Номер для отслеживания — это номер, который присваивается каждой
            посылке непосредственно перед отправкой.
          </p>
          <div className={styles.info__img}>
            <Image src='fromCityB.svg' width={19} height={50} alt='' />
            <Image src='/arrow.svg' width={70} height={95} alt='' />
            <Image src='toCityB.svg' width={19} height={50} alt='' />
          </div>
        </div>
      )}
    </div>
  )
}

export default Track
