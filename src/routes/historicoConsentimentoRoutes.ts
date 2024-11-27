import { Router } from 'express';
import { HistoricoConsentimentoController } from '../controllers';

const router = Router();

router.post('/criar', HistoricoConsentimentoController.criar);
router.get('/listar', HistoricoConsentimentoController.listar);
router.get('/listar/:id', HistoricoConsentimentoController.obterPorId);
router.put('/atualizar/:id', HistoricoConsentimentoController.atualizar);
router.delete('/deletar/:id', HistoricoConsentimentoController.excluir);

export default router;
