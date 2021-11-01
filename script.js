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
		if (this.state[posicao] >= this.state[posicao]) {
			return {
				status: `Empate, jogo encerrado.`
			};
		} else if (this.state[posicao] == simbolo && simbolo > 3) {
			return {
				status: `Vencedor ${simbolo}`
			};
		} else {
			return {
				status: `Jogo em andamento.`
			};
		}
	}

	getGameState(posicao, simbolo) {
		if (posicao && simbolo) {
			return {
				status: `O ${this.state.posicao} fez ${this.state.simbolo}.`
			};
		}
		return this.state;
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

		if (![ 'P11', 'P12', 'P13', 'P21', 'P22', 'P23', 'P31', 'P32', 'P33' ].includes(posicao)) {
			throw new StateError(
				`Posição inválida, envie apenas P11', 'P12', 'P13', 'P21', 'P22', 'P23', 'P31', 'P32', 'P33'`
			);
		} else {
			throw new StateError(`Posição ${posicao} já utilizada, use outra posição.`);
		}
	}
}

const state = new State();

export { StateError, state };
