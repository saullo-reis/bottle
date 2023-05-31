import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import {toast} from 'react-toastify'

export const FriendsAdd = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [users, setUsers ] = useState([])
   
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
                        console.log(follows[i].id)
                        if (element.id === follows[i].id) return false

                    }
                    return true;
                });

                console.log(response);
                setUsers(response);
            }
            
        }

        fetchData();
    },[])

    console.log(users)
    const handleClick = async (element, index) => {
        try{
            await axios.put('http://localhost:3333/follow/' + user.id, {
                id: element.id,
                email: element.email,
                photo: element.photo,
                name: element.name
            })
            await axios.put('http://localhost:3333/followers/' + element.id, {
                id: user.id,
                email: user.email,
                photo: user.photo,
                name: user.name
            })
            toast.success('Você seguiu '+ element.name)
            const people = document.getElementsByClassName('people')
            people[index].classList.add('animation')
        }catch(err){
            console.error(err)
        }
        
        
    }

    return(
        <Friends>
            <h1>Talvez você conheça</h1>
            <ul>
                {
                    users.map((element, index) => {
                        return(
                            <li key={index} className="people" >
                                <div>
                                    <img src={element.photo} />
                                    <p>{element.name}</p>
                                </div>
                                <button onClick={() => handleClick(element, index)}>Seguir</button>
                            </li>
                        )
                    })
                }
            </ul>
        </Friends>
        
    )
}

const Friends = styled.aside`
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
            width: 80%;
            div{
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                width: 40px;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
                }
                p{
                    color: white;
                    font-size: 12px;
                    text-align: center;
                    
                }
            }
            button{
                border: none;
                font-size: 20px;
                border-radius: 8px;
                font-size: 10px;
                background: none;
                margin-right: 5px ;
                color: white;
                text-align: center;
                padding: 2px 5px;
                cursor: pointer;
                transition: 0.7s;
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