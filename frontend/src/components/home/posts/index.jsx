import { useEffect } from "react"
import { useState } from "react"
import './StylePosts.sass'
import axios from "axios"
import moment from "moment-timezone"
import { useSelector } from "react-redux"

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
            return `Postado há ${Math.round(roundedMinutesAgo/1440)} dias atrás`
        }
        if(roundedMinutesAgo >= 60){
            return `Postado há ${Math.round(roundedMinutesAgo / 60) } horas atrás`
        }
        return `Postado há ${roundedMinutesAgo} minutos atrás`
    }

    return (
        <section className="main">
            <form className="post" onSubmit={handleSubmit}>
                <label className="post-label">O que você está pensando?</label>
                <textarea placeholder="Escreva aqui" value={content} className="post-content" style={{ resize: "none" }}
                    onChange={(e) => setContent(e.target.value)}></textarea>
                {isLoading && <div className="loading"></div>}
                <input type={'submit'} style={{opacity: content === '' ? '60%' : '100%'}} className="post-button" value={'Enviar'}></input>
            </form>
            <ul className="posts">
                {
                    posts.map((element, index) => {
                        return (
                            <li className="posts-post" key={index}>
                                <div className="posts-post-container">
                                    <img className="posts-post-container-img" src={element.photo}></img>
                                    <p className="posts-post-container-name">{element.name}</p>
                                    <p className="posts-post-container-date">{dateNow(element.created_at)}</p>
                                </div>
                                <p className="posts-post-content">{element.content}</p>
                            </li>
                        )
                    })
                }
            </ul>

        </section>
    )
}