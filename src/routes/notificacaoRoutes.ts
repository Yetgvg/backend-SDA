import { Router } from 'express';
import { NotificacaoController }from '../controllers';

const router = Router();

router.post('/criar', NotificacaoController.criar);
router.get('/listar', NotificacaoController.listar);
router.get('/listar/:id', NotificacaoController.obterPorId);
router.put('/atualizar/:id', NotificacaoController.atualizar);
router.delete('/deletar/:id', NotificacaoController.excluir);

export default router;
