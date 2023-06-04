import React from 'react'
import s from './Edit.module.scss'
import Close from '../../../public/PCabinet/closeIco'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

const Edit = () => {
  const { register, handleSubmit, resetField } = useForm<{
    title: string
    desc: string
  }>()

  const submit = (data: { title: string; desc: string }) => {
    console.log(data)
  }

  return (
    <form className={s.cont} onSubmit={handleSubmit(submit)}>
      <div className={s.header}>
        <div className={s.header__el}>
          <p className={s.title}>Заголовок</p>
          <div className={s.header__textArea}>
            <textarea {...register('title', { required: true })}>
              Курьерская служба доставки Люблино Экспресс
            </textarea>
            <Close onClick={() => resetField('title')} />
          </div>
        </div>
        <div className={s.header__el}>
          <p className={s.title}>Описание</p>
          <div className={s.header__textArea}>
            <textarea {...register('desc', { required: true })}>
              Доставим что угодно - куда угодно. Наш сайт предоставляет
              возможность отслеживания статуса вашего заказа на каждом этапе
              доставки, начиная от момента отправки до момента получения товара.
            </textarea>
            <Close onClick={() => resetField('desc')} />
          </div>
        </div>
      </div>
      <div className={s.body}>
        <p className={s.title}>Документы</p>
        <div className={s.list}>
          <div className={s.list__el}>
            <Image
              src={'/PCabinet/file.svg'}
              width={10}
              height={14}
              alt='file'
            />
            <p>Лицензия на услуги почтовой связи</p>
          </div>
          <div className={s.list__el}>
            <Image
              src={'/PCabinet/file.svg'}
              width={10}
              height={14}
              alt='file'
            />
            <p>Продление срока действия почтовой лицензии</p>
          </div>
          <div className={s.list__el}>
            <Image
              src={'/PCabinet/file.svg'}
              width={10}
              height={14}
              alt='file'
            />
            <p>Свидетельство о включении в реестр</p>
          </div>
          <div className={s.list__el}>
            <Close className={s.list__add} />
            <p>Добавить файл</p>
          </div>
        </div>
        <button>
          <p>Сохранить</p>
          <Image
            src='PCabinet/profile/save.svg'
            width={16}
            height={16}
            alt='save'
          />
        </button>
      </div>
    </form>
  )
}

export default Edit
