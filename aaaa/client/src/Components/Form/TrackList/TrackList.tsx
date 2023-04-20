import React from 'react'
import styles from './TrackList.module.scss'

interface СalculatorProps {
  some: any
}

const TrackList: React.FC<СalculatorProps> = ({ some }) => {
  return (
    <div className={styles.cont} id='mather'>
      <div className={styles.el}>
        <p>Дата</p>
        <p>Статус</p>
        <p>Город</p>
      </div>
      {some?.map((el: any) => (
        <div className={styles.el}>
            <div>{el.statusDate.split('T')[0]}</div>
            <div>{el.statusName}</div>
            <div>{el.cityName}</div>
        </div>
      ))}
    </div>
  )
}

export default TrackList
