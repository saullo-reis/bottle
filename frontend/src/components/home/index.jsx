import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Drop } from "./drops"

export const Home = () => {
    const navigate = useNavigate()
    const handleClick = (path) => navigate(path)

    return(
        <HomeStyle>
            <Drop/> 
            <ContentStyles>
                <h1>Bottle</h1>
                <div>
                    <ButtonStyle onClick={() => handleClick('/login')}>Login</ButtonStyle>
                    <ButtonStyle onClick={() => handleClick('/register')}>Register</ButtonStyle>
                </div>
            </ContentStyles>
        </HomeStyle>
       
    )
}

const HomeStyle = styled.section`
    background-color: #000;
    display: flex;
    width: 100%;
    position: absolute;
    align-items: center;
    justify-content: center;
`

const ContentStyles = styled.div`
    position: absolute;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1{
        color: #22e;
        font-size: 35px;
        margin: 0px 0px 30px;
        text-shadow: 4px 4px 5px black;
    }

`

const ButtonStyle = styled.button`
    background-color: #22e;
    padding: 5px 20px;
    box-shadow: 4px 4px 0 black;
    border: solid 1px black;
    color: #fff;
    margin: 0px 10px;
    transition: .3s;
    border-radius: 8px;
    cursor: pointer;
    &:hover{
        transform: scale(1.07);
    }
`


