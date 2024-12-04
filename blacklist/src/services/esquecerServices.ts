import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

class EsquecerService {
  async criarEsquecido(id_usuario: string, motivo: string) {
    return await prisma.blacklist.create({
      data: {
        id_usuario,
        motivo,
      },
    });
  }

  async listarEsquecidos() {
    return await prisma.blacklist.findMany();
  }

  async importarUsuario(email: string, senha: string) {
    try {
      // Enviar a requisição para o backend primário
      const resposta = await axios.post('http://localhost:3000/exportacao/portabilidade', {
        email,
        senha,
      });
      console.log(resposta.data)
      
      const dadosUsuario = resposta.data;

      if (!dadosUsuario) {
        throw new Error('Não foi possível obter os dados do usuário do backend primário.');
      }

      // Verificar se o usuário já existe no banco secundário
      const usuarioExistente = await prisma.usuario.findFirst({
        where: {
          OR: [{ email: dadosUsuario.email }, { cpf: dadosUsuario.cpf }],
        },
      });

      if (usuarioExistente) {
        throw new Error('Usuário já existe no sistema secundário.');
      }

      // Criar o novo usuário no banco secundário
      const usuarioCriado = await prisma.usuario.create({
        data: {
          id: dadosUsuario.id,
          nome: dadosUsuario.nome,
          email: dadosUsuario.email,
          senha: dadosUsuario.senha,
          telefone: dadosUsuario.telefone || null,
          cpf: dadosUsuario.cpf,
          data_criacao: dadosUsuario.data_criacao,
          data_atualizacao: dadosUsuario.data_atualizacao,
        },
      });

      return usuarioCriado;
    } catch (error) {
      console.error('Erro ao importar usuário:');
      throw new Error('Erro ao realizar a portabilidade do usuário.');
    }
  }
}

export default new EsquecerService();
