import { useContext } from "react"
import { ThemeContext} from "../../theme-context/theme"

export const Button = (props) => {
    const { themes } = useContext(ThemeContext)

    return (
        <button {...props} />
    )
}