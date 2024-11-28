import { Router } from 'express';
import { BackupController } from '../controllers';

const router = Router();

// router.post('/criar', BackupController.criar);
// router.get('/listar', BackupController.listar);
// router.get('/listar/:id', BackupController.obterPorId);
// router.delete('/deletar/:id', BackupController.excluir);
router.post('/tudo', BackupController.criarBackupDeTudo);
router.post('/separado', BackupController.criarBackupSeparado);
router.get('/', BackupController.listarBackups);
router.get('/:id', BackupController.obterBackupPorId);
router.delete('/id', BackupController.excluirBackup);


export default router;
