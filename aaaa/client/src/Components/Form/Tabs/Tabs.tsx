import React, { FC } from 'react'
import styles from './Tabs.module.scss'
import clsx from 'clsx'

interface TabsProps {
  path: number
  setPath: (data: number) => void
}

const Tabs: FC<TabsProps> = ({ path, setPath }) => {
  return (
    <div className={styles.cont}>
      <div
        className={clsx(styles.tab, { [styles.active]: path === 0 })}
        onClick={() => setPath(0)}
      >
        Калькулятор
      </div>
      <div
        className={clsx(styles.tab, { [styles.active]: path === 1 })}
        onClick={() => setPath(1)}
      >
        Отслеживание
      </div>
    </div>
  )
}

export default Tabs
