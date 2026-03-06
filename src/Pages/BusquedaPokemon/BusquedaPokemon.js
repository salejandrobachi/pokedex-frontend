import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageLayout from '../../Components/PageLayout/PageLayout'
import PokemonSingleView from './Components/PokemonSingleView'
import PokemonMultiView from './Components/PokemonMultiView'

function buildUrl(nombre, tipoBusqueda) {
  const base = `${process.env.REACT_APP_API_URL}/api/pokemon`
  switch (tipoBusqueda) {
    case '1': return `${base}/number/${nombre}`
    case '2': return `${base}/name/${nombre}`
    case '3': return `${base}/type?type1=${nombre[0]}${nombre[1] ? `&type2=${nombre[1]}` : ''}`
    case '4': {
      const params = nombre.filter(Boolean).map((n, i) => `week${i + 1}=${n}`).join('&')
      return `${base}/week?${params}`
    }
    case '5': return `${base}/region/${nombre}`
    default: return null
  }
}

function BusquedaPokemon() {
  const [criterio, setCriterio] = useState(null)
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const nombreDesdeUrl = searchParams.get('pokemon')
    const criterioDesdeUrl = searchParams.get('criterio')
    const criterioBusqueda = decodeURIComponent(criterioDesdeUrl)
    const nombreBusqueda = decodeURIComponent(nombreDesdeUrl)

    setData(null)
    setLoading(true)
    setCriterio(criterioBusqueda)

    const nombreArray = nombreBusqueda.includes(',')
      ? nombreBusqueda.split(',')
      : [nombreBusqueda]

    const url = buildUrl(nombreArray, criterioBusqueda)
    if (url) {
      fetch(url)
        .then(r => r.json())
        .then(d => { setData(d); setLoading(false) })
        .catch(() => { setData([]); setLoading(false) })
    } else {
      setData([])
      setLoading(false)
    }
  }, [searchParams])

  return (
    <PageLayout title='Búsqueda Pokémon'>
      {criterio === '1' || criterio === '2' ? (
        <PokemonSingleView data={data} loading={loading} />
      ) : criterio === '3' || criterio === '4' || criterio === '5' ? (
        <PokemonMultiView data={data} loading={loading} />
      ) : null}
    </PageLayout>
  )
}

export default BusquedaPokemon
