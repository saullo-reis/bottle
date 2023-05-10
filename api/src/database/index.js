import sqlite3 from "sqlite3";

const db = new sqlite3.Database('database.db', (err) => {
    if(err) {
        console.error(err.message)
    }
    console.log('Conectado ao banco de dados')
})

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
)`, (err) => {
    if(err){
        console.error(err.message)
    }
    console.log('Tabela users criada')
})

export { db }