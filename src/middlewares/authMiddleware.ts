// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { session } from '../context';  // Importando o contexto

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'chave-secreta-padrao';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  // Verifica se o token é válido
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      res.status(403).json({ error: 'Token inválido' });
      return;
    }

    // Verifica se o 'decoded' é um objeto e contém as propriedades esperadas
    if (decoded && typeof decoded !== 'string') {
      console.log('Token Decoded:', decoded);
      // Inicia o contexto antes de acessar a sessão
      session.run(() => {
        session.set('usuario', decoded);  // Armazenando o usuário no contexto
        next();
      });
    } else {
      console.error('Invalid token structure:', decoded);
      res.status(403).json({ error: 'Token inválido' });
    }
  });
};
