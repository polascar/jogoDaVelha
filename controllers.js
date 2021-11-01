import { StateError, state } from './script.js';

/**
 * 
 * DESCRIÇÃO NO DESAFIO:
 * A API RESTful deverá responder as seguintes requisições: 
 * Para saber o status do jogo 
 * input -> GET http://localhost/status 
 * output -> P22 - X 
 *          P11 - O 
 *          P13 - X 
 *          P31 - O 
 * Status - (Em andamento, Empate ou Vitória de X|O) 
 * 
 * @param {Express.Request} req - Objeto do tipo Request recebido do framework Express.
 * @param {Express.Response} res - Objeto do tipo Response recebido do framework Express.
 */
export const status = async (req, res) => {
	res.status(200).json({
		status: 'ok',
		data: {
			...state.getGameState(),
			...state.getStatus()
		}
	});
};

/**
 * 
 * DESCRIÇÃO NO DESAFIO:
 * Para iniciar o jogo ou realizar uma jogada 
 * input -> POST http://localhost/jogada 
 *          corpo da submissão {"jogador": "O", "posicao": "P22"} 
 * output -> Jogador - O 
 *           Jogada - P22 
 * 
 * @param {Express.Request} req - Objeto do tipo Request recebido do framework Express.
 * @param {Express.Response} res - Objeto do tipo Response recebido do framework Express.
 */
export const jogada = async (req, res) => {
	try {
		state.setJogada(req.body.posicao, req.body.jogador);

		res.status(200).json({
			data: {
				jogada: req.body.posicao,
				jogador: req.body.jogador
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

/** 
 * DESCRIÇÃO NO DESAFIO:
 * input -> DELETE http://localhost/reiniciar 
 * output -> Jogo reiniciado
 * 
 * @param {Express.Request} req - Objeto do tipo Request recebido do framework Express.
 * @param {Express.Response} res - Objeto do tipo Response recebido do framework Express.
 */
export const reiniciar = async (req, res) => {
	state.resetGameState();

	res.status(200).json({
		status: 'ok',
		data: {
			message: 'Jogo reiniciado'
		}
	});
};
