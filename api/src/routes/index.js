import { Router } from 'express'
import { register, login, updatePhoto, getUser, getUsers, editProfilePassword } from '../controllers/users.js'
import { deletePost, editPost, getPosts } from '../controllers/perfil.js'
import { createPost, editProfilePosts, posts } from '../controllers/posts.js'
import { follow, getFollows, getFollowers, followers } from '../controllers/follow.js'

const router = Router()

router.get('/', (__, res) => {
    res.send('Hello World')
})

router.post('/register', register)
router.post('/login', login)
router.post('/post', createPost)
router.get('/posts', posts)
router.put('/update/:id', updatePhoto)
router.get('/getUser/:id', getUser)
router.get('/getPosts', getPosts)
router.delete('/deletePost/:id', deletePost)
router.put('/editPost/:id', editPost )
router.get('/getUsers', getUsers)
router.put('/follow/:id', follow)
router.get('/getFollows/:id', getFollows)
router.put('/followers/:id', followers)
router.get('/getFollowers/:id', getFollowers)
router.put('/editProfilePassword/:id', editProfilePassword)
router.put('/editProfilePosts/:name/:id', editProfilePosts)

export { router }