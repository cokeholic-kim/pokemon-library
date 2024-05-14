import React, { useEffect, useState } from 'react'
import instance from '../../Apis/axios'
import request from '../../Apis/request'
import PokemonCard from './PokemonCard'
import styled from 'styled-components'

const MainBody = () => {
    const [data,setData] = useState([])

    useEffect(()=>{
        fetchPokemonList();
    },[])

    const fetchPokemonList = async () => {
        const result = await instance.get(request.fetchPokemonList,{
            params:{
                offset:data.length,
                limit:20
            }
        })
        if (data.length === 0) {
            // 처음 데이터가 없을 때
            setData(result.data.results);
          } else {
            // 데이터가 이미 존재할 때
            setData([...data, ...result.data.results]);
          }
    }

    const handleClick = async ()=>{
        console.log("handleClick")
        fetchPokemonList();
    };

  return (
    <div>
        <DataBody>
        {data.map((pokemon,id) => (
            <PokemonCard key={id} pokemon={pokemon} />
        ))}
        </DataBody>
        <AddButton onClick={handleClick}>더보기</AddButton>
    </div>
    
  )
}

const DataBody = styled.div`
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
`

const AddButton = styled.button`
    width:100%;
    height: 50px;
    cursor:pointer;
`

export default MainBody


