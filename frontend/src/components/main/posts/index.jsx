import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import moment from "moment-timezone"
import { Link } from "react-router-dom"
import { ButtonConfirm, TextArea } from "../../../styles/stylesComponents"
import styled from "styled-components"
import { PostsStyle } from "../../../styles/stylesComponents"

export const Posts = () => {
    const [posts, setPosts] = useState([])
    const [content, setContent] = useState('')
    const [refresh, setRefresh] = useState(0)
    const now = moment().tz("America/Sao_Paulo")
    const user = JSON.parse(localStorage.getItem('user'));
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:3333/posts')
            setPosts(response.data)
        }
        fetchData()
    }, [refresh])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            axios.post('http://localhost:3333/post', {
                name: user.name,
                photo: user.photo,
                content: content
            })
            setRefresh(refresh + 1)
            setContent('')
            setIsLoading(false)
        }, 1000);

    }

    const dateNow = (date) => {
        const utcDate = moment.utc(date)
        const createdAt = utcDate.tz('America/Sao_Paulo')
        const diff = moment.duration(now.diff(createdAt))
        const minutesAgo = diff.asMinutes()
        const roundedMinutesAgo = Math.round(minutesAgo)
        if (roundedMinutesAgo === 0) {
            return 'Postado agora'
        }
        if (roundedMinutesAgo >= 1440) {
            return `Postado há ${Math.round(roundedMinutesAgo / 1440)} dias atrás`
        }
        if (roundedMinutesAgo >= 60) {
            return `Postado há ${Math.round(roundedMinutesAgo / 60)} horas atrás`
        }
        return `Postado há ${roundedMinutesAgo} minutos atrás`
    }

    return (
        <section  style={{width: '70%'}}>
            <PostContentStyle onSubmit={handleSubmit}>
                <label className="post-label">O que você está pensando?</label>
                <TextArea placeholder="Escreva aqui" value={content} onChange={(e) => setContent(e.target.value)}></TextArea>
                {isLoading && <BarLoadingStyle></BarLoadingStyle>}
                <ButtonConfirm type={'submit'} style={{ opacity: content === '' ? '60%' : '100%', alignSelf:'flex-end', margin: '10px' }} className="post-button" value={'Enviar'}></ButtonConfirm>
            </PostContentStyle>
            <PostsStyle>
                {
                    posts.map((element, index) => {
                        return (
                            <li key={index}>
                                <div>
                                    <Link to={'/perfil/' + element.name}><img src={element.photo}></img> </Link>
                                    <h3>{element.name}</h3>
                                    <p>{dateNow(element.created_at)}</p>
                                </div>
                                <p>{element.content}</p>
                            </li>
                        )
                    })
                }
            </PostsStyle>
        </section>
    )
}

const BarLoadingStyle = styled.div`
    width: 100%;
    height: 5px;
    background-color: #2218e0;
    margin-bottom: 20px;
    animation: loading 0.5s linear;

    @keyframes loading{
        0%{
            width: 0%;
        }
        
        50%{
            width: 50%
        }
        
        100%{
            width: 100%
        }
    }      
`

const PostContentStyle = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;
    label{
        color: #707070; 
    }
    
            
`
