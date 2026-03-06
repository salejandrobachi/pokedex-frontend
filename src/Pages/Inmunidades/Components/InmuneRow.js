import React from 'react'
import { Image, Space, Row } from 'antd'

export default function InmuneRow({ tipo, linkimage, inmuimage1, inmuimage2 }) {
  return (
    <Row justify='center' style={{ color: '#ccc', fontSize: '1.2em' }}>
      <Space size='middle'>
        <Space>
          <strong>{tipo}</strong>
          <Image width={30} src={linkimage} preview={false} />
          <strong>es Inmune a:</strong>
        </Space>
        {inmuimage1 ? <Image width={30} src={inmuimage1} preview={false} /> : 'No Hay, No Existe'}
        {inmuimage2 ? <Image width={30} src={inmuimage2} preview={false} /> : null}
      </Space>
    </Row>
  )
}
