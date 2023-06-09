import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext, themes } from '../../theme-context/theme'
import { FaSun, FaMoon } from 'react-icons/fa'

export const ThemeTogglerButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return ( 
        <ButtonTheme onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>{theme === themes.dark ? <FaSun/> : <FaMoon/>}</ButtonTheme>
    )
}

const ButtonTheme = styled.button`
    font-size: 10px;
    border-radius: 50%;
    border: none;
    color: #fff;
    background: none;
    &:hover{
        transform: none;
    }
`