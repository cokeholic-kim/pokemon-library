import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Nav = () => {
    const [show,setShow] = useState(false)
    const [searchValue,setSearchValue] = useState("")
    const navigate = useNavigate();
    const ref = useRef();


    useEffect(() => {
        window.addEventListener("scroll",() => {
            if(window.scrollY > 50){
                setShow(true)
            }else{
                setShow(false)
            }
        })
        return () => {
            window.removeEventListener("scroll",()=>{});
        };
    },[])

    const handleChange = (e) => {
        setSearchValue(e.target.value)
        
    }

    const hadleClick = ()=> {
        const inputValue = ref.current.value;
        navigate(`/search?q=${inputValue}`)
    }
  return (
    <Navigation className={`nav ${show && 'nav_black'}`}>
        <NavLogo src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHhRGU_qkq_2_T4zxci4-2xLnUr1xli3zXZwKx5Ar6Jw&s' alt='pokemon-logo' className='nav_logo' onClick={()=> navigate('/')}/>
        <NavInputCover>
        <input
  value={searchValue}
  onChange={handleChange}
  className='nav__input'
  type="text"
  placeholder='포켓몬의 이름'
  ref={ref}
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
        hadleClick();
    }
  }}
/>
            <button onClick={hadleClick}>검색</button>
        </NavInputCover>
        
        <NavAvatar 
            alt='User logged'
            src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg'
            className='nav_avatar'
        />
    </Navigation>
  )
}

const Navigation = styled.nav`
position: relative;
top: 0;
width: 100%;
height: 30px;
z-index: 1;
padding: 20px;
display: flex;
justify-content: space-between;
align-items: flex-start;
transition-timing-function: ease-in;
transition: all 0.5s;
background-color: ${({ show }) => (show ? 'black' : 'transparent')};
`;

const NavLogo = styled.img`
    position: fixed;
    left: 40px;
    height:40px;
    width: 40px;
    object-fit: contain;
    cursor: pointer;
`

const NavAvatar = styled.img`
    position: fixed;
    right: 40px;
    width: 40px;
    object-fit: contain;
    cursor:pointer;
`

const NavInputCover = styled.div`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width:30%;
    input{
        position: relative;
        background-color: rgba(0,0,0,0.582);
        border-radius:5px ;
        color:white;
        padding: 5px;
        padding-right: 0;
        border: none;
        width: 100%;
    }

    button{
        position: absolute;
    top: 50%;
    right: -3px;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.582);
    border: none;
    color: white;
    padding: 5px;
    border-radius: 5px;
    margin-left: 5px;
    }
`



export default Nav
