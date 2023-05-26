import { db } from "../database/index.js";
import axios from 'axios'

const getFollows = (req, res) => {
    const queryGetFollows = 'SELECT follows FROM users WHERE id = ?'

    const id = req.params.id

    db.get(queryGetFollows, id, function (err, response) {
        if (err) res.status(500).send(err.message)
        return res.status(200).send(JSON.stringify(response.follows))
    })
}

const follow = async (req, res) => {
    const queryFollows = 'UPDATE users SET follows = ? WHERE id = ?'
    const id = req.params.id
    const user = req.body
    const follows = await axios.get('http://localhost:3333/getFollows/' + id)
    if (follows.data === null) {
        db.run(queryFollows, [JSON.stringify([user]), id], function (err) {
            if (err) return res.status(500).send(err.message)
            return res.status(200).send('A pessoa do id ' + id + ' Seguiu ' + user.name)
        })
    } else {
        const addFollow = JSON.parse(follows.data)
        addFollow.push(user)
        db.run(queryFollows, [JSON.stringify(addFollow), id], function (err) {
            if (err) return res.status(500).send(err.message)
            return res.status(200).send('A pessoa do id ' + id + ' Seguiu ' + user.name)
        })
    }
}
 

export { follow, getFollows }