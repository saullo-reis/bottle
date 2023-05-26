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

    const handleClick = async (element) => {
        try{
            await axios.put('http://localhost:3333/follow/' + user.id, {
                id: element.id,
                email: element.email,
                photo: element.photo,
                name: element.name
            })
            toast.success('Você seguiu '+ element.name)
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
                            <li key={index}>
                                <div>
                                    <p>{element.name}</p>
                                    <img src={element.photo} />
                                </div>
                                <button onClick={() => handleClick(element)}>+</button>
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
    background-color: #D9D9D9;
    text-align: center;
    h1{
        color: #000;
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
            width: 80%;
            padding: 5px;
            div{
                img{
                width: 40px;
                }
                p{
                    color: white;
                    font-size: 12px;
                }
            }
            button{
                background-color: #00f900;
                border: none;
                font-size: 25px;
                color: white;
                text-align: center;
                border: solid 1px black;
                box-shadow: 2px 2px 0 black;
                padding: 5px 10px;
                cursor: pointer;
                transition: .7s;
                &:hover{
                    transform: scale(0.95);
                    box-shadow: 1px 1px 0 black;
                }
            }
        }
    }
    @media(max-width: 700px){
        display: none
    }

`