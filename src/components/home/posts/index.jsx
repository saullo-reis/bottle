import { useState } from "react"
import './StylePosts.sass'

export const Posts = () => {

    const [post, setPost] = useState([{ nome: '', post: '' }])

    function handleClick() {
        
    }
    return (
        <>
            <form className="post">
                <label className="post-label">O que você está pensando?</label>
                <textarea placeholder="Escreva aqui" className="post-content" style={{ resize: "none" }}
                    onChange={(e) => setPost([{ nome: 'Admin', post: e.target.value }])}></textarea>
                <button className="post-button" onClick={() => handleClick()}>Postar</button>
            </form>
            <ul>
                <li>
                    posts
                </li>
            </ul>

        </>
    )
}