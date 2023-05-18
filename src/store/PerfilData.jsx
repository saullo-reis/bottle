import { createSlice } from '@reduxjs/toolkit'


const sliceData = createSlice({
    name: 'data',
    initialState: {
        id: 0,
        email: '',
        password: '',
        name: '',
        photo: ''
    },
    reducers:{
        addData(state, action) {
            state.id = action.payload.id
            state.email = action.payload.email
            state.password = action.payload.password
            state.name = action.payload.name
            state.photo = action.payload.photo
        },
    }
    

})

export default sliceData.reducer
export const { addData } = sliceData.actions