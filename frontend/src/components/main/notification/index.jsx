import { Footer } from "../../headerAndFooter/footer/Footer"
import { Header } from "../../headerAndFooter/header/Header"
import { Perfil } from "../user/index"
import { FollowAdd } from "../container-peoples/container-peoples"
import { styled } from "styled-components"
import { Notification } from "./notification"

export const Notifications = () => {
    return (
        <MainStyle>
            <Header />
            <main>
                <Perfil />
                <Notification/>
                <FollowAdd />
            </main>
            <Footer />
        </MainStyle>
    )
}

const MainStyle = styled.section`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    background-color: #2F2E2E;
    min-height: 80vh;
    main{
        min-height: 88vh;
        display: flex;
        justify-content: space-between;
        width: 93vw;
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