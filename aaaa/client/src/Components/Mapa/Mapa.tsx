import React, { useEffect, useState } from 'react'
import s from './Mapa.module.scss'
import Image from 'next/image'
import point from '../../../public/point.svg'
import { useGetAllCoordinat } from './hoook/useGetAllCoordinat'
import { coordinateObjEntity } from '../../../services/map/type'
import { throttle } from '../../../utils/throttle/throttle'
import { useScroll } from '../../../utils/useScroll/useScroll'
import { useDebounce } from '../../../utils/useDebounce/useDebounce'
import Punkt from './Punkt/Punkt'

const Mapa = () => {
  const [searchText, setSearchText] = useState<string>('')
  const { data, fetchNextPage } = useGetAllCoordinat({ searchText })
  const [idPunkt, setIdPunkt] = useState<null | string>(null)

  const { checkScroll } = useScroll({
    fetchNextPage
  })

  const throttleHandle = throttle(checkScroll, 1000)

  const searchHandle = (data: string) => {
    setSearchText(data)
  }

  const myDebounce = useDebounce(searchHandle, 200)

  const setPunkt = (id: string) => {
    console.log(id)
    setIdPunkt(id)
  }

  useEffect(() => {
    //@ts-ignore
    window.ymaps.ready(init)
    function init() {
      // Создание карты.
      //@ts-ignore
      let map = new window.ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 7
      })
      //@ts-ignore
      let loadingObjectManager = new window.ymaps.LoadingObjectManager(
        'http://81.200.152.89/api/pvz/coordinatOnly?tileNumber=%b',
        {
          clusterize: true,
          clusterHasBalloon: false,
          geoObjectOpenBalloonOnClick: true
        }
      )
      loadingObjectManager.objects.options.set({
        preset: 'islands#blueCircleDotIcon',
        iconLayout: 'default#image',
        iconImageHref: point.src,
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -15]
      })

      loadingObjectManager.objects.events.add('click', function (
        e: coordinateObjEntity
      ) {
        var objectId = e.get('objectId')
        var objectData = loadingObjectManager.objects.getById(objectId)
        setPunkt(objectData.id)
      })
      map.geoObjects.add(loadingObjectManager)
    }
  }, [])

  return (
    <div className={s.cont}>
      <h1 className={s.title}>Пункты выдачи заказов</h1>
      <div className={s.wrapper}>
        <div id='map' className={s.map}></div>
        <div className={s.listCont}>
          <h1 className={s.listCont__title}>Список адресов</h1>
          <div className={s.listCont__search}>
            <Image width={15} height={15} alt='Поиск' src={'/search.svg'} />
            <input
              type='text'
              placeholder='Ближайший адрес'
              onChange={(e) => myDebounce(e.target.value)}
            />
          </div>
          <div className={s.list} onScroll={throttleHandle}>
            {data?.pages.map((elem) =>
              elem.pvz.map((el) => (
                <div
                  className={s.list__el}
                  key={el._id}
                  onClick={() => setIdPunkt(el._id)}
                >
                  <p className={s.list__el__title}>{el.location.address}</p>
                  {el.workedTime.split(',').map((time, ind) => (
                    <p className={s.list__el__time} key={el._id + ind}>
                      {time}
                    </p>
                  ))}
                </div>
              ))
            )}
          </div>
          {idPunkt ? <Punkt id={idPunkt} setIdPunkt={setIdPunkt} /> : <></>}
        </div>
      </div>
    </div>
  )
}

export default Mapa
