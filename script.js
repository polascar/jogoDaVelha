const { response } = require('express');
const express = require('express');
const server = express();
server.use(express.json());

let tabuleiro = [ 5 ][5];

function main() {
	let fimDeJogo = false,
		ganhador = 0;

	/**
	 * Inicializa tabuleiro
	 */

	tabuleiro[0][1] = tabuleiro[0][3] = '|';
	tabuleiro[1][0] = tabuleiro[1][2] = '_';
	tabuleiro[1][4] = '_';
	tabuleiro[2][1] = tabuleiro[2][3] = '|';
	tabuleiro[3][0] = tabuleiro[3][2] = '_';
	tabuleiro[3][4] = '_';
	tabuleiro[4][1] = tabuleiro[4][3] = '|';
	tabuleiro[1][1] = tabuleiro[1][3] = tabuleiro[3][1] = tabuleiro[3][3] = '.';

	tabuleiro[0][0] = tabuleiro[0][2] = tabuleiro[0][4] = ' ';
	tabuleiro[2][0] = tabuleiro[2][2] = tabuleiro[2][4] = ' ';
	tabuleiro[4][0] = tabuleiro[4][2] = tabuleiro[4][4] = ' ';

	console.log('Joga da Velha');
	imprimirTabuleiro();

	do {
		/* Jogador 1 */
		if (fimDeJogo == false) {
			realizarJogada(1, 'x');

			imprimirTabuleiro();

			if (verificarGanhador('x') == true) {
				ganhador = 1;
				fimDeJogo = true;
			} else if (verificarEmpate() == true) {
				ganhador = 0;
				fimDeJogo = true;
			}
		}

		/* Jogador 2 */
		if (fimDeJogo == false) {
			realizarJogada(2, 'O');

			imprimirTabuleiro();

			if (verificarGanhador('O') == true) {
				ganhador = 2;
				fimDeJogo = true;
			} else if (verificarEmpate() == true) {
				ganhador = 0;
				fimDeJogo = true;
			}
		}
	} while (fimDeJogo == false);

	if (ganhador == 1) {
		console.log('Ganhador é o jogador 1');
	} else if (ganhador == 2) {
		console.log('Ganhador é o jogador 2');
	} else {
		console.log('Fim de jogo: Empatado.');
	}
}

function imprimirTabuleiro() {
	for (let y = 0; y < 5; y++) {
		for (let x = 0; x < 5; x++) {
			console.log('Tabuleiro: ', tabuleiro[y][x]);
		}
	}
}

function verificarEmpate() {
	let contTotalJogadas = 0;

	for (let y = 0; y < 5; y++) {
		for (let x = 0; x < 5; x++) {
			if (tabuleiro[y][x] != ' ') {
				contTotalJogadas++;
			}
		}
	}

	if (contTotalJogadas == 25) {
		return true;
	} else {
		return false;
	}
}

function verificarGanhador(simbolo) {
	let contLinha = 0,
		contColuna = 0,
		contDiagonalPrincipal = 0,
		contDiagonalSecundaria = 0;

	for (let y = 0; y < 5; y++) {
		for (let x = 0; x < 5; x++) {
			contLinha = 0;
			contColuna = 0;
			for (x = 0; x < 5; x++) {
				if (tabuleiro[y][x] == simbolo) {
					contLinha++;
				}
				if (tabuleiro[x][y] == simbolo) {
					contColuna++;
				}
				if (y == x) {
					if (tabuleiro[y][x] == simbolo) {
						contDiagonalPrincipal;
					}
				}
				if (y + x == 4) {
					if (tabuleiro[y][x] == simbolo) {
						contDiagonalSecundaria++;
					}
				}
			}
			if (contLinha == 3 || contColuna == 3 || contDiagonalPrincipal == 3 || contDiagonalSecundaria == 3) {
				return true;
			}
		}
		return false;
	}

	function realizarJogada(jogador, simbolo) {
		let linha = 0,
			coluna = 0,
			linhaJogada = 0,
			colunaJogada = 0,
			jogadaValida = false;

		do {
			console.log('Jogador 1', `${jogador}`, simbolo);

			if (linhaJogada == 1 && colunaJogada == 1) {
				linha = 0;
				coluna = 0;
			} else if (linhaJogada == 1 && colunaJogada == 2) {
				linha = 0;
				coluna = 2;
			} else if (linhaJogada == 1 && colunaJogada == 3) {
				linha = 0;
				coluna = 4;
			} else if (linhaJogada == 2 && colunaJogada == 1) {
				linha = 2;
				coluna = 0;
			} else if (linhaJogada == 2 && colunaJogada == 2) {
				linha = 2;
				coluna = 2;
			} else if (linhaJogada == 2 && colunaJogada == 3) {
				linha = 2;
				coluna = 4;
			} else if (linhaJogada == 3 && colunaJogada == 1) {
				linha = 4;
				coluna = 0;
			} else if (linhaJogada == 3 && colunaJogada == 2) {
				linha = 4;
				coluna = 2;
			} else if (linhaJogada == 3 && colunaJogada == 3) {
				linha = 4;
				coluna = 4;
			}

			if (
				tabuleiro[linha][coluna] != '' ||
				linhaJogada < 1 ||
				linhaJogada > 3 ||
				colunaJogada < 1 ||
				colunaJogada > 3
			) {
				jogadaValida = false;
			} else {
				tabuleiro[linha][coluna] = simbolo;
				jogadaValida = true;
			}
		} while (jogadaValida == false);
	}
}
