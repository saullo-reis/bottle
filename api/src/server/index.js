import express from 'express'
import cors from 'cors'
import { router } from '../routes/index.js'

const server = express()

server.use(cors({
    origin: 'http://127.0.0.1:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
server.use(express.json())
server.use(router)

export { server }