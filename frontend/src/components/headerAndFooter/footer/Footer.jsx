import { styled } from "styled-components";

export const Footer = () => {
  return (
    <FooterStyle>
      <p>
        Saullo Reis &copy; 2023
      </p>
    </FooterStyle>
  );
};

const FooterStyle = styled.section`
    height: 30px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #121212;
    p{
      color: #22e;
      text-shadow: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
        
`