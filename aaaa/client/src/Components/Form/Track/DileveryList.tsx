import { FC } from 'react'
import styles from '../../../components/Form/Track/Track.module.scss'

interface Track {
  some: any
}

export const DileveryList: FC<Track> = ({ some }) => {
    return (
        <div>
        <div className={styles.deltop}>
        <div>Дата</div>
        <div>Статус</div>
        <div>Город</div>
        </div>
        {some?.map((el: any) => (
          <div className={styles.delivery} key={el}>
            <div>{el.statusDate.split('T')[0]}</div>
            <div>{el.statusName}</div>
            <div>{el.cityName}</div>
          </div>
        ))}
      </div>
    )
}

export default DileveryList