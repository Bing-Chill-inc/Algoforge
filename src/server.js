const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Récupérer le chemin du fichier demandé
    const filePath = path.join(__dirname, 'index.html');

    // Lire le contenu du fichier
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});