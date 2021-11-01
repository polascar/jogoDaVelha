import { Router } from 'express';
import { status, jogada, reiniciar } from './controllers.js';

const router = Router();

router.get('/status', status);
router.post('/jogada', jogada);
router.delete('/reiniciar', reiniciar);

export default router;
