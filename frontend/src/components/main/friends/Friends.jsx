import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import { ToastContainer, toast} from 'react-toastify'

export const FriendsAdd = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [users, setUsers ] = useState([])

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get('http://localhost:3333/getUsers')
            const peoples = response.data.filter(element => (element.name !== user.name))
            setUsers(peoples)
        }
        fetchData()
    },[])

    const handleClick = async (element, index) => {
        try{
            await axios.put('http://localhost:3333/follow/' + user.id, {
                id: element.id,
                email: element.email,
                photo: element.photo,
                name: element.name
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
                                <button onClick={() => handleClick(element, index)}>+</button>
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
    box-shadow: 4px 4px 0 black;
    border: solid 1px black;
    border-radius: 8px;
    max-height: 350px;
    overflow-y: auto;
    margin: 20px;
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
                position: absolute;
                top: 0;
                right: 0;
                border-radius: 8px;
                background: none;
                color: white;
                text-align: center;
                padding: 2px 5px;
                cursor: pointer;
                transition: 0.7s;
                    &:hover{
                        color: #08ff08
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