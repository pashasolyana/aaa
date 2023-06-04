import React, { useState } from 'react'
import s from './Profile.module.scss'
import Image from 'next/image'
import CloseIco from '../../../public/PCabinet/closeIco'
import { useForm } from 'react-hook-form'

const Profile = () => {
  const [isHidden, setIsHidden] = useState(true)

  const { register, handleSubmit, resetField } = useForm<{
    login: string
    password: string
  }>()

  const submit = (data: { login: string; password: string }) => {
    console.log(data)
  }

  return (
    <div className={s.cont}>
      <form onSubmit={handleSubmit(submit)} className={s.wrap}>
        <div className={s.line}>
          <p>Логин</p>
          <div className={s.inpEl}>
            <input type='text' {...register('login', { required: true })} />
            <CloseIco onClick={() => resetField('login')} />
          </div>
        </div>
        <div className={s.line}>
          <p>Пароль</p>
          <div className={s.inpEl}>
            <input
              type={isHidden ? 'password' : 'text'}
              {...register('password', { required: true })}
            />
            {isHidden ? (
              <Image
                src={'/closeEye.svg'}
                width={13}
                height={14}
                alt='clear'
                onClick={() => setIsHidden(false)}
              />
            ) : (
              <Image
                src={'/openEye.svg'}
                width={13}
                height={14}
                alt='clear'
                onClick={() => setIsHidden(true)}
              />
            )}
          </div>
        </div>
        <div className={s.footer}>
          <button type='button'>
            <p>Выйти</p>
          </button>
          <button type='submit'>
            <p>Сохранить</p>
            <Image
              src={'/PCabinet/profile/save.svg'}
              width={16}
              height={16}
              alt='save'
            />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile
