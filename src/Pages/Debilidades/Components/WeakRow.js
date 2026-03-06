import React from 'react'
import { Image, Space, Row } from 'antd'

export default function WeakRow({ tipo, linkimage, weakimage1, weakimage2, weakimage3, weakimage4, weakimage5 }) {
  return (
    <Row justify='center' style={{ color: '#ccc', fontSize: '1.2em' }}>
      <Space size='middle'>
        <Space>
          <strong>{tipo}</strong>
          <Image width={30} src={linkimage} preview={false} />
          <strong>es Debil a:</strong>
        </Space>
        {weakimage1 ? <Image width={30} src={weakimage1} preview={false} /> : 'No Hay, No Existe'}
        {weakimage2 ? <Image width={30} src={weakimage2} preview={false} /> : null}
        {weakimage3 ? <Image width={30} src={weakimage3} preview={false} /> : null}
        {weakimage4 ? <Image width={30} src={weakimage4} preview={false} /> : null}
        {weakimage5 ? <Image width={30} src={weakimage5} preview={false} /> : null}
      </Space>
    </Row>
  )
}
