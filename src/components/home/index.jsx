import { useState } from "react"
import { Footer } from "../headerAndFooter/footer/Footer"
import { Header } from "../headerAndFooter/header/Header"

export const Home = () => {
    const [post, setPost] = useState([{nome: '', post: ''}])

    function handleClick(){
        
    }

    return(
        <section className="home">
            <Header/>
            <label>O que você está pensando?</label>
            <textarea style={{resize: "none"}} cols={40}
            rows={10} onChange={(e) => setPost([{nome: 'Admin', post: e.target.value }])}></textarea>
            <button onClick={() => handleClick()}>Postar</button>
            <Footer/>    
        </section>
    )
}