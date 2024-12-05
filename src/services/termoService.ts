import { PrismaClient, Termo } from '@prisma/client';

const prisma = new PrismaClient();

class TermoService {
  async criarTermo(versao: number, itens_obrigatorios: any, itens_opcionais: any): Promise<Termo> {
    return prisma.termo.create({
      data: {
        versao,
        itens_obrigatorios,
        itens_opcionais,
      },
    });
  }

  async listarTermos(): Promise<Termo[]> {
    return prisma.termo.findMany({
      orderBy: {
        data_criacao: 'desc', // Ordena pela data mais recente
      },
      take: 1, // Retorna apenas o termo mais recente
    });
  }

  async obterTermoPorId(id: string): Promise<Termo | null> {
    return prisma.termo.findUnique({
      where: {
        id,
      },
    });
  }

  async atualizarTermo(id: string, versao: number, itens_obrigatorios: any, itens_opcionais: any): Promise<Termo> {
    return prisma.termo.update({
      where: {
        id,
      },
      data: {
        versao,
        itens_obrigatorios,
        itens_opcionais,
      },
    });
  }

  async excluirTermo(id: string): Promise<Termo> {
    return prisma.termo.delete({
      where: {
        id,
      },
    });
  }
  
}

export default new TermoService();
