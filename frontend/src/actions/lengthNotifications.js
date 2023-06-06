import axios from "axios"

export const lengthNotifications = async (id) => {
    const response = await axios.get('http://localhost:3333/getNotifications/'+id)
    const notifications = JSON.parse(response.data.notification)
    const newNotifications = notifications.filter(element => element.visualized === false)
    
    return newNotifications.length 
}