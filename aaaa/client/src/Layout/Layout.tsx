import React, { PropsWithChildren } from 'react'
import styles from './Layout.module.scss'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.cont}>{children}</div>
}

export default Layout
