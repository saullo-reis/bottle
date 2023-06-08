import { useState } from "react"
import { createContext } from "react"

export const themes = {
    light: {
        color: '#000',
        background1: 'gray',
        background2: '#fff'
    },
    dark: {
        color: '#fff',
        background1: '#121212',
        background2: '#2F2E2E'
    }
}

export const ThemeContext = createContext({})

export const ThemeProvider = ( props ) => {

    const[theme, setTheme] = useState(themes.dark)

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}