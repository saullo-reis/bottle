import { useEffect, useState } from "react"
import axios from 'axios'
import styled from "styled-components"
import { viewNotification } from "../../actions/viewNotification"

export const Notification = () => {
    const [ notifications, setNotifications ] = useState()
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3333/getNotifications/"+user.id)
            setNotifications(JSON.parse(response.data.notification))
            setTimeout(() => {
                viewNotification(user.id)
            },2000)
        }
        fetchData()
    },[])
    
    return(
        <NotificationsStyle>
            <h1>Notificações</h1>
            {
                notifications === null ? <h1>Nenhuma notificação.</h1> : 
                notifications?.map((element, index) => {
                    return (
                        <li key={index} style={{ backgroundColor: element.visualized === false ? "#2222EE" : "#121212"}}>
                            <img src={element.photo}></img>
                            <p>{element.name} {element.text}</p>
                        </li>
                    )
                })
            }
        </NotificationsStyle>
    )
}

const NotificationsStyle = styled.ul`
    padding-top: 100px;
    border: solid 1px black;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    h1{
        color: #fff;
    }
    li{
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px black;
        width: 100%;
        padding: 20px 0;
        p{
            color: #fff
        }
        img{
            width: 100px;
            border-radius: 50% ;
            border: solid 2px black;
            margin-right: 20px;
        }
    }

`