import { Link } from 'react-scroll'
import styles from './Header.module.scss'
import Image from 'next/image'

export const Header = ({ setPath }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.burger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Image
        src='/logo.svg'
        alt='Logo'
        width={327}
        height={98}
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
          to='form'
          spy={true}
          smooth={true}
          offset={50}
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
          offset={50}
          duration={500}
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
        >
          Задать вопрос
        </Link>
      </div>
      <div className={styles.info}>
        <p>Пишите нам</p>
        <Image src={'/vk.svg'} alt='vk' width={40} height={40} className={styles.info__img}/>
        <Image src={'/telegram.svg'} alt='telegram' width={40} height={40} className={styles.info__img}/>
        <Image src={'/whatsApp.svg'} alt='whatsApp' width={40} height={40} className={styles.info__img}/>
        <button>
          <p>Войти</p>
          <Image src={'/people.svg'} alt='vk' width={15} height={20} />
        </button>
      </div>
    </div>
  )
}
