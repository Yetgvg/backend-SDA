// src/routes/authRoutes.ts
import { Router } from 'express';
import { LoginController } from '../controllers';

const router = Router();

// Rota para login (autenticação de usuários)
router.post('/login', LoginController.login);

export default router;
