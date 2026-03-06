import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageLayout from '../../../Components/PageLayout/PageLayout'
import RegionDetail from './Components/RegionDetail'

function BusquedaRegiones() {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const nombreDesdeUrl = searchParams.get('nombre')
    const nombreBusqueda = decodeURIComponent(nombreDesdeUrl)

    setData(null)
    setLoading(true)

    const url = `${process.env.REACT_APP_API_URL}/api/regions/name?name=${nombreBusqueda}`
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setData([]); setLoading(false) })
  }, [searchParams])

  return (
    <PageLayout title='Búsqueda de Regiones'>
      <RegionDetail data={data} loading={loading} />
    </PageLayout>
  )
}

export default BusquedaRegiones
