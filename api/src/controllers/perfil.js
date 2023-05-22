import { db } from "../database/index.js";

const getPosts = (req, res) => {
    const q = 'SELECT name, content, created_at, id FROM posts WHERE name = ?'
    const name = req.query.name

    db.all(q, name, function(err, posts){
        if(err) return console.error(err)
        return res.status(200).json(posts)
    })
}

export { getPosts }