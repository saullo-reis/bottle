import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './GlobalStyle.sass'
import { AppRoutes } from './components/pages/Routes'

function App() {

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
