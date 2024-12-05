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
      // Obtenha o código secreto do .env
      // const codigo = process.env.SECRET_CODE; 
      // if (!codigo) {
      //   throw new Error('Código secreto não encontrado no ambiente.');
      // }
  
      // Enviar a requisição para o backend primário
      const resposta = await axios.post(`http://localhost:3002/exportacao/portabilidade`, {
        email,
        senha,
      });
      console.log(resposta.data);
      
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
        // Alterado para retornar uma resposta mais informativa
        return { message: 'Usuário já existe no sistema secundário.' };
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
      console.error('Erro ao importar usuário:', error);
      // Retornar um erro mais claro, sem usar throw
      return { error: 'Erro ao realizar a portabilidade do usuário.', details: error };
    }
  }
}

export default new EsquecerService();
