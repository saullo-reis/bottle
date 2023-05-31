import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { styled } from 'styled-components'

export const PerfilFriends = () => {
    const [followers, setFollowers] = useState([])
    const [follows, setFollows] = useState([])
    const { id } = useParams()
    const [windowFollow, setWindowFollow ] = useState('followers')

    console.log(id)
    useEffect(() => {
        const fetchData =  async () => {
            try{
                const arrayFollowers = await axios.get('http://localhost:3333/getFollowers/' + id)
                setFollowers(JSON.parse(arrayFollowers.data))
                const arrayFollows = await axios.get('http://localhost:3333/getFollows/' + id)
                setFollows(JSON.parse(arrayFollows.data))
            }catch(err){
                console.error(err)
            }
            
        }
        fetchData()
    },[id])

    const changeWindow = (path) => setWindowFollow(path)
    console.log(followers)

    return(
        <PerfilFriendsStyle>
            <div>
                <button onClick={() => changeWindow('followers')} style={{borderBottom: windowFollow === 'followers' && '2px solid #2222EE' }}>{followers.length} Seguindo</button>
                <button onClick={() => changeWindow('follows')} style={{ borderBottom: windowFollow === 'follows' && '2px solid #2222EE' }}>{follows.length} Seguidores</button>
            </div>

            {
                windowFollow === 'followers' && <ul className="perfil-friends-container">
                    {
                        followers?.map((element, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/perfil/${element.name}/${element.id}`}>
                                        <img src={element.photo}></img>
                                    </Link>
                                </li>
                            )

                        })
                    }
                </ul> 
            }
            {
                windowFollow === 'follows' && <ul className="perfil-friends-container">
                    {
                        follows?.map((element, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/perfil/${element.name}/${element.id}`}>
                                        <img src={element.photo}></img>
                                    </Link>
                                </li>
                            )

                        })
                    }
                </ul> 
            }
            
        </PerfilFriendsStyle>
    )
}

const PerfilFriendsStyle = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    width: 200px;
    div{
        display: flex;
        button{
            background: none;
            font-size: 10px;
            margin: 0 10px;
            color: #AAAAAA;
            border:none;
            cursor: pointer;
        }
    }
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
        padding: 20px;
        justify-content: center;
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