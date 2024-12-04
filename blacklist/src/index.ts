import express from 'express';
import esquecerController from './controllers/esquecerController';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

// Rota para esquecer o usuário
app.post('/esquecer', esquecerController.criar);
app.get('/listar', esquecerController.listar);
app.post('/importar', esquecerController.importarUsuario);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
