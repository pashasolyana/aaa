import React, { useEffect, useState } from 'react'

const BitrixForm = () => {
  const [isComponentMounted, setIsComponentMounted] = useState(false)

  useEffect(() => {
    setIsComponentMounted(true)
  }, [])

  useEffect(() => {
    if (isComponentMounted) {
      const loadBitrixForm = () => {
        const script = document.createElement('script')
        script.src =
          'https://cdn-ru.bitrix24.ru/b15858752/crm/form/loader_18.js'
        script.async = true
        script.setAttribute('data-b24-form', 'inline/18/qlwadx')
        script.setAttribute('data-skip-moving', 'true')
        const head = document.getElementById('bitrix-form-container')
        head?.appendChild(script)
      }

      loadBitrixForm()
    }
  }, [isComponentMounted])

  return <div id='bitrix-form-container'></div>
}

export default BitrixForm
