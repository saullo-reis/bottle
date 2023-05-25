import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

export const PerfilUser = () => {
    const { name } = useParams()
    const [user, setUser ] = useState()

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
    },[])

    return(
        <PerfilUserStyle style={{display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '20px'}}>
            <h1 >{user?.name}</h1>
            <img src={user?.photo}></img>
        </PerfilUserStyle>
        
    )
}

const PerfilUserStyle = styled.aside`
    display: flex;
    margin: 20px;
    img{
        width: 200px;
        box-shadow: 4px 4px 0 black;
        border: solid 1px black;
    }

`