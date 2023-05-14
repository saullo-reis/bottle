import { Footer } from "../headerAndFooter/footer/Footer"
import { Header } from "../headerAndFooter/header/Header"
import { Posts } from "./posts"

export const Home = () => {
    return(
        <section className="home">
            <Header/>
            <Posts/>
            <Footer/>    
        </section>
    )
}