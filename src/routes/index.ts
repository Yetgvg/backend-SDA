import { Router } from "express";
import TermoRoutes from './termoRoutes'; 
import HistoricoConsentimentoRoutes from './historicoConsentimentoRoutes';
import NotificacaoRoutes from './notificacaoRoutes';
import BackupRoutes from './backupRoutes';
import ExportacaoRoutes from './exportacaoRoutes';
import UsuarioRoutes from './usuarioRoutes';
import LoginRoutes from './loginRoutes';

const router = Router();

router.use("/termo", TermoRoutes); 
router.use("/historicoConsentimento", HistoricoConsentimentoRoutes); 
router.use("/notificacao", NotificacaoRoutes); 
router.use("/backup", BackupRoutes); 
router.use("/exportacao", ExportacaoRoutes); 
router.use("/termo", TermoRoutes);  // Passa as rotas configuradas para o Express
router.use("/usuarios", UsuarioRoutes)
router.use("/auth", LoginRoutes)

export default router;