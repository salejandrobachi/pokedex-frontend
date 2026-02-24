import React from 'react';
import { Card, Image, Typography } from 'antd';
const { Meta } = Card;

export default function RegionData({ Nombre, Link }) {

    const handleCardClick = () => {
        window.location.href = `/regiones/nombre?nombre=${encodeURIComponent(Nombre)}`;
    };

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={
                <div style={{ width: '240px', height: '160px', overflow: 'hidden' }}>
                    <Image
                        alt={Nombre}
                        src={Link}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                </div>
            }
        >
            <Meta title={<Typography onClick={() => handleCardClick()}>{Nombre}</Typography>} />
        </Card>
    )
}