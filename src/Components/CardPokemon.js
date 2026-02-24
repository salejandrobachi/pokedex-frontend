import React from 'react';
import { Card, Image, Typography } from 'antd';
const { Meta } = Card;

export default function PokemonData({numero, nombre}) {
    const imageUrl = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${numero}.png`;
    const description = `numero en la pokédex: ${numero}`

    const handleCardClick = () => {
        window.location.href = `/busqueda?pokemon=${encodeURIComponent(numero)}&criterio=${encodeURIComponent(1)}`;
      };

    return(
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<Image alt="example" src={imageUrl} />}
        >
          <Meta title = {<Typography onClick={ () => handleCardClick() }>{nombre}</Typography>}
           description={<Typography onClick={ () => handleCardClick() }>{description}</Typography>} />
        </Card>
    )
}