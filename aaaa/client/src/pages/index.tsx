import { Header } from '../Components/Header/Header'
import { FirstScreen } from '../Components/FirstScreen/FirstScreen'
import { Delivery } from '../Components/Delivery/Delivery'
import Footer from '../Components/Footer/Footer'
import { ChangeEvent, useState } from 'react'
import getStatusGET from '../Components/FirstScreen/getStatusGET'
import { Form } from '../Components/Form/Form'
import Loader from '@/Components/Loader/Loader'
import getAllCities from '@/Components/FirstScreen/getAllCities'
import Documents from '@/Components/Documents/Documents'
import BitrixForm from '@/Components/BitrixForm/BitrixForm'
import Mapa from '@/Components/Mapa/Mapa'

export default function Home() {
  const [path, setPath] = useState(0)
  const [number, setNumber] = useState('')
  const [some, setSome] = useState()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 18) {
      setNumber(e.target.value.replace(/[\W_]/g, ''))
    } else {
      setNumber(e.target.value.slice(0, 18).replace(/[\W_]/g, ''))
    }
  }

  const vvv = () => {
    getStatusGET(number).then((data) => {
      setSome(data)
    })
  }

  const { data } = getAllCities()

  const allCities = data?.pages?.at(0)

  return (
    <>
      <Header setPath={setPath} />
      <FirstScreen
        vvv={vvv}
        some={some}
        handleChange={handleChange}
        number={number}
        setPath={setPath}
      />
      <div className='absolute' id='track'></div>
      <Form
        allCities={allCities}
        vvv={vvv}
        handleChange={handleChange}
        some={some}
        number={number}
        path={path}
        setPath={setPath}
      />
      <Delivery />
      <Documents />
      <Mapa/>
      <div id='faq'></div>
      <BitrixForm />
      <Footer />
    </>
  )
}
