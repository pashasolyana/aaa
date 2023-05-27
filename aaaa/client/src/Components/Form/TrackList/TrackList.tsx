import React from 'react'
import styles from './TrackList.module.scss'
import clsx from 'clsx'

interface СalculatorProps {
  some: any
}

const TrackList: React.FC<СalculatorProps> = ({ some }) => {
  return (
    <div className={styles.cont} id='mather'>
      <div className={styles.el}>
        <span>Дата</span>
        {some?.map((el: any) => (
          <p>{el.statusDate.split('T')[0]}</p>
        ))}
      </div>
      <div className={styles.el}>
        <span>Статус</span>
        {some?.map((el: any) => (
          <p>{el.statusName}</p>
        ))}
      </div>
      <div className={clsx(styles.el, styles.el_mod)}>
        <span>Город</span>
        {some?.map((el: any) => (
          <p>{el.cityName}</p>
        ))}
      </div>
    </div>
  )
}

export default TrackList
