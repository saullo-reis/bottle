import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './pages/Routes'
import { store } from './store'
import { Provider} from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from './theme-context/theme'

function App() {

  return (
    <ThemeProvider>
      <Provider store={store}>
        <GlobalStyle />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
    
  )
}

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    font-family: 'Unbounded', cursive;
    list-style-type: none;
    text-decoration: none;
  }
    
`

export default App

