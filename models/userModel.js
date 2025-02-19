const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Buscar usuario por correo electrónico
const findUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

// Buscar usuario por cuenta de usuario
const findUserByUsername = (cuenta_usuario, callback) => {
    db.query('SELECT * FROM users WHERE cuenta_usuario = ?', [cuenta_usuario], callback);
};

// Buscar usuario por ID (para deserializeUser)
const findUserById = (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

// Crear un nuevo usuario
const createUser = (fullname, email, cuenta_usuario, password, birthdate, gender, callback) => {
    db.query(
        'INSERT INTO users (fullname, email, cuenta_usuario, password, birthdate, gender) VALUES (?, ?, ?, ?, ?, ?)',
        [fullname, email, cuenta_usuario, password, birthdate, gender],
        callback
    );
};

module.exports = { findUserByEmail, findUserByUsername, findUserById, createUser };