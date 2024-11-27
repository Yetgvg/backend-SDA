import { Router } from "express";
import { TermoController } from '../controllers';

const routes = Router();

routes.post('/criar', TermoController.criar);
routes.get('/listar', TermoController.listar);
routes.get('/listar/:id', TermoController.obterPorId);
routes.put('/atualizar/:id', TermoController.atualizar);
routes.delete('/deletar/:id', TermoController.excluir);

export default routes;
