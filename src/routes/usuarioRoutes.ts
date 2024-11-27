// routes/usuarioRoutes.ts
import { Router } from 'express';
import { UsuarioController } from '../controllers';

const router = Router();

router.post('/criar', UsuarioController.criar);
router.get('/listar', UsuarioController.listarTodos);
router.get('/listarAtivos', UsuarioController.listarTodosAtivos);
router.get('/listar/:id', UsuarioController.listarUsuario);
router.put('/atualizar/:id', UsuarioController.atualizar);
router.delete('/deletar/:id', UsuarioController.excluir);
router.patch('/:id/inativar', UsuarioController.inativar);

export default router;
