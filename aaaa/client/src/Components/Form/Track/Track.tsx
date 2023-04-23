import React, { ChangeEvent, FC, useState } from 'react'
import styles from './Track.module.scss'
import search from '../../../assets/svg/search.svg'
import { handleFormProps } from '../Form'
import clsx from 'clsx'
import TrackList from '../TrackList/TrackList'

interface Tracker {
  vvv?: () => void,
  handleChange: () => void,
  isSearch: any,
  some: [],
  number: string | undefined
  setPath: (x: any) => void
}

const Track: FC<Tracker> = ({ vvv, handleChange, isSearch, some, number, setPath }) => {

  return (
    <div>
      <div className={clsx(styles.cont, { [styles.cont_mod]: isSearch })}>
        <p className={styles.title}>
          Укажите номер заказа<span>*</span>
        </p>
        <form className={styles.search}>
          <div className={styles.search__input}>
            <img src={search.src} alt='search' />
            <input type='text' value={number} placeholder='Введите номер заказа' onChange={handleChange} />
          </div>
          <button
            className={styles.search__button}
            type='button'
            onClick={() =>
              //@ts-ignore
              number && number.length > 0 ? vvv() : null}
              >
            Отследить
          </button>
        </form>
            {some?.join('')?.length < 1 && (
            <div style={{color: 'red'}}>Ошибка при введении номера заказа</div>
    )}
      </div>
      {some?.join('')?.length > 0 && (
        <TrackList some={some} />
      )}
    </div>
  )
}

export default Track
