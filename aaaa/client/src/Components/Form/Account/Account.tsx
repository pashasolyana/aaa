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
              <p>{rap?.at(0)?.goods?.at(0)?.weight} г.</p>
            </div>
            <div className={styles.info__el}>
              <p>Размер:</p>
              <p>
                {rap?.at(0)?.goods?.at(0)?.height} {rap?.at(0)?.goods?.at(0)?.height ? 'х' : 'x'} {rap?.at(0)?.goods?.at(0)?.width} {rap?.goods?.width ? 'x' : 'x'} {rap?.at(0)?.goods?.at(0)?.length} см.
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
        <>
        {rap === 'error' ? (
        <div className={styles.cont}>
          Не удалось загрузить данные
        </div>
        ):(
          <Loader />
        )}
        </>
      )}
    </>
  )
}

export default Account
