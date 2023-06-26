import React from 'react'
import s from './Punkt.module.scss'
import Image from 'next/image'
import { useGetPunktById } from '../hoook/useGetPunktById'

interface PunktProps {
  setIdPunkt: React.Dispatch<React.SetStateAction<string | null>>
  id: string
}

const Punkt: React.FC<PunktProps> = ({ id, setIdPunkt }) => {
  const { data, isLoading } = useGetPunktById(id)
  return (
    <div className={s.punkt}>
      <div className={s.punkt__title} onClick={() => setIdPunkt(null)}>
        <Image width={8} height={14} alt='закрыть' src={'/arrowBack.svg'} />
        <p>Пункт выдачи</p>
      </div>
      <div className={s.desc}>
        <p className={s.desc__title}>
          {isLoading ? 'Загрузка...' : data?.properties.description}
        </p>
        <p className={s.desc__time}>
          {isLoading ? 'Загрузка...' : data?.properties.name}
        </p>
      </div>
      <div className={s.bg}></div>
      <div className={s.footer}>
        {isLoading ? (
          'Загрузка...'
        ) : (
          <>
            <div className={s.footer__el}>
              <Image
                src='/arrowSlider.svg'
                width={10}
                height={10}
                alt='вперед'
              />
            </div>
            <div className={s.footer__el}>
              <Image
                src='/arrowSlider.svg'
                width={10}
                height={10}
                alt='назад'
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Punkt
