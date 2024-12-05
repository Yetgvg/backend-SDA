import express from 'express';
import esquecerController from './controllers/esquecerController';
import cors from "cors";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3003;

const allowedOrigins = ['http://localhost:3000']; // Substitua com o domínio do seu frontend, se necessário
app.use(
  cors({
    origin: allowedOrigins, // Permitir apenas o domínio do frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
    credentials: true, // Permitir o envio de cookies/credenciais, se necessário
  })
);

// Rota para esquecer o usuário
app.post('/esquecer', esquecerController.criar);
app.get('/listar', esquecerController.listar);
app.post('/importar', esquecerController.importarUsuario);
// app.post('/importar/:codigo', esquecerController.importarUsuario);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
