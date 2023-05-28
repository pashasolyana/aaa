import Image from 'next/image'
import styles from './Delivery.module.scss'

export const Delivery = () => {
  return (
    <>
      <div className={styles.container}>
        <div className='z-20'>
          <div className={styles.title}>Мы можем доставить</div>
          <div className={styles.title}>что угодно, куда угодно</div>
          <div className={styles.sub}>Доставляем по всей России</div>
        </div>
        <Image
          src='/map.png'
          alt='Map'
          width={983}
          height={626}
          className={styles.bg}
        />
      </div>
      <div className={styles.line}></div>
    </>
  )
}
