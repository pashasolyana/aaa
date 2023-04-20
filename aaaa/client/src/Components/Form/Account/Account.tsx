import React, { FC } from 'react'
import styles from './Account.module.scss'
import Loader from '@/Components/Loader/Loader'

export interface handleFormProps {
  rap: any
  goo: any
  cities: string
  cities2: string
}

const Account: FC<handleFormProps> = ({ rap, goo, cities, cities2 }) => {
  const zzz = () => {
    const timeDiff =
      new Date(rap?.at(0)?.deliveryDateMin).getTime() - new Date().getTime()
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return diffDays
  }

  console.log(rap)

  return (
    <>
      {rap?.at(0)?.priceByCurrency ? (
        <div className={styles.cont}>
          <div className={styles.info}>
            <div className={styles.city}>
              <p>{cities}</p>
              <p>–</p>
              <p>{cities2}</p>
            </div>
            <div className={styles.info__el}>
              <p>Вес: </p>
              <p>{goo?.weight} кг.</p>
            </div>
            <div className={styles.info__el}>
              <p>Размер:</p>
              <p>
                {goo?.height} х {goo?.width} х {goo?.length} см.
              </p>
            </div>
            <div className={styles.info__el}>
              <p>Стоимость*:</p>
              <p>{rap?.at(0)?.priceByCurrency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</p>
            </div>
            <div className={styles.info__el}>
              <p>Срок доставки:</p>
              <p>{zzz()} дней</p>
            </div>
          </div>
          <p className={styles.text}>
            * - Стоимость является ориентировочной. Точная стоимость будет
            рассчитана при физической сдаче заказа
          </p>
        </div>
      ) : (
        <div className={styles.cont}>
          <Loader />
        </div>
      )}
    </>
  )
}

export default Account
