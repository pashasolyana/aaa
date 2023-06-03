import React from 'react'
import s from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EditIcon from '../../../../public/PCabinet/header/editIcon'
import ProfileIcon from '../../../../public/PCabinet/header/profileIcon'
import StatIcon from '../../../../public/PCabinet/header/statIcon'
import clsx from 'clsx'

const Header = () => {
  const router = useRouter()

  return (
    <div className={s.cont}>
      <div className={s.wrap}>
        <Image
          src='/logo.svg'
          alt='Logo'
          width={213}
          height={68}
          priority
          className={s.logo}
          onClick={() => router.replace('/')}
        />
        <div className={s.nav}>
          <Link
            href={'stat'}
            className={clsx(s.nav__el, {
              [s.nav__el_mod]: router.pathname == '/stat'
            })}
          >
            <p>Статистика</p>
            <StatIcon style={{ width: 14, height: 12 }} />
          </Link>
          <Link
            href={'edit'}
            className={clsx(s.nav__el, {
              [s.nav__el_mod]: router.pathname == '/edit'
            })}
          >
            <p>Редактирование</p>
            <EditIcon
              src={'/PCabinet/header/edit.svg'}
              style={{ width: 14, height: 14 }}
            />
          </Link>
          <Link
            href={'profile'}
            className={clsx(s.nav__el, {
              [s.nav__el_mod]: router.pathname == '/profile'
            })}
          >
            <p> Профиль</p>
            <ProfileIcon style={{ width: 11, height: 15 }} />
          </Link>
        </div>
      </div>
      <Link href={'/'} className={s.back}>
        <p>К сайту</p>
        <Image
          src='/PCabinet/header/back.svg'
          width={22}
          height={22}
          alt='back'
        />
      </Link>
    </div>
  )
}

export default Header
