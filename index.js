const express = require('express');
const server = express();

const logica = './script';

server.use(express.urlencoded({ extended: true }));
server.use(express.static('./public'));
server.use(express.json());

//Status do jogo
server.get('/status', (req, res) => {
	return res.json(logica);
});

//Para iniciar o jogo
server.post('/jogada', (req, res) => {
	return res.json(logica);
});

//Para reiniciar o jogo
server.delete('/reinicia', (req, res) => {
	return res.json(logica);
});

server.listen(3000);
