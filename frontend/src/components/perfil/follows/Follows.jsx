import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { styled } from 'styled-components'

export const PerfilFriends = () => {
    const [followers, setFollowers] = useState([])
    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        const fetchData =  async () => {
            try{
                const arrayFollowers = await axios.get('http://localhost:3333/getFollowers/' + id)
                setFollowers(JSON.parse(arrayFollowers.data))
            }catch(err){
                console.error(err)
            }
            
        }
        fetchData()
    },[])

    return(
        <PerfilFriendsStyle>
            <h1>Amigos</h1>
            <ul className="perfil-friends-container">
                {
                    followers.map((element) => {
                        return(
                            <li key={element.id}>
                                <Link to={`/perfil/${element.name}/${element.id}`}>
                                    <img src={element.photo}></img>
                                </Link>
                            </li>
                        )
                        
                    })
                }
            </ul>
        </PerfilFriendsStyle>
    )
}

const PerfilFriendsStyle = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 30px;
    h1{
        background-color: #22e;
        width: 100%;
        padding: 10px 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        text-align: center;
        box-shadow: 4px 4px 0 black;
        border: solid 1px black;
        max-width: 300px;
    }
    ul{
        display: flex;
        flex-flow: row wrap;
        background-color:#121212;
        width: 100%;
        align-items: center;
        box-shadow: 4px 4px 0 black;
        border: solid 1px black;
        padding: 20px;
        justify-content: center;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        max-height: 200px;
        max-width: 300px;
        overflow-y: auto;
        li{
            margin: 10px;
            img{
                width: 40px;
            }
                
        }
    }   
`