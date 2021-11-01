import { json } from 'express';

class StateError extends Error {
	constructor(message) {
		super(message);
	}
}

class State {
	constructor() {
		this.state = {};
		this.ultimoJogador = '';
	}

	getStatus(posicao, simbolo) {
		posicao = [ 'P11', 'P12', 'P13', 'P21', 'P22', 'P23', 'P31', 'P32', 'P33' ];

		if (this.state[posicao] >= this.state[posicao]) {
			console.log(`Empate`);
		} else if (this.state[posicao] == simbolo && simbolo > 3) {
			console.log(`Vencedor ${simbolo}`);
		} else {
			console.log(`Jogo em andamento`);
		}
	}

	getGameState(posicao, simbolo) {
		// posicao = { P11: P11, P12: P12, P13: P13, P21: P21, P22: P22, P23: P23, P31: P31, P32: P32, P33: P33 };
		// if (posicao > posicao) {
		// } else
		if (![ 'P11', 'P12', 'P13', 'P21', 'P22', 'P23', 'P31', 'P32', 'P33' ].includes(this.state[posicao])) {
			//posicao != posicao
			console.log(`Posição inválida, envie apenas P11', 'P12', 'P13', 'P21', 'P22', 'P23', 'P31', 'P32', 'P33'`);
		} else {
			console.log(`Posição ${posicao} já utilizada, use outra posição.`);
			// throw new StateError
		}
		// this.state;
	}

	resetGameState() {
		this.state = {};
	}

	setJogada(posicao, simbolo) {
		if (![ 'O', 'X' ].includes(simbolo)) {
			throw new StateError(`Símbolo inválido, envie 'O' ou 'X'`);
		} else if (this.state[posicao]) {
			throw new StateError(`Posição ${posicao} já existe, envie outra posição.`);
		}
		if (simbolo === this.ultimoJogador) {
			throw new StateError(`O jogador '${simbolo}' já jogou, é a vez do próximo jogador.`);
		}
		this.state[posicao] = simbolo;
		this.ultimoJogador = simbolo;
	}
}

const state = new State();

export { StateError, state };
