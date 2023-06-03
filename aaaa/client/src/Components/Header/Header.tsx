import { Link } from 'react-scroll'
import styles from './Header.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import clsx from 'clsx'

export const Header = ({ setPath }: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isModalAuth, setIsModalAuth] = useState(false)
  const [closeEye, setCloseEye] = useState(false)

  const nav = (num: number) => {
    setIsOpenModal(false)
    setPath(num)
  }

  const toggleAuthModal = (isOpen: boolean) => {
    setIsModalAuth(isOpen)
    setCloseEye(true)
    document.getElementsByTagName('html')[0].style.overflow = isOpen
      ? 'hidden'
      : 'block'
  }

  return (
    <div className={styles.container}>
      <div className={styles.burger} onClick={() => setIsOpenModal(true)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Image
        src='/logo.svg'
        alt='Logo'
        width={213}
        height={68}
        priority
        className={styles.logo}
        onClick={() => location.reload()}
      />
      <div className={styles.link}>
        <Link
          activeClass='active'
          to='form'
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          onClick={() => setPath(0)}
        >
          Калькулятор
        </Link>
        <Link
          activeClass='active'
          to='form'
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          onClick={() => setPath(1)}
        >
          Отслеживание
        </Link>
        <Link
          activeClass='active'
          to='company'
          spy={true}
          smooth={true}
          offset={-300}
          duration={500}
          onClick={() => setPath(1)}
        >
          О компании
        </Link>
        <Link
          activeClass='active'
          to='documents'
          spy={true}
          smooth={true}
          offset={-300}
          duration={500}
        >
          Документы
        </Link>
        <Link
          activeClass='active'
          to='faq'
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          Задать вопрос
        </Link>
      </div>
      <div className={styles.info}>
        <p>Пишите нам</p>
        <Image
          src={'/vk.svg'}
          alt='vk'
          width={40}
          height={40}
          className={styles.info__img}
        />
        <Image
          src={'/telegram.svg'}
          alt='telegram'
          width={40}
          height={40}
          className={styles.info__img}
        />
        <Image
          src={'/whatsApp.svg'}
          alt='whatsApp'
          width={40}
          height={40}
          className={styles.info__img}
        />
        <button onClick={() => toggleAuthModal(true)}>
          <p>Войти</p>
          <Image src={'/people.svg'} alt='vk' width={15} height={20} />
        </button>
      </div>
      <div
        className={clsx(styles.modalCont, {
          [styles.modalCont_mod]: !isOpenModal
        })}
        onClick={() => setIsOpenModal(false)}
      >
        <div
          className={clsx(styles.modal, { [styles.modal_mod]: !isOpenModal })}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={'/close.svg'}
            width={20}
            height={20}
            alt='close'
            className={styles.close}
            onClick={() => setIsOpenModal(false)}
          />
          <Link
            activeClass='active'
            to='form'
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            onClick={() => nav(0)}
          >
            Калькулятор
          </Link>
          <Link
            activeClass='active'
            to='form'
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            onClick={() => nav(1)}
          >
            Отслеживание
          </Link>
          <Link
            activeClass='active'
            to='company'
            spy={true}
            smooth={true}
            offset={-300}
            duration={500}
            onClick={() => nav(1)}
          >
            О компании
          </Link>
          <Link
            activeClass='active'
            to='documents'
            spy={true}
            smooth={true}
            offset={-300}
            duration={500}
            onClick={() => nav(0)}
          >
            Документы
          </Link>
          <Link
            activeClass='active'
            to='documents'
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            onClick={() => nav(0)}
          >
            Задать вопрос
          </Link>
        </div>
      </div>
      {isModalAuth ? (
        <div
          className={styles.authModal}
          onClick={() => toggleAuthModal(false)}
        >
          <div
            className={styles.authModal__wrap}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.authModal__header}>
              <h1>Авторизация</h1>
              <p>Вход только для сотрудников</p>
            </div>
            <div className={styles.authModal__body}>
              <div className={styles.authModal__inpEl}>
                <p>Логин</p>
                <input type='text' />
              </div>
              <div className={styles.authModal__inpEl}>
                <p>Пароль</p>
                <input type={closeEye ? 'password' : 'text'} />
                {closeEye ? (
                  <Image
                    src={'/closeEye.svg'}
                    width={13}
                    height={13}
                    alt='hidden'
                    onClick={() => setCloseEye(false)}
                  />
                ) : (
                  <Image
                    src={'/openEye.svg'}
                    width={13}
                    height={13}
                    alt='view'
                    onClick={() => setCloseEye(true)}
                  />
                )}
              </div>
            </div>
            <div className={styles.authModal__footer}>
              <button>Войти</button>
              <button onClick={() => toggleAuthModal(false)}>Отмена</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
