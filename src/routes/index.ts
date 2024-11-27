import { Router } from "express";
import TermoRoutes from './termoRoutes'; 
import HistoricoConsentimentoRoutes from './historicoConsentimentoRoutes';
import NotificacaoRoutes from './notificacaoRoutes';

const router = Router();

router.use("/termo", TermoRoutes); 
router.use("/historicoConsentimento", HistoricoConsentimentoRoutes); 
router.use("/notificacao", NotificacaoRoutes); 

export default router;
