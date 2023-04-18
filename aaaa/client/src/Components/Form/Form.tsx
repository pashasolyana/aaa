import React, { FC, useState } from 'react'
//styles
import styles from './Form.module.scss'
//components
import Tabs from './Tabs/Tabs'
import Track from './Track/Track'
import Сalculator from './Сalculator/Сalculator'
import Account from '../Form/Account/Account'
import TrackList from '../../Components/Form/TrackList/TrackList'

export interface handleFormProps {
  name?: 'account' | 'search'
  number?: string
  vvv?: () => void
  handleChange?: any
  some?: any
  path: number
  setPath: (x: number) => void
}

export const Form: FC<handleFormProps> = ({ vvv, handleChange, some, number, path, setPath }) => {
  const [isAccount, setIsAccount] = useState(true)
  const [isSearch, setIsSearch] = useState(false)
  const [rap, setRap] = useState()
  const [goo, setGoo] = useState({height: 0, length: 0, width: 0, weight: 0})
  const [cities, setCities] = useState('')
  const [cities2, setCities2] = useState('')

  console.log(cities)

  const handleForm = ({ name, number }: handleFormProps) => {
    if (name === 'account') {
      setIsSearch(false)
      setIsAccount(true)
    } else {
      setIsAccount(false)
      setIsSearch(true)
      if (number) {
        console.log(number)
      }
    }
  }

  const getSubContent = () => {
    if (isAccount && path === 0 && rap) {
        console.log(goo)
      return <Account rap={rap} goo={goo} cities={cities} cities2={cities2}/>
    } else if (isSearch && path === 1) {
      return <TrackList some={some} />
    }
  }

  return (
    <div className={styles.cont}>
      <Tabs setPath={setPath} path={path} />
      {path === 0 ? (
        <Сalculator handleForm={handleForm} isAccount={isAccount} setRap={setRap} goo={goo} setGoo={setGoo} setCities={setCities} setCities2={setCities2}/>
      ) : (
        <Track vvv={vvv} handleChange={handleChange} isSearch={isSearch} some={some} number={number} setPath={setPath}/>
      )}
      {getSubContent()}
    </div>
  )
}
