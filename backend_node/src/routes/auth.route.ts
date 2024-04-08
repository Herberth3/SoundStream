import { Router } from 'express'
import {insertarUsuario, login, healthy } from '../controllers/auth.controller'

const router = Router();

router.post('/signup', insertarUsuario);
router.post('/login', login);

router.get('/ping', healthy);

export default router;
