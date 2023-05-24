import { Router } from 'express'
import { register, login, updatePhoto, getUser, getUsers } from '../controllers/users.js'
import { deletePost, editPost, getPosts } from '../controllers/perfil.js'
import { createPost, posts } from '../controllers/posts.js'
import { addFollowers, addFollows } from '../controllers/followers.js'

const router = Router()

router.get('/', (__, res) => {
    res.send('Hello World')
})

router.post('/register', register)
router.post('/login', login)
router.post('/post', createPost)
router.get('/posts', posts)
router.put('/update/:id', updatePhoto)
router.get('/getUser', getUser)
router.get('/getPosts', getPosts)
router.delete('/deletePost/:id', deletePost)
router.put('/editPost/:id', editPost )
router.get('/getUsers', getUsers)
router.put('/addFollowers/:id', addFollowers)
router.put('/addFollows/:id', addFollows)


export { router }