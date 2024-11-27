import { Router } from 'express';
import { BackupController } from '../controllers';

const router = Router();

router.post('/', BackupController.criar);
router.get('/', BackupController.listar);
router.get('/:id', BackupController.obterPorId);
router.delete('/:id', BackupController.excluir);

export default router;
