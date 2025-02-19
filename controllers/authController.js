const passport = require('passport');
const bcrypt = require('bcryptjs');
const { findUserByEmail, findUserByUsername, createUser } = require('../models/userModel');


const renderLogin = (req, res) => {
    res.sendFile('views/index.html', { root: __dirname + '/..' });
};


const handleLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            console.log("Error de autenticación:", info ? info.message : "Credenciales incorrectas");
            return res.redirect('/');
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            console.log("Inicio de sesión exitoso:", user);
            return res.redirect('/dashboard');
        });
    })(req, res, next);
};


const renderRegister = (req, res) => {
    res.sendFile('views/register.html', { root: __dirname + '/..' });
};


const handleRegister = (req, res) => {
    const { fullname, email, cuenta_usuario, password, confirmPassword, birthdate, gender } = req.body;

    if (password !== confirmPassword) {
        return res.send('Las contraseñas no coinciden');
    }

    if (fullname && email && cuenta_usuario && password && birthdate && gender) {
        findUserByEmail(email, (error, results) => {
            if (error) {
                return res.status(500).send('Error en el servidor');
            }

            if (results.length > 0) {
                return res.send('El correo electrónico ya está registrado');
            } else {
                findUserByUsername(cuenta_usuario, (error, results) => {
                    if (error) {
                        return res.status(500).send('Error en el servidor');
                    }

                    if (results.length > 0) {
                        return res.send('La cuenta de usuario ya está en uso');
                    } else {
                        bcrypt.hash(password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).send('Error al cifrar la contraseña');
                            }

                            createUser(fullname, email, cuenta_usuario, hash, birthdate, gender, (error, results) => {
                                if (error) {
                                    return res.status(500).send('Error al crear el usuario');
                                }
                                res.redirect('/'); 
                            });
                        });
                    }
                });
            }
        });
    } else {
        res.send('Por favor, completa todos los campos obligatorios');
    }
};

// Cerrar sesión
const handleLogout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};

module.exports = { renderLogin, handleLogin, renderRegister, handleRegister, handleLogout };

