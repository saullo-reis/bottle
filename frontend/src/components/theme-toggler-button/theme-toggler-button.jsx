import { useContext } from "react";
import { ThemeContext, themes } from '../../theme-context/theme'

export const ThemeTogglerButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return ( 
        <button onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>{theme === themes.dark ? 'Dark' : 'Light'}</button>
    )
}