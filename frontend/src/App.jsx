import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './components/pages/Routes'
import { store } from './store'
import { Provider} from 'react-redux'
import { createGlobalStyle } from 'styled-components'

function App() {

  return (
    <Provider store={store}>
      <GlobalStyle/>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
    </Provider>
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

