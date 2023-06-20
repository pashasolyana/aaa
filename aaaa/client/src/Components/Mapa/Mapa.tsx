import React, { useEffect, useState } from 'react'
import s from './Mapa.module.scss'
import Image from 'next/image'
import { useGetAllCoordinat } from './hoook/useGetAllCoordinat'

const Mapa = () => {
  const [pin, setPin] = useState([55.755811, 37.617617])
  const { data } = useGetAllCoordinat()

  useEffect(() => {
    //@ts-ignore
    window.ymaps.ready(init)
    function init() {
      // Создание карты.
      //@ts-ignore
      new window.ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 7
      })
    }
    //@ts-ignore
    new window.ymaps.LoadingObjectManager('//server.com/tile?bbox=%b', {
      // Включаем кластеризацию.
      clusterize: true,
      // Зададим опции кластерам.
      // Опции кластеров задаются с префиксом cluster.
      clusterHasBalloon: false,
      // Опции объектов задаются с префиксом geoObject.
      geoObjectOpenBalloonOnClick: false
    })
  }, [])

  // const clickOnMap = (e: any) => {
  //   setPin(e.get('coords'))
  // }
  return (
    <div className={s.cont}>
      <h1 className={s.title}>Пункты выдачи заказов</h1>
      <div className={s.wrapper}>
        <div id='map' className={s.map}></div>
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
