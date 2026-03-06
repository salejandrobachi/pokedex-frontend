import React from 'react'
import { Image, Row, Space } from 'antd'

export default function TypeRow({ Nombre, Link }) {
  return (
    <Row justify='center' style={{ color: '#ccc', fontSize: '1.2em' }}>
      <Space size='middle'>
        <strong>{Nombre}:</strong>
        <Image width={30} src={Link} preview={false} />
      </Space>
    </Row>
  )
}
