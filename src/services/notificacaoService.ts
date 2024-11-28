import { PrismaClient } from '@prisma/client';
import emailService from './emailService';

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

  async criarNotificacaoAutomatica(id_usuario: string, evento: string) {
    const mensagensPredefinidas: Record<string, string> = {
      "DADOS_ALTERADOS": "Seus dados pessoais foram alterados com sucesso. Se não foi você acesse imediatamente sua conta.",
      "DADOS_ACESSO_NAO_AUTORIZADO": "Detectamos um acesso não autorizado aos seus dados pessoais. Revise suas informações.",
      "INCIDENTE_SEGURANCA": "Um incidente de segurança foi identificado e pode ter afetado seus dados pessoais. Estamos investigando.",
    };

    const mensagem = mensagensPredefinidas[evento] || "Uma ação foi registrada em relação aos seus dados pessoais.";

    const notificacao = await prisma.notificacao.create({
      data: {
        id_usuario,
        mensagem,
      },
    });

    const usuario = await prisma.usuario.findUnique({
      where: { id: id_usuario },
      select: { email: true },
    });

    if (!usuario || !usuario.email) {
      throw new Error('Usuário não encontrado ou sem e-mail associado.');
    }

    const assunto = "Notificação sobre seus dados pessoais";
    await emailService.enviarEmail(usuario.email, assunto, mensagem);

    return notificacao;
  }
}

export default new NotificacaoService();
