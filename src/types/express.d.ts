// src/types/express.d.ts

import { Usuario } from '@prisma/client';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: Usuario; // Usando 'user' ao invés de 'usuario'
    }
  }
}
