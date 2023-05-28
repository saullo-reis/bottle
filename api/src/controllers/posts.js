import { db } from "../database/index.js"

const createPost = (req, res) => {
    const query = "INSERT INTO posts (name, photo, content, idUser) VALUES (?, ?, ?, ?)"
    const { name, photo, content, idUser } = req.body
    console.log(idUser)
    db.run(query, [name, photo, content, idUser], function(err) {
        if(err) {
            console.log(err.message)
            return res.send(err.message)
        }
        return res.status(200).json(req.body)
    })
}

const posts = (__, res) => {
    const query = 'SELECT * FROM posts'
    db.all(query, function(err, data){
        if(err) return res.status(500).json({error: err.message})
        res.status(200).json(data.reverse())
    })
}

export { createPost, posts }