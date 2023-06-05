import { db } from '../database/index.js'
import axios from 'axios'

export const getNotifications = (req, res) => {
    const query = 'SELECT notification FROM users WHERE id = ?'
    const id = req.params.id

    console.log(id)
    db.get(query, id, function(err, notifications){
        if(err) return res.status(500).send(err)
        return res.status(200).send(notifications)
    })
}

export const notification = async (req, res) => {
    const query = 'UPDATE users SET notification = ? WHERE id = ?'
    const newNotification = req.body
    const id = req.params.id
    let notifications = await axios.get('http://localhost:3333/getNotifications/'+id)

    if (notifications.data.notification === null) {
        db.run(query, [JSON.stringify([newNotification]), id], function (err) {
            if (err) return res.status(500).send(err.message)
            return res.status(200).send('Sucess')
        })
    } else {
        let allNotifications = JSON.parse(notifications.data.notification)
        allNotifications.unshift(newNotification)
        db.run(query, [JSON.stringify(allNotifications), id], function (err) {
            if (err) return res.status(500).send(err.message)
            return res.status(200).send('Sucess')
        })
    }
}
