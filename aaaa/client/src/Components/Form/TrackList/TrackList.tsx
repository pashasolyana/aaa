import React from 'react'
import styles from './TrackList.module.scss'
import clsx from 'clsx'

interface СalculatorProps {
  some: any
}

const TrackList: React.FC<СalculatorProps> = ({ some }) => {
  return (
    <div className={styles.cont} id='mather'>
      {some?.map((el: any) => (
        <div className={styles.el}>
          <p>{el.statusDate.split('T')[0]}</p>
          <p>{el.statusName}</p>
          <p>{el.cityName}</p>
        </div>
      ))}
      <div className={styles.el}>
        <span>Дата</span>
        <p>28.04.2023 22:33</p>
        <p>28.04.2023 22:33</p>
        <p>28.04.2023 22:33</p>
      </div>
      <div className={styles.el}>
        <span>Статус</span>
        <p>Отправлен в город назначения</p>
        <p>Отправлен в город назначения</p>
        <p>Отправлен в город назначения</p>
      </div>
      <div className={clsx(styles.el, styles.el_mod)}>
        <span>Город</span>
        <p>Санкт-Петербург</p>
        <p>Санкт-Петербург</p>
        <p>Санкт-Петербург</p>
      </div>
    </div>
  )
}

export default TrackList
