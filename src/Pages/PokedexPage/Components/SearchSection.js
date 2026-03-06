import React, { useState } from 'react'
import { Button, Input, Collapse, Flex, Radio } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Panel } = Collapse

const criterioPlaceholders = {
  1: 'Número del Pokédex Nacional',
  2: 'Nombre del Pokémon',
  3: 'Tipo de Pokémon (ej: Agua, Fuego)',
  4: 'Debilidad del Pokémon (ej: Eléctrico, Planta)',
  5: 'Región del Pokémon',
}

function SearchSection({ searchValue, onSearchChange, onSearch, onRandom, criterio, onCriterioChange }) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div
        className='search-card'
        style={{
          background: 'rgba(20,20,24,0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,188,212,0.25)',
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '24px' }}>
          <Input
            variant='filled'
            placeholder={criterioPlaceholders[criterio] || criterioPlaceholders[1]}
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            style={{ width: 400, fontSize: '1.2em', padding: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
          <Button
            icon={<SearchOutlined />}
            onClick={() => onSearch(searchValue)}
            style={{ backgroundColor: '#1dd168', borderColor: '#1dd168' }}
            className='search-button'
            disabled={!searchValue}
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
        <p style={{ color: '#ccc', marginTop: '0', fontSize: '0.9em', textAlign: 'center', marginBottom: '16px', padding: '0 24px' }}>
          ¡Usa la búsqueda avanzada para encontrar Pokémon por su Nombre, Región, Tipo o Debilidad!
        </p>
      </div>

      <div
        style={{
          borderRadius: '0 0 8px 8px',
          border: '1px solid rgba(0,188,212,0.25)',
          borderTop: 'none',
          overflow: 'hidden',
        }}
      >
        <Collapse
          activeKey={visible ? ['advanced'] : []}
          style={{ width: '100%', border: 'none' }}
        >
          <Panel
            header={
              <div
                onClick={() => setVisible(v => !v)}
                style={{ textAlign: 'center', color: '#ccc', cursor: 'pointer' }}
              >
                {visible ? 'Ocultar búsqueda avanzada' : 'Mostrar búsqueda avanzada'}
              </div>
            }
            key='advanced'
            style={{ border: 'none', background: 'rgba(20,20,24,0.9)', backdropFilter: 'blur(10px)' }}
          >
            <div style={{ justifyContent: 'center' }}>
              <p style={{ textAlign: 'center', color: 'white' }}>Busca Pokémon por:</p>
              <Flex gap={8} wrap='wrap' align='center' justify='center'>
                <Radio.Group
                  buttonStyle='solid'
                  value={criterio}
                  onChange={e => onCriterioChange(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <Radio.Button value={1}>Numero de Pokédex</Radio.Button>
                  <Radio.Button value={2}>Nombre</Radio.Button>
                  <Radio.Button value={5}>Región</Radio.Button>
                  <Radio.Button value={3}>Tipo</Radio.Button>
                  <Radio.Button value={4}>Debilidad</Radio.Button>
                </Radio.Group>
              </Flex>
            </div>
          </Panel>
        </Collapse>
      </div>
    </>
  )
}

export default SearchSection
