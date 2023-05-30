import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

export const PerfilUser = () => {
    const { name } = useParams()
    const [user, setUser ] = useState()

    console.log(name)
    useEffect(() => {
        async function fetchData(){
            const response = await axios.get('http://localhost:3333/getUser',{
                params:{
                    name: name
                }
            }) 
            setUser(response.data)
        }
        fetchData()
    },[name])

    return(
        <PerfilUserStyle style={{display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '20px'}}>
            <img src={user?.photo}></img>
            <div className='container'>
                <p>{name}</p>
                <button>Editar perfil</button>
            </div>
        </PerfilUserStyle>
        
    )
}

const PerfilUserStyle = styled.aside`
    display: flex;
    margin: 20px;
    padding: 100px 15px 0;
    img{
        width: 150px;
        border-radius: 50%;
    }
    .container{
        margin: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        width: 100%;
        p{
            font-weight: 700;
            color: #fff
        }
        button{
            border: none;
            background-color: #121212;
            color: #fff;
            padding: 8px;
            border-radius: 32px;
            font-size: 10px;
            cursor: pointer;
            transition: .3s;
            &:hover{
                background-color: #2222EE;
            }
        }
    }

`