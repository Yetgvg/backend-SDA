import express from "express";
import router from './routes';
import { authenticate } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});