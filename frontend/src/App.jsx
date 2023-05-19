import { BrowserRouter } from 'react-router-dom'
import './GlobalStyle.sass'
import { AppRoutes } from './components/pages/Routes'
import { store } from './store'
import { Provider} from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
