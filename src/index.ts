import express from "express";
import router from './routes';
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
app.use(router);
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

async function verificarEExcluirUsuariosNaBlacklist() {
  try {
    // Consulta a lista de usuários na blacklist
    const usuariosBlacklist = await axios.get('http://localhost:3002/listar');
    
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