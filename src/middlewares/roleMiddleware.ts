// src/middlewares/roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { session } from '../context';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const usuario = session.get('usuario');  // Acessando o usuário do contexto
    console.log('Usuário no middleware de autorização:', usuario);
    console.log(usuario)

    if (!usuario || !roles.includes(usuario.role)) {
      res.status(403).json({ error: 'Acesso negado, Usuário sem permissão' });
      return;
    }

    next();
  };
};
