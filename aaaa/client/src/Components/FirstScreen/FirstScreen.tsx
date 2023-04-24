import { ChangeEvent, FC, useState } from 'react'
import styles from './FirstScreen.module.scss'
import { OtherService } from '../../../services/other/other.service'
import getStatusGET from './getStatusGET'
import { Link } from 'react-scroll'

interface Tracker {
  vvv: () => void
  some: any
  handleChange: any
  number: string
  setPath: (a: number) => void
}

export const FirstScreen: FC<Tracker> = ({
  vvv,
  handleChange,
  number,
  setPath
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.blockLeft}>
          <div className={styles.titleCont}>
            <div className={styles.title}>Курьерская служба доставки</div>
            <div className={styles.title}>Люблино Экспресс</div>
          </div>
          <div className={styles.subtitle}>Отправляй и получай!</div>
          <div>
            <Link
              activeClass='active'
              to='form'
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              onClick={() => setPath(0)}
              className={styles.lowHeaderText}
            >
              <button className={styles.btn}>Заказать</button>
            </Link>
          </div>
        </div>
        <div className={styles.blockRight}>
          <div className={styles.track}>Номер заказа</div>
          <div className={styles.trackInput}>
            <input
              type='text'
              value={number}
              placeholder='Введите номер заказа'
              onChange={handleChange}
            />
          </div>
          <div>
            <Link
              activeClass='active'
              to='track'
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              onClick={() => setPath(1)}
              className={styles.lowHeaderText}
            >
              <button
                className={styles.btn}
                onClick={() => (number.length > 0 ? vvv() : null)}
              >
                Отследить
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
