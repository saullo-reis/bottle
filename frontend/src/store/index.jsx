import { configureStore } from '@reduxjs/toolkit'
import sliceData from './PerfilData'

const store = configureStore({
    reducer:{
        data: sliceData
    }
})

export { store }