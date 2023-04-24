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
  allCities: any
}

const Сalculator: React.FC<СalculatorProps> = ({
  handleForm,
  isAccount,
  setRap,
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

  const router = useRouter()
  const queryClient = useQueryClient()

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
    console.log(selectedIndex, 'index')
    const selectedItem = data?.pages?.at(0)[selectedIndex]
    setIndex(selectedItem?.index)
    setCity(selectedItem?.address)
    setView(false)
    setValue('cityFrom', selectedItem?.address)
    setValue('cityFromIndex', selectedItem?.index)
  }

  const handleSelectionTo = (selectedIndex: number) => {
    const selectedItem = data2?.pages?.at(0)[selectedIndex]

    setIndex2(selectedItem?.index)
    setCity2(selectedItem?.address)
    setView1(false)
    setValue('cityTo', selectedItem?.address)
    setValue('cityToIndex', selectedItem?.index)
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
  console.log(data)

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
    console.log(e.target.value, 'city')
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

  const Submit = (data: any) => {
    mutate(data)
  }

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

  const changeInd = (ind: any, name: 'cityFromIndex' | 'cityToIndex') => {
    if (ind.target.value < 1) {
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
    if (size.target.value < 1) {
      setValue('Bsize', 0)
      changeHandler(size)
    } else if (size.target.value < 500000) {
      setValue('Bsize', size.target.value.replace(/[\W_]/g, ''))
      changeHandler(size)
    } else {
      setValue('Bsize', 500000)
      changeHandler(size)
    }
  }

  const changeLinght = (ind: any, name: 'Bheight' | 'Bwidth' | 'Blenght') => {
    if (ind.target.value < 1) {
      setValue(name, 0)
      changeHandler(ind)
    } else if (ind.target.value < 200 && ind.target.value >= 0) {
      setValue(name, ind.target.value.replace(/[\W_]/g, ''))
      changeHandler(ind)
    } else {
      setValue(name, 200)
      changeHandler(ind)
    }
  }

  const changePrice = (price: any) => {
    console.log(price.target.value < 1)
    if (price.target.value < 1) {
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
              onKeyDown={handleKeyDown}
              required
              placeholder='Укажите город отправления'
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
            {data?.pages?.at(0)?.length < 1 && view === false && (
              <p
                className='text-xs absolute top-20 pt-0.5'
                style={{ color: 'red' }}
              >
                Город введен неверно
              </p>
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
                  <div key={el.a}>
                    <p
                      className='cursor-pointer hover:bg-black hover:bg-opacity-10'
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
                      style={{
                        backgroundColor:
                          index === focusedIndex ? 'rgba(0,0,0,0.1)' : ''
                      }}
                    >
                      {el.address}
                    </p>
                  </div>
                ))}
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
              {...register('cityTo', {
                required: 'Обязательное поле'
              })}
              type='text'
              autoComplete='off'
              onKeyDown={handleKeyDown2}
              required
              placeholder='Укажите город отправления'
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
            {data?.pages?.at(0)?.length < 1 && view === false && (
              <p
                className='text-xs absolute top-20 pt-0.5'
                style={{ color: 'red' }}
              >
                Город введен неверно
              </p>
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
                  <div key={el.a}>
                    <p
                      className='cursor-pointer hover:bg-black hover:bg-opacity-10'
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
                      style={{
                        backgroundColor:
                          index === focusedIndex2 ? 'rgba(0,0,0,0.1)' : ''
                      }}
                    >
                      {el.address}
                    </p>
                  </div>
                ))}
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
              {...register('cityFromIndex')}
              autoComplete='off'
              onChange={(e) => changeInd(e, 'cityFromIndex')}
              onWheel={numberInputOnWheelPreventChange}
            />
          </div>
          <div className={styles.inpEl}>
            <p>
              Индекс назначения<span></span>
            </p>
            <input
              type='number'
              placeholder='Укажите индекс назначения'
              {...register('cityToIndex')}
              autoComplete='off'
              value={index2}
              onChange={(e) => changeInd(e, 'cityToIndex')}
              onWheel={numberInputOnWheelPreventChange}
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
                {...register('insurance', {
                  required: 'Обязательное поле'
                })}
                required
                autoComplete='off'
                onChange={changePrice}
                onWheel={numberInputOnWheelPreventChange}
              />
            </div>
            <div className={styles.inpEl} id='acc'>
              <p>
                Вес, г.<span>*</span>
              </p>
              <input
                type='number'
                placeholder='Укажите вес(г.)'
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
          <div className={styles.lineRev__el}>
            <div className={styles.inpEl}>
              <p>Длина, см.</p>
              <input
                type='number'
                placeholder='Укажите длину(см)'
                {...register('Blenght')}
                name='length'
                onChange={(e) => changeLinght(e, 'Blenght')}
                autoComplete='off'
                onWheel={numberInputOnWheelPreventChange}
              />
            </div>
            <div className={styles.inpEl}>
              <p>Ширина, см.</p>
              <input
                type='number'
                placeholder='Укажите ширину(см)'
                {...register('Bwidth')}
                name='width'
                onChange={(e) => changeLinght(e, 'Bwidth')}
                autoComplete='off'
                onWheel={numberInputOnWheelPreventChange}
              />
            </div>
            <div className={styles.inpEl}>
              <p>Высота, см.</p>
              <input
                type='number'
                placeholder='Укажите высоту(см)'
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
        <div className={styles.lastLine}>
          <div className={styles.buttons}>
            <button type='button'>Оформить</button>
            <button
              type='submit'
              onClick={() => {
                router.push('#acc')
              }}
            >
              Рассчитать
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Сalculator
