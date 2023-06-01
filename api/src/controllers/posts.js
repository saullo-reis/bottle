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

const editProfilePosts = (req, res) => {
    const q = 'UPDATE posts SET name = ? WHERE idUser = ?'
    const {name, id} = req.params
    console.log(name, id)
    db.run(q, [name, id], function(err){
        if(err) return res.status(500).send(err.message)
        return res.status(200).send('Atualizado')
    })
}

export { createPost, posts, editProfilePosts }