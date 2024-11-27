// src/services/termoService.ts
import { PrismaClient, Termo } from '@prisma/client';

const prisma = new PrismaClient();

class TermoService {
  // Criar um novo termo
  async criarTermo(versao: number, itens_obrigatorios: any, itens_opcionais: any): Promise<Termo> {
    return prisma.termo.create({
      data: {
        versao,
        itens_obrigatorios,
        itens_opcionais,
      },
    });
  }

  // Listar todos os termos
  async listarTermos(): Promise<Termo[]> {
    return prisma.termo.findMany();
  }

  // Obter um termo pelo ID
  async obterTermoPorId(id: string): Promise<Termo | null> {
    return prisma.termo.findUnique({
      where: {
        id,
      },
    });
  }

  // Atualizar um termo existente
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

  // Excluir um termo pelo ID
  async excluirTermo(id: string): Promise<Termo> {
    return prisma.termo.delete({
      where: {
        id,
      },
    });
  }
}

export default new TermoService();
