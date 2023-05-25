import { Footer } from "../headerAndFooter/footer/Footer"
import { Header } from "../headerAndFooter/header/Header"
import { Perfil } from "./user"
import { Posts } from "./posts"
import { FriendsAdd } from "./friends/Friends"
import { styled } from "styled-components"

export const Home = () => {
    return(
        <HomeStyle>
            <Header/>
            <main>
                <Perfil/>
                <Posts />
                <FriendsAdd/>
            </main>
            <Footer/>    
        </HomeStyle>
    )
}

const HomeStyle = styled.section`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    main{
        min-height: 88vh;
        display: flex;
        justify-content: space-between;
        width: 93vw;
    }

    @media ( max-width: 800px ){
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        main{
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }  
    }      
    
`