import { Router, Request, Response } from "express";
import TermoRoutes from './termoRoutes'; // Certifique-se de importar o router configurado corretamente

const router = Router();

// Aqui você vincula o grupo de rotas '/termo' ao router
router.use("/termo", TermoRoutes);  // Passa as rotas configuradas para o Express

export default router;
