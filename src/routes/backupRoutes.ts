import { Router } from 'express';
import { BackupController } from '../controllers';

const router = Router();

router.post('/criar', BackupController.criar);
router.get('/listar', BackupController.listar);
router.get('/listar/:id', BackupController.obterPorId);
router.delete('/deletar/:id', BackupController.excluir);

export default router;
