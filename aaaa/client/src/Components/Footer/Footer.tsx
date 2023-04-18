import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.cont} id='documents'>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Документы</h1>
        <p className={styles.desc}>Скоро здесь будет информация о нас!</p>
      </div>
    </div>
  )
}

export default Footer
