import axios from "axios"

export const getPosts  = async () => {
    const response = await axios.get('http://localhost:3333/posts')
    return response.data
}

export const post = async (user, content) => {
    await axios.post('http://localhost:3333/post', {
        name: user.name,
        photo: user.photo,
        content: content,
        idUser: user.id
    })
}