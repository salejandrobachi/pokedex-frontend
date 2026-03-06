import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../../Components/PageLayout/PageLayout'
import SearchSection from './Components/SearchSection'
import './PokedexPage.css'

function PokedexPage() {
  const [searchValue, setSearchValue] = useState('')
  const [criterio, setCriterio] = useState(1)
  const navigate = useNavigate()

  const funBuscar = (entrada, crit) => {
    let dato
    switch (crit) {
      case 1:
      case 2:
      case 5:
        dato = [entrada[0].toString()]
        break
      case 3:
        dato = entrada.slice(0, 2)
        break
      case 4:
        dato = entrada.slice(0, 7)
        break
      default:
        return
    }
    navigate(`/busqueda?pokemon=${encodeURIComponent(dato)}&criterio=${encodeURIComponent(crit)}`)
  }

  const handleSearch = value => {
    const terminos = value.split(',').map(e => e.trim())
    funBuscar(terminos, criterio)
  }

  const handleRandom = () => {
    const num = Math.floor(Math.random() * 1026).toString().padStart(3, '0')
    setSearchValue(num)
    funBuscar([num], 1)
  }

  const handleCriterioChange = newCriterio => {
    setCriterio(newCriterio)
    setSearchValue('')
  }

  return (
    <PageLayout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
        <img
          src='/titulo.png'
          alt='BachiDex'
          className='logo-img'
          style={{
            height: '150px',
            filter: 'drop-shadow(0 0 20px rgba(0,188,212,0.5)) drop-shadow(0 0 40px rgba(224,85,85,0.2))',
            transition: 'filter 0.3s ease',
          }}
        />
      </div>
      <SearchSection
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
        onRandom={handleRandom}
        criterio={criterio}
        onCriterioChange={handleCriterioChange}
      />
    </PageLayout>
  )
}

export default PokedexPage
