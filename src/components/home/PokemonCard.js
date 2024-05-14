import React, { useState, useEffect } from 'react';
import instance from '../../Apis/axios';
import styled from 'styled-components';
import  pokemonTypeColours   from '../../Apis/pokemonColors';

const PokemonCard = ({ pokemon }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonDetailData, setPokemonDetailData] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const request = await instance.get(`pokemon/${pokemon.name}`);
        const requestDetail = await instance.get(pokemon.url);
        setPokemonData(request.data);
        setPokemonDetailData(requestDetail.data);
        setLoading(false);
        console.log(pokemon.name,request.data,requestDetail.data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [pokemon.name]);

  if (loading) {
    return <Card>Loading...</Card>;
  }

  if (!pokemonData) {
    return <div>No data available</div>;
  }

  const getTypeColor = (type) =>{
    
    const color = pokemonTypeColours(type);;
    return color;
  }

  return (
    <Card>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <NameBlock color={getTypeColor(pokemonData.types[0].type.name)}>
        <h3>{pokemonData.name}</h3>
        <h3>{pokemonDetailData.names.find(name => name.language.name === 'ko')?.name}</h3>
        <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      </NameBlock>
      
      
      {/* 추가적인 포켓몬 정보 렌더링 */}
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #333;
  border-radius: 15px;
  width:23%;
  height:auto;
  margin-bottom:25px;
  background-color:#3112637a;
  overflow: hidden;
`

const NameBlock = styled.div`
  width:100%;
  height:60%;
  background-color: ${(props) => props.color};
  color:white;
`

export default PokemonCard;