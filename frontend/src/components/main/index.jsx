import { Footer } from "../headerAndFooter/footer/Footer"
import { Header } from "../headerAndFooter/header/Header"
import { Perfil } from "./user"
import { Posts } from "./posts"
import { FriendsAdd } from "./follows/Follows"
import { styled } from "styled-components"

export const Main = () => {
    return(
        <MainStyle>
            <Header/>
            <main>
                <Perfil/>
                <Posts />
                <FriendsAdd/>
            </main>
            <Footer/>    
        </MainStyle>
    )
}

const MainStyle = styled.section`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    background-color: #2F2E2E;
    min-height: 90vh;
    main{
        min-height: 88vh;
        display: flex;
        justify-content: space-between;
        width: 93vw;
        padding: 100px
    }

    @media ( max-width: 800px ){
        main{
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }  
    }      
    
`