import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';
import instance from '../../Apis/axios';
import styled from 'styled-components';
import  pokemonTypeColours   from '../../Apis/pokemonColors';

const SearchPage = () => {

    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonDetailData, setPokemonDetailData] = useState(null)
    const [loading, setLoading] = useState(true);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    const debounceSearchTerm = useDebounce(useQuery().get('q'),500);

    useEffect(()=>{
        const fetchPokemonDetail = async () => {
            try {
              const request = await instance.get(`pokemon/${debounceSearchTerm}`);
              const requestDetail = await instance.get(`/pokemon-species/${debounceSearchTerm}`);
              setPokemonData(request.data);
              setPokemonDetailData(requestDetail.data);
              setLoading(false);
              console.log(request.data,requestDetail.data);
            } catch (error) {
              console.error(error);
              setLoading(false);
            }
          };
        
        if(debounceSearchTerm){
            fetchPokemonDetail()

            console.log(pokemonData)
            console.log(pokemonDetailData)
        }
        
      },[debounceSearchTerm])

      

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!pokemonData) {
        return <div>No data available</div>;
      }

      const getTypeColor = (type) =>{
    
        const color = pokemonTypeColours(type);;
        return color;
      }
  return (
    <div>
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
    </div>
  )
}

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


export default SearchPage
