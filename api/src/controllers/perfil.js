import { db } from "../database/index.js";

const getPosts = (req, res) => {
    const q = 'SELECT name, content, created_at, id FROM posts WHERE name = ?'
    const name = req.query.name

    db.all(q, name, function(err, posts){
        if(err) return console.error(err)
        return res.status(200).json(posts)
    })
}

const deletePost = (req,res) => {
    const q = 'DELETE from posts WHERE id = ?'
    const id = req.params.id
    
    db.run(q, id, function(err){
        if(err) return console.error(err.message)
        res.status(200).send(`Post de id ${id} deletado`)
    })
}

const editPost = (req, res) => {
    const q = 'UPDATE posts SET content = ? WHERE id = ?'
    const content = req.body.content
    const id = req.params.id

    db.run(q, [content, id], function(err){
        if(err) return console.error(err)
        res.status(200).json({new_content: content})
    })
}

export { getPosts, deletePost, editPost }