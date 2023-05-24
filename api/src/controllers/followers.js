import { db } from "../database/index.js";

const addFollowers = (req, res) => {
    const q = 'UPDATE users SET followers = ? WHERE id = ?'

    const user = req.body
    const id = req.params

    db.run(q, [user, id], function(err){
        if(err) return res.status(500).json({error: 'Error server'})
        return res.status(200).send('Atualizado a quantidade de followers')
    })
}

const addFollows = (req, res) => {
    const q = 'UPDATE user SET follows = ? WHERE id = ?'

    const user = req.body
    const id = req.params

    db.run(q, [user, id], function (err) {
        if (err) return res.status(500).json({ error: 'Error server' })
        return res.status(200).send('Atualizado a quantidade de follows')
    })
}

export { addFollowers, addFollows}