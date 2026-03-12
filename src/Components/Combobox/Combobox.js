import React, { useState } from 'react'
import { Select, Spin } from 'antd'

function Combobox({ endpoint, labelKey, value, onChange, placeholder, style, mode, maxCount }) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)

  const handleDropdownVisibleChange = async open => {
    if (open && !fetched) {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/${endpoint}`)
        const data = await res.json()
        setOptions(Array.isArray(data) ? data : [])
        setFetched(true)
      } catch (e) {
        console.error('Combobox fetch error:', e)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Select
      showSearch
      loading={loading}
      value={value || undefined}
      placeholder={placeholder}
      style={style}
      mode={mode}
      maxCount={maxCount}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onChange={onChange}
      notFoundContent={loading ? <Spin size='small' style={{ display: 'flex', justifyContent: 'center', padding: '8px' }} /> : null}
      options={options.map(item => ({ value: item[labelKey], label: item[labelKey] }))}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
  )
}

export default Combobox
