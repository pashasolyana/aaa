import { FC } from 'react'
import styles from './FirstScreen.module.scss'
import { Link } from 'react-scroll'
import Image from 'next/image'

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
  const nav = () => {
    setPath(1)
    if (number.length > 0) vvv()
  }

  return (
    <div className={styles.cont}>
      <div className={styles.info}>
        <h1 className={styles.info__title}>
          Курьерская служба доставки Люблино Экспресс
        </h1>
        <div className={styles.descCont}>
          <div className={styles.descCont__arrow}>
            <p>Доставим что угодно</p>
            <Image src={'/arrow.svg'} width={31} height={42} alt='' />
            <p>куда угодно. Наш сайт предоставляет</p>
          </div>
          <p className={styles.descCont__text}>
            возможность отслеживания статуса вашего заказа на каждом этапе
            доставки, начиная от момента отправки до момента получения товара.
          </p>
          <p className={styles.descCont_mod}>
            Доставим что угодно куда угодно. Наш сайт предоставляет возможность
            отслеживания статуса вашего заказа на каждом этапе доставки, начиная
            от момента отправки до момента получения товара.
          </p>
        </div>
      </div>
      <div className={styles.traceCont}>
        <h1 className={styles.traceCont__title}>Номер заказа</h1>
        <div className={styles.traceCont__search}>
          <div className={styles.traceCont__input}>
            <Image src={'/search.svg'} width={15} height={15} alt='search' />
            <input
              type='text'
              value={number}
              placeholder='Номер заказа'
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
            onClick={nav}
          >
            <button>Отследить</button>
          </Link>
        </div>
      </div>
      <div className={styles.leftBorder}></div>
      <div className={styles.rigthBorder}></div>
        <div id='form'></div>
    </div>
  )
}
