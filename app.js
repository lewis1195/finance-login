const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const { findUserByUsername, findUserById } = require('./models/userModel');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;


app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
    { usernameField: 'cuenta_usuario' },
    (cuenta_usuario, password, done) => {
        findUserByUsername(cuenta_usuario, (error, results) => {
            if (error) return done(error);

            if (results.length === 0) {
                return done(null, false, { message: 'Cuenta de usuario no encontrada' });
            }

            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
            });
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    findUserById(id, (error, results) => {
        if (error) return done(error);
        if (results.length === 0) return done(null, false);
        done(null, results[0]);
    });
});


app.use('/', homeRoutes);
app.use('/auth', authRoutes);


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});