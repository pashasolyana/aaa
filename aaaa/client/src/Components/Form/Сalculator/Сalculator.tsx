import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
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
import { useRouter } from 'next/router'

export interface formInputs {
  cityFrom: string
  cityTo: string
  cityFromIndex: string
  cityToIndex: string
  insurance: string
  Bheight: string
  Bwidth: string
  Blenght: string
  Bsize: string
}

interface СalculatorProps {
  handleForm: (data: handleFormProps) => void
  isAccount: boolean
  setRap: (x: any) => void
  goo: any
  rap: any
  setGoo: any
  setCities: (x: any) => void
  setCities2: (x: any) => void
  allCities: any
}

const Сalculator: React.FC<СalculatorProps> = ({
  handleForm,
  isAccount,
  setRap,
  rap,
  goo,
  setGoo,
  setCities,
  setCities2,
  allCities
}) => {
  const [city, setCity] = useState('')
  const [index, setIndex] = useState('')
  const [city2, setCity2] = useState('')
  const [index2, setIndex2] = useState('')
  const [view, setView] = useState(false)
  const [view1, setView1] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [focusedIndex2, setFocusedIndex2] = useState(-1)
  const resultContainer = useRef<HTMLDivElement>(null)
  const resultContainer2 = useRef<HTMLDivElement>(null)

  const [isViewVolume, setIsViewVolume] = useState(false)

  const zzz = () => {
    const titles = ['День', 'Дня', 'Дней']
    const timeDiff =
      new Date(rap?.at(0)?.deliveryDateMin).getTime() - new Date().getTime()
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

    const cases = [2, 0, 1, 1, 1, 2]
    const dayTitle = `${
      titles[
        diffDays % 100 > 4 && diffDays % 100 < 20
          ? 2
          : cases[diffDays % 10 < 5 ? diffDays % 10 : 5]
      ]
    }`
    return diffDays + ' ' + dayTitle
  }

  const router = useRouter()
  const queryClient = useQueryClient()

  console.log(rap?.at(0), 'RAPRAPRAP')

  useEffect(() => {
    if (!resultContainer.current) return

    resultContainer.current.scrollIntoView({
      behavior: 'auto',
      block: 'center'
    })
    console.log(resultContainer.current, 'апаплапл')
  }, [focusedIndex])

  useEffect(() => {
    if (!resultContainer2.current) return

    resultContainer2.current.scrollIntoView({
      behavior: 'auto',
      block: 'center'
    })
    console.log(resultContainer2.current, '2222222')
  }, [focusedIndex2])

  const handleSelection = (selectedIndex: number) => {
    if (selectedIndex !== 0) {
      const selectedItem = data?.pages?.at(0)[selectedIndex]
      setIndex(selectedItem?.index)
      setCity(selectedItem?.address)
      setView(false)
      setValue('cityFrom', selectedItem?.address)
      setValue('cityFromIndex', selectedItem?.index)
    } else {
      setIndex(index)
      setCity(city)
    }
  }

  const handleSelectionTo = (selectedIndex: number) => {
    if (selectedIndex !== 0) {
      const selectedItem = data2?.pages?.at(0)[selectedIndex]

      setIndex2(selectedItem?.index)
      setCity2(selectedItem?.address)
      setView1(false)
      setValue('cityTo', selectedItem?.address)
      setValue('cityToIndex', selectedItem?.index)
    } else {
      setIndex2(index2)
      setCity2(city2)
    }
  }

  const numberInputOnWheelPreventChange = (e: any) => {
    e.target.blur()
    e.stopPropagation()
    setTimeout(() => {
      e.target.focus()
    }, 0)
  }

  const { data } = useCities({
    search: city
  })

  const { data: data2 } = useCities({
    search: city2
  })

  console.log(data2, '1111111')

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e
    let nextIndexCount = 0
    if (key === 'ArrowDown')
      nextIndexCount = (focusedIndex + 1) % data?.pages?.at(0)?.length
    if (key === 'ArrowUp')
      nextIndexCount = (focusedIndex - 1) % data?.pages?.at(0)?.length
    if (key === 'Enter') {
      e.preventDefault()
      handleSelection(focusedIndex)
    }
    if (key === 'Escape') setView(false)
    setFocusedIndex(nextIndexCount)
  }

  const handleKeyDown2: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e
    let nextIndexCount = 0
    if (key === 'ArrowDown')
      nextIndexCount = (focusedIndex2 + 1) % data2?.pages?.at(0)?.length
    if (key === 'ArrowUp')
      nextIndexCount = (focusedIndex2 - 1) % data2?.pages?.at(0)?.length
    if (key === 'Enter') {
      e.preventDefault()
      handleSelectionTo(focusedIndex2)
    }
    if (key === 'Escape') setView1(false)
    setFocusedIndex2(nextIndexCount)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setCity2(e.target.value)
  }

  const viewFirst = () => {
    return setView(true)
  }

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
        setRap('error')
      }
    }
  )

  const swapFun = () => {
    let from = getValues('cityFrom')
    let to = getValues('cityTo')
    let indFrom = getValues('cityFromIndex')
    let indTo = getValues('cityToIndex')
    /*
    reset({
      cityFrom: to,
      cityTo: from,
      cityFromIndex: indTo,
      cityToIndex: indFrom
    })
    */
    setCity(to)
    setCity2(from)
    setIndex(indTo)
    setIndex2(indFrom)
    setValue('cityFrom', to)
    setValue('cityFromIndex', indTo)
    setValue('cityTo', from)
    setValue('cityToIndex', indFrom)
  }

  const handleCheckFormData = () => {
    if (
      getValues('cityFrom') == '' ||
      getValues('cityTo') == '' ||
      getValues('insurance') == '' ||
      +goo.weight < 1
    ) {
      return false
    } else {
      return true
    }
  }

  console.log(handleCheckFormData(), '11111111')

  const changeInd = (ind: any, name: 'cityFromIndex' | 'cityToIndex') => {
    if (ind.target.value === '') {
      setValue(name, '')
      if (name == 'cityFromIndex') {
        setIndex('')
      } else {
        setIndex2('')
      }
    } else if (ind.target.value < 1) {
      setValue(name, '0')
      if (name == 'cityFromIndex') {
        setIndex('0')
      } else {
        setIndex2('0')
      }
    } else if (ind.target.value.length < 6) {
      let index = ind.target.value.replace(/[^\d]/g, '')
      setValue(name, index.replace(/[\W_]/g, ''))
      if (name == 'cityFromIndex') {
        setIndex(index.replace(/[\W_]/g, ''))
      } else {
        setIndex2(index.replace(/[\W_]/g, ''))
      }
    } else {
      setValue(name, index.slice(0, 6))
      if (name == 'cityFromIndex') {
        setIndex(index.slice(0, 6).replace(/[\W_]/g, ''))
      } else {
        setIndex2(index.slice(0, 6).replace(/[\W_]/g, ''))
      }
    }
  }

  const changeSize = (size: any) => {
    if (size.target.value === '') {
      setValue('Bsize', '')
      changeHandler(size)
    } else if (size.target.value < 1) {
      setValue('Bsize', '0')
      changeHandler(size)
    } else if (size.target.value < 500000) {
      setValue('Bsize', size.target.value.replace(/[\W_]/g, ''))
      changeHandler(size)
    } else {
      setValue('Bsize', '500000')
      changeHandler(size)
    }
  }

  const changeLinght = (ind: any, name: 'Bheight' | 'Bwidth' | 'Blenght') => {
    if (ind.target.value === '') {
      setValue(name, '')
      changeHandler(ind)
    } else if (ind.target.value < 1) {
      setValue(name, '0')
      changeHandler(ind)
    } else if (ind.target.value < 20000 && ind.target.value >= 0) {
      setValue(name, ind.target.value.replace(/[\W_]/g, ''))
      changeHandler(ind)
    } else {
      setValue(name, '20000')
      changeHandler(ind)
    }
  }

  const Submit = (data: any) => {
    console.log(data)
    mutate(data)
  }

  const changePrice = (price: any) => {
    if (price.target.value === '') {
      setValue('insurance', '')
      changeHandler(price)
    } else if (price.target.value < 1) {
      setValue('insurance', '0')
      changeHandler(price)
    } else if (price.target.value < 1000000) {
      setValue('insurance', price.target.value.replace(/[\W_]/g, ''))
      changeHandler(price)
    } else {
      setValue('insurance', '1000000')
      changeHandler(price)
    }
  }

  const toggleVolume = () => {
    if (isViewVolume) {
      reset({ Bheight: undefined, Bwidth: undefined, Blenght: undefined })
      setIsViewVolume(false)
    } else {
      setIsViewVolume(true)
    }
  }

  return (
    <form className={styles.cont} onSubmit={handleSubmit(Submit)}>
      <div className={styles.leftBlock}>
        <h1 className={styles.title}>Города отправления и назначения</h1>
        <div className={styles.fromTo}>
          <div className={styles.inpEl}>
            <div className={styles.leftBlock__input}>
              <Image width={6} height={16} src={'./fromCity.svg'} alt='from' />
              <input
                {...register('cityFrom', {
                  required: 'Обязательное поле'
                })}
                type='text'
                autoComplete='off'
                onKeyDown={handleKeyDown}
                required
                placeholder='Откуда'
                onChange={handleChange}
                value={city}
                // styles.inpEl_mod нужен когда есть поиск
                className={clsx({
                  [styles.inpEl_mod]: view && city.length !== 0
                })}
                onFocus={() => setView(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setView(false)
                  }, 10)
                }
              />
            </div>
            {data?.pages?.at(0)?.length == 0 && (
              <p className={styles.err}>Город введен неверно</p>
            )}
            <div
              id='dropdown'
              // styles.dropDown_mod нужен если нет поиска
              className={clsx(styles.dropDown, {
                [styles.dropDown_mod]: !view || city.length < 1
              })}
            >
              <div className={styles.dropDown__wrap}>
                {data?.pages?.at(0)?.map((el: any, index: number) => (
                  <div
                    key={el.a}
                    className={styles.dropDown__el}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIndex(el.index)
                      setCity(el.address)
                      setView(false)
                      setValue('cityFrom', el.address)
                      setValue('cityFromIndex', el.index)
                    }}
                    ref={index === focusedIndex ? resultContainer : null}
                  >
                    <p>{el.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Image
            width={17}
            height={15}
            src={swap.src}
            alt='swap'
            className={styles.swap}
            onClick={swapFun}
          />
          <div className={styles.inpEl}>
            <div className={styles.leftBlock__input}>
              <Image width={6} height={16} src={'./toCity.svg'} alt='from' />
              <input
                {...register('cityTo', {
                  required: 'Обязательное поле'
                })}
                type='text'
                autoComplete='off'
                onKeyDown={handleKeyDown2}
                required
                placeholder='Куда'
                onChange={handleChange2}
                value={city2}
                // styles.inpEl_mod нужен когда есть поиск
                className={clsx({
                  [styles.inpEl_mod]: view1 && city2.length !== 0
                })}
                onFocus={() => setView1(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setView1(false)
                  }, 10)
                }
              />
            </div>
            {data?.pages?.at(0)?.length == 0 && (
              <p className={styles.err}>Город введен неверно</p>
            )}
            <div
              id='dropdown'
              // styles.dropDown_mod нужен если нет поиска
              className={clsx(styles.dropDown, {
                [styles.dropDown_mod]: !view1 || city2.length < 1
              })}
            >
              <div className={styles.dropDown__wrap}>
                {data2?.pages?.at(0)?.map((el: any, index: number) => (
                  <div
                    key={el.a}
                    className={styles.dropDown__el}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIndex2(el.index)
                      setCity2(el.address)
                      setView1(false)
                      setValue('cityTo', el.address)
                      setValue('cityToIndex', el.index)
                    }}
                    ref={index === focusedIndex2 ? resultContainer2 : null}
                  >
                    <p>{el.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}>
          <div className={styles.line__el}>
            <h1 className={styles.title}>Стоимость страховки</h1>
            <div className={styles.leftBlock__input}>
              <Image width={13} height={18} src={'./price.svg'} alt='from' />
              <input
                type='number'
                placeholder='Цена в рублях'
                {...register('insurance', {
                  required: 'Обязательное поле'
                })}
                required
                autoComplete='off'
                onChange={changePrice}
                onWheel={numberInputOnWheelPreventChange}
              />
            </div>
          </div>
          <div className={styles.line__el}>
            <h1 className={styles.title}>Вес</h1>
            <div className={styles.leftBlock__input}>
              <Image width={13} height={18} src={'./price.svg'} alt='from' />
              <input
                min='0'
                inputMode='numeric'
                pattern='[0-9]*'
                type='number'
                placeholder='Вес в граммах'
                {...register('Bsize', {
                  required: 'Обязательное поле'
                })}
                name='weight'
                required
                onChange={changeSize}
                autoComplete='off'
                onWheel={numberInputOnWheelPreventChange}
              />
            </div>
          </div>
        </div>
        <div
          className={clsx(styles.volumeBtn, {
            [styles.volumeBtn_mod]: isViewVolume
          })}
          onClick={toggleVolume}
        >
          <p>Указать размеры</p>
          <Image width={12} height={12} src={'./closeB.svg'} alt='close' />
        </div>
        {isViewVolume ? (
          <div className={styles.volume}>
            <div className={styles.line__el}>
              <h1 className={styles.title}>Длина</h1>
              <div className={styles.leftBlock__input}>
                <Image width={13} height={18} src={'./price.svg'} alt='from' />
                <input
                  type='number'
                  placeholder='Длина в мм'
                  {...register('Blenght')}
                  name='length'
                  onChange={(e) => changeLinght(e, 'Blenght')}
                  autoComplete='off'
                  onWheel={numberInputOnWheelPreventChange}
                />
              </div>
            </div>
            <div className={styles.line__el}>
              <h1 className={styles.title}>Ширина</h1>
              <div className={styles.leftBlock__input}>
                <Image width={13} height={18} src={'./price.svg'} alt='from' />
                <input
                  type='number'
                  placeholder='Ширина в мм'
                  {...register('Bwidth')}
                  name='width'
                  onChange={(e) => changeLinght(e, 'Bwidth')}
                  autoComplete='off'
                  onWheel={numberInputOnWheelPreventChange}
                />
              </div>
            </div>
            <div className={styles.line__el}>
              <h1 className={styles.title}>Высота</h1>
              <div className={styles.leftBlock__input}>
                <Image width={13} height={18} src={'./price.svg'} alt='from' />
                <input
                  type='number'
                  placeholder='Высота в мм'
                  {...register('Bheight')}
                  name='height'
                  onChange={(e) => changeLinght(e, 'Bheight')}
                  autoComplete='off'
                  step='1'
                  onWheel={numberInputOnWheelPreventChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <button
          type='submit'
          className={
            handleCheckFormData()
              ? styles.calculateBtnDone
              : styles.calculateBtn
          }
        >
          Рассчитать
        </button>
        {rap && (
          <div className={styles.calc}>
            <div className={styles.calc__line}>
              <span>ГОрод</span>
              <p>
                {!rap ? 'Санкт-Петербург' : rap?.at(0)?.senderAddress} -{' '}
                {!rap ? 'Москва' : rap?.at(0)?.receiverAddress}
              </p>
            </div>
            <div className={styles.calc__line}>
              <span>Вес</span>
              <p>
                {!rap
                  ? '1640 грамм'
                  : `${rap?.at(0)?.goods?.at(0)?.weight} грамм`}
              </p>
            </div>
            <div className={styles.calc__line}>
              <span>Размер</span>
              <p>
                {!rap ? '100' : rap?.at(0)?.goods?.at(0)?.height} х{' '}
                {!rap ? '450' : rap?.at(0)?.goods?.at(0)?.width} х{' '}
                {!rap ? '320' : rap?.at(0)?.goods?.at(0)?.length} мм
              </p>
            </div>
            <div className={styles.calc__line}>
              <span>Стоимость</span>
              <p>{!rap ? '1800' : rap?.at(0)?.priceByCurrency} ₽</p>
            </div>
            <div className={styles.calc__line}>
              <span>Срок доставки</span>
              <p>{!rap ? '14' : zzz()}</p>
            </div>
            <p className={styles.calc__text}>
              Стоимость является ориентировочной. Точная стоимость будет
              рассчитана при физической сдаче заказа
            </p>
          </div>
        )}
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.rightBlock__box}>
          <Image src={'./boxCalc.svg'} width={367} height={323} alt='box' />
          <input
            type='number'
            placeholder='Вес'
            {...register('Bsize', {
              required: 'Обязательное поле'
            })}
            name='weight'
            required
            onChange={changeSize}
            autoComplete='off'
            onWheel={numberInputOnWheelPreventChange}
            className={styles.rightBlock__weight}
          />
          <input
            type='number'
            placeholder='Длина'
            {...register('Blenght')}
            name='length'
            onChange={(e) => changeLinght(e, 'Blenght')}
            autoComplete='off'
            onWheel={numberInputOnWheelPreventChange}
            className={styles.rightBlock__length}
          />
          <input
            type='number'
            placeholder='Ширина'
            {...register('Bwidth')}
            name='width'
            onChange={(e) => changeLinght(e, 'Bwidth')}
            autoComplete='off'
            onWheel={numberInputOnWheelPreventChange}
            className={styles.rightBlock__width}
          />
          <input
            type='number'
            placeholder='Высота'
            {...register('Bheight')}
            name='height'
            onChange={(e) => changeLinght(e, 'Bheight')}
            autoComplete='off'
            step='1'
            onWheel={numberInputOnWheelPreventChange}
            className={styles.rightBlock__height}
          />
        </div>
      </div>
      {rap && (
        <div className={styles.calc_mod}>
          <div className={styles.calc__line}>
            <span>ГОрод</span>
            <p>
              {!rap ? 'Санкт-Петербург' : rap?.at(0)?.senderAddress} -{' '}
              {!rap ? 'Москва' : rap?.at(0)?.receiverAddress}
            </p>
          </div>
          <div className={styles.calc__line}>
            <span>Вес</span>
            <p>{!rap ? '1640 грамм' : rap?.at(0)?.goods?.at(0)?.weight}</p>
          </div>
          <div className={styles.calc__line}>
            <span>Размер</span>
            <p>
              {!rap ? '100' : rap?.at(0)?.goods?.at(0)?.height} х{' '}
              {!rap ? '450' : rap?.at(0)?.goods?.at(0)?.width} х{' '}
              {!rap ? '320' : rap?.at(0)?.goods?.at(0)?.length} мм
            </p>
          </div>
          <div className={styles.calc__line}>
            <span>Стоимость</span>
            <p>{!rap ? '1800' : rap?.at(0)?.priceByCurrency} ₽</p>
          </div>
          <div className={styles.calc__line}>
            <span>Срок доставки</span>
            <p>{!rap ? '14' : zzz()}</p>
          </div>
          <p className={styles.calc__text}>
            Стоимость является ориентировочной. Точная стоимость будет
            рассчитана при физической сдаче заказа
          </p>
        </div>
      )}
    </form>
  )
}

export default Сalculator
