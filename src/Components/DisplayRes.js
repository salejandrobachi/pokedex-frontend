import React from 'react';
import { Image, Space, Row } from 'antd';

export default function ResData({ tipo, linkimage,
    resimage1,
    resimage2,
    resimage3,
    resimage4,
    resimage5,
    resimage6,
    resimage7 }) {
    return (
        <Row justify={"center"}
            style={{
                color: '#ccc',
                fontSize: '1.2em',
            }}>
            <Space size={"middle"}>
                <Space><strong>{tipo}</strong><Image width={30} src={linkimage} preview={false}/><strong>{"es Resistente a:"}</strong></Space>
                {resimage1 ? <Image width={30} src={resimage1} preview={false} /> : "No Hay, No Existe"}
                {resimage2 ? <Image width={30} src={resimage2} preview={false} /> : null}
                {resimage3 ? <Image width={30} src={resimage3} preview={false} /> : null}
                {resimage4 ? <Image width={30} src={resimage4} preview={false} /> : null}
                {resimage5 ? <Image width={30} src={resimage5} preview={false} /> : null}
                {resimage6 ? <Image width={30} src={resimage6} preview={false} /> : null}
                {resimage7 ? <Image width={30} src={resimage7} preview={false} /> : null}
            </Space>
        </Row>
    );
}