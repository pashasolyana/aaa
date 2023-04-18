import { Header } from '../Components/Header/Header'
import { FirstScreen } from '../Components/FirstScreen/FirstScreen'
import { MapScreen } from '../Components/MapScreen/MapScreen'
import Footer from '../Components/Footer/Footer'
import { ChangeEvent, useState } from 'react'
import getStatusGET from '../Components/FirstScreen/getStatusGET'
import {Form} from '../Components/Form/Form'
import Loader from '@/Components/Loader/Loader'

export default function Home() {
  const [path, setPath] = useState(0)
  const [number, setNumber] = useState('')
  const [some, setSome] = useState()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 18) {
      setNumber(e.target.value)
    } else {
      setNumber(e.target.value.slice(0, 18))
    }
  }

  const vvv = () => {
    getStatusGET(number).then((data) => {
      setSome(data)
    })
  }

  console.log(path)
  return (
    <div>
      <Header setPath={setPath}/>
      <FirstScreen vvv={vvv} handleChange={handleChange} number={number} setPath={setPath}/>
      <div id='form'></div>
      <Form vvv={vvv} handleChange={handleChange} some={some} number={number} path={path} setPath={setPath}/>
      <MapScreen />
      <Footer />
    </div>
  )
}
