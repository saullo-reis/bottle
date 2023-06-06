import axios from "axios"

export const viewNotification = async (id ) => {
    const response = await axios.put('http://localhost:3333/viewNotification/'+id)
    console.log(response)
}