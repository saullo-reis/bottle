import { styled } from "styled-components"

export const Drop = () => {
    return(
        <Container>
            <Bolhas>
                <span style={{ '--i': '31' }}></span>
                <span style={{ '--i': '12' }}></span>
                <span style={{ '--i': '53' }}></span>
                <span style={{ '--i': '44' }}></span>
                <span style={{ '--i': '25' }}></span>
                <span style={{ '--i': '36' }}></span>
                <span style={{ '--i': '47' }}></span>
                <span style={{ '--i': '28' }}></span>
                <span style={{ '--i': '19' }}></span>
                <span style={{ '--i': '20' }}></span>
                <span style={{ '--i': '32' }}></span>
                <span style={{ '--i': '35' }}></span>
                <span style={{ '--i': '42' }}></span>
                <span style={{ '--i': '78' }}></span>
                <span style={{ '--i': '34' }}></span>
                <span style={{ '--i': '15' }}></span>
                <span style={{ '--i': '73' }}></span>
                <span style={{ '--i': '34' }}></span>
                <span style={{ '--i': '88' }}></span>
                <span style={{ '--i': '23' }}></span>
                <span style={{ '--i': '50' }}></span>
                <span style={{ '--i': '21' }}></span>
                <span style={{ '--i': '77' }}></span>
                <span style={{ '--i': '43' }}></span>
                <span style={{ '--i': '12' }}></span>
                <span style={{ '--i': '23' }}></span>
                <span style={{ '--i': '67' }}></span>
                <span style={{ '--i': '12' }}></span>
                <span style={{ '--i': '73' }}></span>
                <span style={{ '--i': '89' }}></span>
                <span style={{ '--i': '12' }}></span>
                <span style={{ '--i': '53' }}></span>
                <span style={{ '--i': '14' }}></span>
                <span style={{ '--i': '78' }}></span>
                <span style={{ '--i': '73' }}></span>
                <span style={{ '--i': '15' }}></span>
                <span style={{ '--i': '84' }}></span>
                <span style={{ '--i': '23' }}></span>
                <span style={{ '--i': '74' }}></span>
                <span style={{ '--i': '16' }}></span>
                <span style={{ '--i': '72' }}></span>
                <span style={{ '--i': '16' }}></span>
                <span style={{ '--i': '72' }}></span>
                <span style={{ '--i': '31' }}></span>
                <span style={{ '--i': '12' }}></span>
                <span style={{ '--i': '53' }}></span>
                <span style={{ '--i': '44' }}></span>
                <span style={{ '--i': '25' }}></span>
                <span style={{ '--i': '36' }}></span>
                <span style={{ '--i': '47' }}></span>
                <span style={{ '--i': '28' }}></span>
                <span style={{ '--i': '19' }}></span>
                <span style={{ '--i': '20' }}></span>
                <span style={{ '--i': '32' }}></span>
                <span style={{ '--i': '35' }}></span>
                <span style={{ '--i': '42' }}></span>
                <span style={{ '--i': '78' }}></span>
                <span style={{ '--i': '34' }}></span>
                <span style={{ '--i': '15' }}></span>
                <span style={{ '--i': '73' }}></span>
                <span style={{ '--i': '34' }}></span>
                <span style={{ '--i': '88' }}></span>
                <span style={{ '--i': '23' }}></span>
                <span style={{ '--i': '50' }}></span>
                <span style={{ '--i': '21' }}></span>
                <span style={{ '--i': '77' }}></span>
                <span style={{ '--i': '43' }}></span>
                <span style={{ '--i': '12' }}></span>
                <span style={{ '--i': '23' }}></span>
                <span style={{ '--i': '67' }}></span>
                <span style={{ '--i': '12' }}></span>
                <span style={{ '--i': '73' }}></span>
                <span style={{ '--i': '89' }}></span>
                <span style={{ '--i': '12' }}></span>
                <span style={{ '--i': '53' }}></span>
                <span style={{ '--i': '14' }}></span>
                <span style={{ '--i': '78' }}></span>
                <span style={{ '--i': '73' }}></span>
                <span style={{ '--i': '15' }}></span>
                <span style={{ '--i': '84' }}></span>
                <span style={{ '--i': '23' }}></span>
                <span style={{ '--i': '74' }}></span>
                <span style={{ '--i': '16' }}></span>
                <span style={{ '--i': '72' }}></span>
                <span style={{ '--i': '16' }}></span>
                <span style={{ '--i': '72' }}></span>
            </Bolhas>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 2;

`

const Bolhas = styled.div`
    position: absolute;
    display: flex;
    span{
        width: 8px;
        height: 8px;
        background-color: #22e;
        margin: 0 4px;
        border-radius: 50%;
        animation: drops calc(30s / var(--i)) linear infinite;
    }

    @keyframes drops{
        0%{
            transform: translateY(-10vh) scale(0)
        }
        100%{
            transform: translateY(100vh) scale(1)
        }
    }
`

