import { StateError, state } from './script.js';

export const status = async (req, res) => {
	res.status(200).json({
		status: 'ok',
		data: {
			...state.getGameState(),
			...state.getStatus()
		}
	});
};

export const jogada = async (req, res) => {
	try {
		state.setJogada(req.body.posicao, req.body.jogador);

		res.status(200).json({
			status: 'ok',
			data: {
				jogador: req.body.jogador,
				jogada: req.body.posicao
			}
		});
	} catch (error) {
		if (error instanceof StateError) {
			res.status(500).json({
				status: 'error',
				error: error.message
			});
		} else {
			throw error;
		}
	}
};

export const reiniciar = async (req, res) => {
	state.resetGameState();

	res.status(200).json({
		status: 'ok',
		data: {
			message: 'Jogo reiniciado'
		}
	});
};
