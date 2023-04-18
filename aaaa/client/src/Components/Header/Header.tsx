import { Link } from 'react-scroll'
import styles from './Header.module.scss'
import Image from 'next/image'
import info from '../../assets/png/info.png'

//@ts-ignore

export const Header = ({ setPath }) => {
  return (
    <div className={styles.container}>
      <div className={styles.topHeader}>
        <Image
          src='/logo.svg'
          alt='Logo'
          width={327}
          height={98}
          priority
          className={styles.logo}
          onClick={() => location.reload()}
        />
        <Image
          src={info.src}
          width={287}
          height={82}
          alt='info'
          className={styles.info}
        />
      </div>
      <div className={styles.lowHeader}>
        <a
          href={'/'}
          onClick={() => location.reload()}
          className={styles.lowHeaderText}
        >
          Главная
        </a>
        <Link
          activeClass='active'
          to='form'
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          onClick={() => setPath(0)}
          className={styles.lowHeaderText}
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
          className={styles.lowHeaderText}
        >
          Отследить посылку
        </Link>
        <Link
          activeClass='active'
          to='documents'
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          className={styles.lowHeaderText}
        >
          Документы
        </Link>
      </div>
    </div>
  )
}
