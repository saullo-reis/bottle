import {server} from './server/index.js'

server.listen(3333, () => {
    console.log(`Servidor iniciado na porta ${3333}`)
})