import { db } from "../database/index.js"
import jwt from 'jsonwebtoken'

const register = (req, res) => {
    const q = 'INSERT INTO users (name, email, password, photo) VALUES (?, ?, ?, ?)'
    const { name, email, password, photo } = req.body

    db.run(q, [name, email, password, photo], function (err) {
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
        if (!user || user.password !== password) return res.status(401).json({ error: 'Credenciais incorretos' })
        return res.status(200).json(user);
    })
}

const updatePhoto = (req, res) => {
    const q = 'UPDATE users SET photo = ? WHERE id = ?';
    const id = req.params.id; // Use req.params.id para obter o ID da rota
    const photo = req.body.photo; // Use req.body.photo para obter a foto do corpo da requisição

    db.run(q, [photo, id], function (err) {
        if (err) return res.status(500).json({ error: 'Erro no servidor' });
        return res.status(200).json(req.body);
    });
};

const getUser = (req, res) => {
    const q = 'SELECT * FROM users WHERE email = ?'
    const  email = req.query.email

    db.get(q, email, function (err, user) {
        if (err) return res.status(500).json({ error: 'Erro no servidor' })
        return res.status(200).json(user);
    });
};

export { register, login, updatePhoto, getUser }