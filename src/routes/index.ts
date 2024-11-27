import { Router } from "express";
import TermoRoutes from './termoRoutes'; 
import HistoricoConsentimentoRoutes from './historicoConsentimentoRoutes';
import NotificacaoRoutes from './notificacaoRoutes';
import BackupRoutes from './backupRoutes';

const router = Router();

router.use("/termo", TermoRoutes); 
router.use("/historicoConsentimento", HistoricoConsentimentoRoutes); 
router.use("/notificacao", NotificacaoRoutes); 
router.use("/backup", BackupRoutes); 


export default router;
