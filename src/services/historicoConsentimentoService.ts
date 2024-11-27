import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class HistoricoConsentimentoService {
  async criarHistoricoConsentimento(id_usuario: string, id_termo: string, aceito: boolean) {
    const consentimento = await prisma.historicoConsentimento.create({
      data: {
        id_usuario,
        id_termo,
        aceito,
      },
    });
    return consentimento;
  }

  async listarHistoricos() {
    const consentimentos = await prisma.historicoConsentimento.findMany();
    return consentimentos;
  }

  async obterHistoricoPorId(id: string) {
    const consentimento = await prisma.historicoConsentimento.findUnique({
      where: { id },
    });
    return consentimento;
  }

  async atualizarHistorico(id: string, aceito: boolean) {
    const consentimentoAtualizado = await prisma.historicoConsentimento.update({
      where: { id },
      data: { aceito },
    });
    return consentimentoAtualizado;
  }

  async excluirHistorico(id: string) {
    const consentimentoExcluido = await prisma.historicoConsentimento.delete({
      where: { id },
    });
    return consentimentoExcluido;
  }
}

export default new HistoricoConsentimentoService();
