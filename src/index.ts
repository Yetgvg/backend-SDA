import express from "express";
import cors from "cors";
import router from './routes';
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const allowedOrigins = ['http://localhost:3000']; // Substitua com o domínio do seu frontend, se necessário
app.use(
  cors({
    origin: allowedOrigins, // Permitir apenas o domínio do frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
    credentials: true, // Permitir o envio de cookies/credenciais, se necessário
  })
);

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3002;

async function verificarEExcluirUsuariosNaBlacklist() {
  try {
    // Consulta a lista de usuários na blacklist
    const usuariosBlacklist = await axios.get('http://localhost:3003/listar');
    
    // Para cada usuário na blacklist
    for (const usuarioBlacklist of usuariosBlacklist.data) {
      // Verifica se o usuário ainda existe no banco de dados principal
      const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioBlacklist.id_usuario }
      });

      // Se o usuário existir, então delete
      if (usuario) {
        console.log(`Excluindo usuário: ${usuario.id}`);
        await prisma.usuario.delete({
          where: { id: usuario.id }
        });
      } else {
        console.log(`Usuário com id ${usuarioBlacklist.id_usuario} não encontrado no banco principal (Já foi excluído).`);
      }
    }
  } catch (error) {
    console.error('Erro ao verificar e excluir usuários na blacklist:', error);
  }
}

// Chama a função automaticamente ao iniciar o servidor
(async () => {
  await verificarEExcluirUsuariosNaBlacklist();
})();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});