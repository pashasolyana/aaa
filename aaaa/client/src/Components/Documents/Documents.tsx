import React from 'react'
import s from './Documents.module.scss'

const Documents = () => {
  return (
    <div className={s.cont}>
      <div className='absolute' id='documents'></div>
      <h1 className={s.title}>Наши документы</h1>
      <div className={s.wrap}>
        <div className={s.wrap__el}>
          <p>Лицензия на услуги почтовой связи</p>
        </div>
        <div className={s.wrap__el}>
          <p>Продление срока действия почтовой лицензии</p>
        </div>
        <div className={s.wrap__el}>
          <p>Свидетельство о включении в реестр</p>
        </div>
        <div className={s.wrap__el}>
          <p>Свидетельство о постановке на специальный учет</p>
        </div>
        <div className={s.wrap__el}>
          <p>Лицензия на услуги почтовой связи</p>
        </div>
        <div className={s.wrap__el}>
          <p>Свидетельство о гарантии доставки</p>
        </div>
      </div>
    </div>
  )
}

export default Documents
