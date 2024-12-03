import { PrismaClient } from '@prisma/client';

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

}

export default new EsquecerService();
