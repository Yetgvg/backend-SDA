import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ExportacaoService {
  async criarExportacao(id_usuario: string, formato: string) {
    const exportacao = await prisma.exportacao.create({
      data: {
        id_usuario,
        formato,
      },
    });
    return exportacao;
  }

  async listarExportacoes() {
    const exportacoes = await prisma.exportacao.findMany();
    return exportacoes;
  }

  async obterExportacaoPorId(id: string) {
    const exportacao = await prisma.exportacao.findUnique({
      where: { id },
    });
    return exportacao;
  }

  async excluirExportacao(id: string) {
    const exportacaoExcluida = await prisma.exportacao.delete({
      where: { id },
    });
    return exportacaoExcluida;
  }
}

export default new ExportacaoService();
