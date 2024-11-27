import { Router } from 'express';
import { ExportacaoController } from '../controllers';

const router = Router();

router.post('/criar', ExportacaoController.criar);
router.get('/listar', ExportacaoController.listar);
router.get('/listar/:id', ExportacaoController.obterPorId);
router.delete('/deletar/:id', ExportacaoController.excluir);

export default router;