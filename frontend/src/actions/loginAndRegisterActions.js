import axios from "axios"

export const registerAction = async (data) => {
    await axios.post('http://localhost:3333/register', {
        email: data.email,
        name: data.name,
        password: data.password,
        photo: 'https://www.promoview.com.br/uploads/images/unnamed%2819%29.png'
    })
}

export const loginAction = async (data) => {
    const response = await axios.post('http://localhost:3333/login', {
        email: data.email,
        password: data.password
    })
    return response
}