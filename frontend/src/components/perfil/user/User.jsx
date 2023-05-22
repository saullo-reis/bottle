import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './UserStyle.sass'

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
        <aside className="perfil-user" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '20px'}}>
            <h1 className="perfil-user-name" >{user?.name}</h1>
            <img className="perfil-user-image" src={user?.photo}></img>
        </aside>
        
    )
}