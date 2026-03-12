import React from 'react'
import { Button, Input, Flex, Radio } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Combobox from '../../../Components/Combobox/Combobox'

const criterioPlaceholders = {
  1: 'Número del Pokédex Nacional',
  2: 'Nombre del Pokémon',
  3: 'Tipo de Pokémon',
  4: 'Debilidad del Pokémon',
  5: 'Región del Pokémon',
}

const comboboxConfig = {
  3: { endpoint: 'tipos', labelKey: 'nombre', mode: 'multiple', maxCount: 2 },
  4: { endpoint: 'debilidades', labelKey: 'tipo_nombre', mode: 'multiple', maxCount: 5 },
  5: { endpoint: 'regions', labelKey: 'nombre' },
}

function SearchSection({ searchValue, onSearchChange, onSearch, onRandom, criterio, onCriterioChange }) {
  return (
    <div
      className='search-card'
      style={{
        background: 'rgba(20,20,24,0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,188,212,0.25)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ paddingTop: '24px', paddingBottom: '12px', marginBottom: '8px' }}>
        <Flex gap={8} wrap='wrap' align='center' justify='center'>
          <Radio.Group
            buttonStyle='solid'
            value={criterio}
            onChange={e => onCriterioChange(e.target.value)}
          >
            <Radio.Button value={1}>Numero de Pokédex</Radio.Button>
            <Radio.Button value={2}>Nombre</Radio.Button>
            <Radio.Button value={5}>Región</Radio.Button>
            <Radio.Button value={3}>Tipo</Radio.Button>
            <Radio.Button value={4}>Debilidad</Radio.Button>
          </Radio.Group>
        </Flex>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '0 24px 16px' }}>
        {comboboxConfig[criterio] ? (
          <Combobox
            key={comboboxConfig[criterio].endpoint}
            endpoint={comboboxConfig[criterio].endpoint}
            labelKey={comboboxConfig[criterio].labelKey}
            value={searchValue}
            onChange={onSearchChange}
            placeholder={criterioPlaceholders[criterio]}
            style={{ width: 400, fontSize: '1.2em' }}
            mode={comboboxConfig[criterio].mode}
            maxCount={comboboxConfig[criterio].maxCount}
          />
        ) : (
          <Input
            variant='filled'
            placeholder={criterioPlaceholders[criterio] || criterioPlaceholders[1]}
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            style={{ width: 400, fontSize: '1.2em' }}
          />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <Button
          icon={<SearchOutlined />}
          onClick={() => onSearch(searchValue)}
          style={{ backgroundColor: '#1dd168', borderColor: '#1dd168' }}
          className='search-button'
          disabled={!searchValue || (Array.isArray(searchValue) && searchValue.length === 0)}
        >
          Buscar
        </Button>
        <Button
          style={{ marginLeft: '8px', backgroundColor: '#ff8503', borderColor: '#ff8503' }}
          onClick={onRandom}
          className='aleatorio-button'
        >
          Aleatorio
        </Button>
      </div>
    </div>
  )
}

export default SearchSection
