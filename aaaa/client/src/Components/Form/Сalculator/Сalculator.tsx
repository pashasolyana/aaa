import React, { ChangeEvent, useCallback, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
//css
import styles from './Сalculator.module.scss'
//img
import swap from '../../../assets/svg/swap.svg'
import { handleFormProps } from '../Form'
import clsx from 'clsx'
import { useMutation, useQueryClient } from 'react-query'
import { OtherService } from '../../../../services/other/other.service'
import useCities from './useCities'

export interface formInputs {
  cityFrom: string
  cityTo: string
  cityFromIndex: string
  cityToIndex: string
  insurance: string
  Bheight: number
  Bwidth: number
  Blenght: number
  Bsize: number
}

interface СalculatorProps {
  handleForm: (data: handleFormProps) => void
  isAccount: boolean
  setRap: (x: any) => void
  goo: any
  setGoo: any
  setCities: (x: any) => void
  setCities2: (x: any) => void
}

const Сalculator: React.FC<СalculatorProps> = ({
  handleForm,
  isAccount,
  setRap,
  goo,
  setGoo,
  setCities,
  setCities2
}) => {
  const [city, setCity] = useState('')
  const [index, setIndex] = useState('')
  const [city2, setCity2] = useState('')
  const [index2, setIndex2] = useState('')
  const [view, setView] = useState(false)
  const [view1, setView1] = useState(false)
  const queryClient = useQueryClient()

  console.log(goo)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setCity2(e.target.value)
  }

  const viewFirst = () => {
    return setView(true)
  }

  const { data } = useCities({
    search: city
  })

  const { data: data2 } = useCities({
    search: city2
  })

  console.log(data?.pages?.at(0), data2)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue
  } = useForm<formInputs>()

  const changeHandler = useCallback(
    (e: any) => {
      setGoo((prev: any) => ({
        ...prev,
        [e.target.name]: Number(e.target.value)
      }))
    },
    [goo]
  )

  const { mutate } = useMutation(
    'create-calkulator',
    (data: formInputs) =>
      OtherService.postCalcone({
        estimatedCost: Number(data.insurance),
        receiverIndex: data.cityToIndex,
        senderIndex: data.cityFromIndex,
        receiverAddress: data.cityTo,
        cityname: data.cityFrom,
        senderAddress: data.cityFrom,
        goods: [
          {
            height: +goo.height,
            length: +goo.length,
            width: +goo.width,
            weight: +goo.weight
          }
        ]
      }),
    {
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: [`calkulator`] })
        setRap(data)
        setCities(city)
        setCities2(city2)
      },
      onError(data: any) {
        console.log('errrroorrr')
      }
    }
  )

  const Submit = (data: any) => {
    mutate(data)
  }

  const swapFun = () => {
    let from = getValues('cityFrom')
    let to = getValues('cityTo')
    let indFrom = getValues('cityFromIndex')
    let indTo = getValues('cityToIndex')
    console.log(from, to, indFrom, indTo, '555555555555')
    reset({
      cityFrom: to,
      cityTo: from,
      cityFromIndex: indTo,
      cityToIndex: indFrom
    })
  }

  const changeInd = (ind: any, name: 'cityFromIndex' | 'cityToIndex') => {
    if (ind.target.value.length < 6) {
      setValue(name, ind.target.value)
      if (name == 'cityFromIndex') {
        setIndex(ind.target.value)
      } else {
        setIndex2(ind.target.value)
      }
    } else {
      setValue(name, ind.target.value.slice(0, 6))
      if (name == 'cityFromIndex') {
        setIndex(ind.target.value.slice(0, 6))
      } else {
        setIndex2(ind.target.value.slice(0, 6))
      }
    }
  }

  const changeSize = (size: any) => {
    if (size.target.value < 500) {
      setValue('Bsize', size.target.value)
      changeHandler(size)
    } else {
      setValue('Bsize', 500)
      changeHandler(size)
    }
  }

  const changeLinght = (ind: any, name: 'Bheight' | 'Bwidth' | 'Blenght') => {
    if (ind.target.value < 200) {
      setValue(name, ind.target.value)
      changeHandler(ind)
    } else {
      setValue(name, 200)
      changeHandler(ind)
    }
  }

  return (
    <>
      <form
        className={clsx(styles.cont, { [styles.cont_mod]: isAccount })}
        onSubmit={handleSubmit(Submit)}
      >
        <div className={styles.firstLine}>
          <div className={styles.inpEl}>
            <p>
              Город отправления<span>*</span>
            </p>
            <input
              {...register('cityFrom', {
                required: 'Обязательное поле'
              })}
              type='text'
              autoComplete='off'
              placeholder='Укажите город отправления'
              onChange={handleChange}
              value={city}
              // styles.inpEl_mod нужен когда есть поиск
              className={clsx({
                [styles.inpEl_mod]: view === true
              })}
              onFocus={() => setView(true)}
              onBlur={() => setView(false)}
            />
            <div
              id='dropdown'
              // styles.dropDown_mod нужен если нет поиска
              className={clsx(styles.dropDown, {
                [styles.dropDown_mod]: view === false
              })}
            >
              <div className={styles.dropDown__wrap}>
                {data?.pages?.at(0).length > 0 ? (
                  <>
                    {data?.pages?.at(0)?.map((el: any) => (
                      <p
                        onClick={() => {
                          setIndex(el.index)
                          setCity(el.address)
                          setView(false)
                          setValue('cityFrom', el.address)
                          setValue('cityFromIndex', el.index)
                        }}
                      >
                        {el.address}
                      </p>
                    ))}
                  </>
                ) : (
                  <>
                    {city.length > 0 ? (
                      <p>Такого города нет в списке</p>
                    ) : (
                      <p>Начните вводить название города</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.swap} onClick={swapFun}>
            <Image width={40} height={40} src={swap.src} alt='swap' />
          </div>
          <div className={styles.inpEl}>
            <p>
              Город назначения<span>*</span>
            </p>
            <input
              type='text'
              placeholder='Укажите город назначения'
              {...register('cityTo', {
                required: 'Обязательное поле'
              })}
              onChange={handleChange2}
              value={city2}
              autoComplete='off'
              // styles.inpEl_mod нужен когда есть поиск
              className={clsx({ [styles.inpEl_mod]: view1 === true })}
              onFocus={() => setView1(true)}
              onBlur={() => setView1(false)}
            />
            <div
              id='dropdown'
              // styles.dropDown_mod нужен если нет поиска
              className={clsx(styles.dropDown, {
                [styles.dropDown_mod]: view1 === false
              })}
            >
              <div className={styles.dropDown__wrap}>
                {data2?.pages?.at(0).length > 0 ? (
                  <>
                    {data2?.pages?.at(0)?.map((el: any) => (
                      <p
                        onClick={() => {
                          setIndex2(el.index)
                          setCity2(el.address)
                          setView1(false)
                          setValue('cityTo', el.address)
                          setValue('cityToIndex', el.index)
                        }}
                      >
                        {el.address}
                      </p>
                    ))}
                  </>
                ) : (
                  <>
                    {city2.length > 0 ? (
                      <p>Такого города нет в списке</p>
                    ) : (
                      <p>Начните вводить название города</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}>
          <div className={styles.inpEl}>
            <p>
              Индекс отправления<span></span>
            </p>
            <input
              value={index}
              type='number'
              placeholder='Укажите индекс отправления'
              {...register('cityFromIndex', {
                onChange: (e) => changeInd(e, 'cityFromIndex')
              })}
              autoComplete='off'
            />
          </div>
          <div className={styles.inpEl}>
            <p>
              Индекс назначения<span></span>
            </p>
            <input
              type='number'
              placeholder='Укажите индекс назначения'
              {...register('cityToIndex', {
                onChange: (e) => changeInd(e, 'cityToIndex')
              })}
              autoComplete='off'
              value={index2}
            />
          </div>
        </div>
        {
          //
        }
        <div className={styles.lineRev}>
          <div className={styles.lineRev__el}>
            <div className={styles.inpEl}>
              <p>
                Страховка, руб.<span>*</span>
              </p>
              <input
                type='number'
                placeholder='Укажите Страховку (руб.)'
                {...register('insurance')}
                autoComplete='off'
              />
            </div>
            <div className={styles.inpEl}>
              <p>
                Вес, гр.<span>*</span>
              </p>
              <input
                type='text'
                placeholder='Укажите вес(гр.)'
                {...register('Bsize')}
                name='weight'
                onChange={changeSize}
                autoComplete='off'
              />
            </div>
          </div>
          <div className={styles.lineRev__el}>
            <div className={styles.inpEl}>
              <p>Длина, см.</p>
              <input
                type='text'
                placeholder='Укажите длину(см)'
                {...register('Blenght')}
                name='length'
                onChange={(e) => changeLinght(e, 'Blenght')}
                autoComplete='off'
              />
            </div>
            <div className={styles.inpEl}>
              <p>Ширина, см.</p>
              <input
                type='text'
                placeholder='Укажите ширину(см)'
                {...register('Bwidth')}
                name='width'
                onChange={(e) => changeLinght(e, 'Bwidth')}
                autoComplete='off'
              />
            </div>
            <div className={styles.inpEl}>
              <p>Высота, см.</p>
              <input
                type='text'
                placeholder='Укажите высоту(см)'
                {...register('Bheight')}
                name='height'
                onChange={(e) => changeLinght(e, 'Bheight')}
                autoComplete='off'
              />
            </div>
          </div>
        </div>
        <div className={styles.lastLine}>
          <div className={styles.buttons}>
            <button type='button'>Оформить</button>
            <button type='submit'>Рассчитать</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Сalculator
