import { db } from "../database/index.js"
import { sha256 } from 'js-sha256'
import axios from 'axios'

const register = (req, res) => {
    const q = 'INSERT INTO users (name, email, password, photo) VALUES (?, ?, ?, ?)'
    const { name, email, password, photo } = req.body

    db.run(q, [name, email, sha256(password), photo], function (err) {
        if (err) return res.status(401).json({ error: err.message })

        console.log("Usuário registrado")
        return res.status(200).json(req.body)
    })
}

const login = (req, res) => {
    const q = 'SELECT id, email, password, photo, name FROM users WHERE email = ?'
    const { email, password } = req.body

    db.get(q, email, function (err, user) {
        if (err) return res.status(500).json({ error: 'Erro no servidor' })
        if (!user || user.password !== sha256(password)) return res.status(401).json({ error: 'Credenciais incorretos' })
        return res.status(200).json(user);
    })
}

const updatePhoto = (req, res) => {
    const q = 'UPDATE users SET photo = ? WHERE id = ?';
    const id = req.params.id; 
    const photo = req.body.photo; 

    db.run(q, [photo, id], function (err) {
        if (err) return res.status(500).json({ error: 'Erro no servidor' });
        return res.status(200).json(req.body);
    });
};

const getUser = (req, res) => {
    const q = 'SELECT * FROM users WHERE id = ?'
    const id = req.params.id
    db.get(q, id, function (err, user) {
        if (err) return res.status(500).json({ error: 'Erro no servidor' })
        return res.status(200).json(user);
    });
};

const getUsers = (req, res) => {
    const q = 'SELECT * FROM users'

    db.all(q, function(err, users){
        if(err) return res.status(500).json({error: 'Erro no servidor'})
        return res.status(200).json(users)
    })
}

const editProfilePassword = async (req, res) => {
    const q = ' UPDATE users SET password = ? WHERE id = ?'
    const id =  req.params.id
    const {password, newPassword1, newPassword2} = req.body
    const userActual = await axios.get('http://localhost:3333/getUser/'+id)

    console.log(sha256(password), userActual.data.password)

    if (sha256(password) === userActual.data.password && newPassword1 === newPassword2) {
        db.run(q, [sha256(newPassword1), id], function (err) {
            if (err) return res.status(500)
            return res.status(200).send('Senha atualizada')
        })
    }else{
        console.log('Error')
        return res.status(401).send('Erro cliente.')
    }
    
}

export { register, login, updatePhoto, getUser, getUsers, editProfilePassword }