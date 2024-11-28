// routes/usuarioRoutes.ts
import { Router } from 'express';
import { UsuarioController } from '../controllers';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

router.post('/criar', UsuarioController.criar);
// router.get('/listar', authenticate, authorize(['admin', 'rh']), UsuarioController.listarUsuario);
router.get('/listar', authenticate, authorize(['ADMIN', 'RH', 'TI']), UsuarioController.listarTodos);
router.get('/listarAtivos',  authenticate, authorize(['ADMIN', 'RH', 'TI']), UsuarioController.listarTodosAtivos);
router.get('/listar/:id',  authenticate, authorize(['ADMIN', 'RH', 'TI']), UsuarioController.listarUsuario);
router.put('/atualizar/:id',  authenticate, authorize(['ADMIN', 'RH', 'TI']), UsuarioController.atualizar);
router.delete('/deletar/:id',  authenticate, authorize(['ADMIN', 'TI']), UsuarioController.excluir);
router.patch('/:id/inativar',  authenticate, authorize(['ADMIN', 'RH', 'TI']), UsuarioController.inativar);

export default router;
