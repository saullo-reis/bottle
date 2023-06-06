import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import {toast} from 'react-toastify'
import { Link } from "react-router-dom"
import { follow, followers, notificationFollow } from "../../actions/followsactions"

export const FollowAdd = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [users, setUsers ] = useState([])
    const [filterUsers, setFilterUsers] = useState([])

    useEffect(() => {
        async function fetchData() {
            const allUsers = await axios.get('http://localhost:3333/getUsers');
            const getFollows = await axios.get('http://localhost:3333/getFollows/' + user.id)
            const follows = JSON.parse(getFollows.data)
            if(follows === null){
                setUsers(allUsers.data.filter(element => element.id !== user.id))
            }else{
                const response = allUsers.data.filter(element => {
                    if (element.id === user.id) return false
                    for (let i = 0; i < follows?.length; i++) {
                        if (element.id === follows[i].id) return false
                    }
                    return true;
                });
                setUsers(response);
            } 
        }
        fetchData();
    },[filterUsers])

    const handleClick = async (element, index) => {
        try{
            await follow(user, element)
            await followers(user, element)
            await notificationFollow(user, element)
            toast.success('Você seguiu '+ element.name)
            const people = document.getElementsByClassName('people')
            people[index].classList.add('animation')
        }catch(err){
            console.error(err)
        }
        
        
    }

    const searchUsers = (e) => {
        setFilterUsers(users.filter(element => {
            if(element.name.toLowerCase().includes(e)) return element
        }))
    }

    return(
        <FollowsStyle>
            <h1>Usuários</h1>
            <input className="search-users" onChange={(e) => searchUsers(e.target.value)} placeholder='Digite o nome aqui'></input>
            <ul>
                {
                    filterUsers.length === 0 &&
                    users.map((element, index) => {
                        return (
                            <li key={index} className='people'>
                                <div>
                                    <Link to={'/perfil/'+element.name+'/'+ element.id}>
                                        <img src={element.photo} />
                                    </Link>
                                    <p>@{element.name}</p>
                                </div>
                                <button onClick={() => handleClick(element, index)}>Seguir</button>
                            </li>
                        )
                    })
                }
                {
                    filterUsers.length >= 1 &&
                    filterUsers.map((element, index) => {
                        return(
                            <li key={index} className='people'>
                                    <div>
                                        <Link>
                                            <img src={element.photo} />
                                        </Link>
                                        <p>@{element.name}</p>
                                    </div>
                                    <button onClick={() => handleClick(element, index)}>Seguir</button>
                            </li>
                        )
                    })
                }
            </ul>
        </FollowsStyle>
        
    )
}

const FollowsStyle = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    border: solid 1px black;
    max-height: 350px;
    overflow-y: auto;
    margin: 60px 15px;
    padding: 10px;
    background-color: #121212;
    text-align: center;
    .search-users{
        padding: 2px;
        border-radius: 8px;
        background-color: #121212;
        border: #fff solid 2px;
        color: #fff;
        &:focus{
            outline: #22e 2px solid;
            border: none;
            
        }
    }
    .animation{
        animation: slide ease forwards 1s
    }
    h1{
        color: #fff;
        
    }
    ul{
        display: flex;
        flex-flow: row wrap;
        flex-direction: column;
        width: 100%;
        align-items: center;
        li{
            background-color: #22e;
            box-shadow: 4px 4px 0 black;
            border: solid 1px black;
            border-radius: 8px;
            display: flex;
            margin: 20px 0;
            justify-content: space-between;
            align-items: center;
            position: relative;
            padding: 10px;
            width: 80%;
            div{
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                width: 40px;
                border-radius: 50%;
                border: #000 solid 2px;
                }
                p{
                    color: gray;
                    font-size: 12px;
                    text-align: center;
                    margin-left: 5px;
                }
            }
            button{
                border: none;
                font-size: 20px;
                border-radius: 32px;
                font-size: 10px;
                background: none;
                margin-right: 5px ;
                color: white;
                text-align: center;
                padding: 4px 7px;
                cursor: pointer;
                transition: 0.3s;
                    &:hover{
                        background-color: #121212
                    }
            }
        }
    }
    @media(max-width: 700px){
        display: none
    }
    @keyframes slide {
        0%{
            transform: translateX(0);
            opacity: 1;
        }
        100%{
            transform: translateX(100px);
            opacity: 0;
        }
    }

`