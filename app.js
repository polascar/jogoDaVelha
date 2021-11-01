import express from 'express';
import router from './routes.js';

const initializeApp = async () => {
	const app = express();

	app.use(express.json());
	app.use(router);

	app.listen(3000, () => {
		console.log('Example app listening on port 3000!');
	});
};

initializeApp();
