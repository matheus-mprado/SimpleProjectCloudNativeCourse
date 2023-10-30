const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200);

    // Obtém o nome do pod usando o módulo 'os'
    const podName = os.hostname();

    res.end(`Pod rodando First Commit Jenkins: ${podName}\n`);
});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor Node.js está rodando na porta ${port}`);
});
