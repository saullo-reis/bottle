import { useContext } from "react";
import { ThemeContext, themes } from '../../theme-context/theme'
import { Button } from "./button";

export const ThemeTogglerButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)
    console.log(theme)
    return (
        <Button onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>{theme === themes.dark ? 'Dark' : 'Light'}</Button>
    )
}