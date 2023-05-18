import { Router } from 'express'
import { register, login, updatePhoto } from '../controllers/users.js'
import { createPost, posts } from '../controllers/posts.js'

const router = Router()

router.get('/', (__, res) => {
    res.send('Hello World')
})

router.post('/register', register)
router.post('/login', login)
router.post('/post', createPost)
router.get('/posts', posts)
router.put('/update/:id', updatePhoto)

export { router }