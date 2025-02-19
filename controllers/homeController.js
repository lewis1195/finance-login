const path = require('path');
const fs = require('fs');

const renderHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};


const renderDashboard = (req, res) => {
    console.log("Usuario autenticado:", req.user);

    if (req.isAuthenticated()) {
        const filePath = path.join(__dirname, '../views/dashboard.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).send('Error al cargar la página');
            }

            const username = req.user.cuenta_usuario;
            const renderedHtml = data.replace('{{ username }}', username);

            res.send(renderedHtml);
        });
    } else {
        res.redirect('/');
    }
};

module.exports = { renderHome, renderDashboard };
