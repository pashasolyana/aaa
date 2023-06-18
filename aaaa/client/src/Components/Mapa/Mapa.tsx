import React, { useState } from 'react'
import s from './Mapa.module.scss'
import { YMaps, Map, Placemark,Clusterer } from '@pbe/react-yandex-maps'
import Image from 'next/image'

const Mapa = () => {
  const [pin, setPin] = useState([55.755811, 37.617617])
  const clickOnMap = (e: any) => {
    setPin(e.get('coords'))
  }
  return (
    <div className={s.cont}>
      <h1 className={s.title}>Пункты выдачи заказов</h1>
      <div className={s.wrapper}>
        <YMaps query={{ apikey: process.env.MAPA_KEY }}>
          <Map
            className={s.map}
            defaultState={{ center: [55.755811, 37.617617], zoom: 10 }}
            onClick={(e: any) => clickOnMap(e)}
            options={{ suppressMapOpenBlock: true }}
          >
            <Clusterer
              options={{
                preset: 'islands#invertedVioletClusterIcons',
                groupByCoordinates: false
              }}
            >
              {[[55.355811, 37.617617],[55.755811, 37.917617],[55.155811, 37.617617]].map((coordinates, index) => (
                <Placemark key={index} geometry={coordinates} />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
        <div className={s.listCont}>
          <h1 className={s.listCont__title}>Список адресов</h1>
          <div className={s.listCont__search}>
            <Image width={15} height={15} alt='Поиск' src={'/search.svg'} />
            <input type='text' placeholder='Ближайший адрес' />
          </div>
          <div className={s.list}>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
            <div className={s.list__el}>
              <p className={s.list__el__title}>Москва, пр. Рязанский, 184</p>
              <p className={s.list__el__time}>10:00 - 20:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mapa
