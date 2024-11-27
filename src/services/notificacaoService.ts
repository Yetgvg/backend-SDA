import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class NotificacaoService {
  async criarNotificacao(id_usuario: string, mensagem: string) {
    const notificacao = await prisma.notificacao.create({
      data: {
        id_usuario,
        mensagem,
      },
    });
    return notificacao;
  }

  async listarNotificacoes() {
    const notificacoes = await prisma.notificacao.findMany();
    return notificacoes;
  }

  async obterNotificacaoPorId(id: string) {
    const notificacao = await prisma.notificacao.findUnique({
      where: { id },
    });
    return notificacao;
  }

  async atualizarNotificacao(id: string, lida: boolean) {
    const notificacaoAtualizada = await prisma.notificacao.update({
      where: { id },
      data: { lida },
    });
    return notificacaoAtualizada;
  }

  async excluirNotificacao(id: string) {
    const notificacaoExcluida = await prisma.notificacao.delete({
      where: { id },
    });
    return notificacaoExcluida;
  }
}

export default new NotificacaoService();
