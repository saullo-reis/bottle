import { useContext } from "react";
import { styled } from "styled-components";
import { ThemeContext } from "../../../theme-context/theme";

export const Footer = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <FooterStyle style={{ backgroundColor: theme.background1}}>
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
    p{
      color: #22e;
      text-shadow: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
        
`