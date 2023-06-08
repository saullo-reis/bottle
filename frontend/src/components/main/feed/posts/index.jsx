import { useEffect } from "react"
import { useState } from "react"
import { dateNow } from "../../../../actions/dateNow"
import { Link } from "react-router-dom"
import { ButtonConfirm, TextArea } from "../../../../styles/stylesComponents"
import styled from "styled-components"
import { PostsStyle } from "../../../../styles/stylesComponents"
import { getPosts, post } from "../../../../actions/postAndGetPosts"
import { useContext } from "react"
import { ThemeContext } from "../../../../theme-context/theme"

export const Posts = () => {
    const [posts, setPosts] = useState([])
    const [content, setContent] = useState('')
    const [refresh, setRefresh] = useState(0)
    const user = JSON.parse(localStorage.getItem('user'));
    const [isLoading, setIsLoading] = useState(false)
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        async function fetchData() {
            const response = await getPosts()
            setPosts(response)
        }
        fetchData()
    }, [refresh])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(async () => {
            await post(user, content)
            setRefresh(refresh + 1)
            setContent('')
            setIsLoading(false)
        }, 1000);

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
                            <li key={index} style={{ backgroundColor: theme.background1 }}>
                                <div>
                                    <Link to={'/perfil/' + element.name + '/' + element.id}><img src={element.photo}></img> </Link>
                                    <h3>@{element.name}</h3>
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
    border: solid black 1px;
    padding: 30px;
    padding-top: 60px;
    label{
        color: #707070; 
    }
    
            
`
