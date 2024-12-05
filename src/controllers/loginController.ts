import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { decryptAES } from '../utils/crypto'; // Usando sua função de descriptografia
import historicoConsentimentoService from '../services/historicoConsentimentoService';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'chave-secreta-padrao'; // A chave secreta para o JWT

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      // Buscar o usuário pelo email
      const usuario = await prisma.usuario.findUnique({
        where: { email: email },
      });

      if (!usuario) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      if (usuario.esquecido === true) {
        res.status(404).json({ error: 'Este usuário não tem mais acesso às informações' });
        return;
      }

      // Descriptografar a senha armazenada no banco de dados
      const senhaCriptografada = decryptAES(usuario.senha); // Descriptografa a senha armazenada

      // Comparar a senha informada com a senha descriptografada
      if (senha !== senhaCriptografada) {
        res.status(401).json({ error: 'Senha incorreta' });
        return;
      }

      // Gerar o token JWT
      const token = jwt.sign(
        { id: usuario.id, role: usuario.role },
        SECRET_KEY,
        { expiresIn: '1h' } // O token expira em 1 hora
      );

      // Verificar se há termos pendentes
      const termoPendente = await historicoConsentimentoService.verificarTermosPendentes(usuario.id);

      if (termoPendente) {
        // Se não aceitou os novos termos, retornar o token e o termo
        res.status(200).json({
          status: 'pendente',
          mensagem: 'Você precisa aceitar os termos mais recentes antes de continuar.',
          termo: termoPendente,
          token, // Envia o token para autenticar as requisições subsequentes
          idUsuario: usuario.id, // Envia o ID do usuário para identificação
        });
        return;
      }

      // Retornar o token junto com os dados do usuário para casos normais
      res.status(200).json({
        token,
        idUsuario: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }
}

export default new LoginController();
