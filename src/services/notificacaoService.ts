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

  async criarNotificacaoAutomatica(evento: string) {
    // Definindo as mensagens predefinidas com base no tipo de evento
    const mensagensPredefinidas: Record<string, string> = {
      "DADOS_ALTERADOS":
        "Seus dados pessoais foram alterados com sucesso.\n" +
        "Se não foi você, acesse imediatamente sua conta.",
      "DADOS_ACESSO_NAO_AUTORIZADO":
        "Detectamos um acesso não autorizado aos seus dados pessoais.\n" +
        "Revise suas informações.",
      "INCIDENTE_SEGURANCA":
        "Informamos que identificamos um incidente de segurança envolvendo seus dados pessoais armazenados em nossa plataforma.\n" +
        "Embora as medidas de segurança aplicadas sejam rigorosas, foi constatada a possibilidade de acesso não autorizado aos seus dados.\n" +
        "Temos o compromisso de notificar você imediatamente e orientar quanto à alteração da senha.\n" +
        "Estamos reforçando nossas medidas de segurança para evitar que situações semelhantes ocorram novamente.",
    };

    // Mensagem padrão se o evento não for reconhecido
    const mensagem = mensagensPredefinidas[evento] || "Uma ação foi registrada em relação aos seus dados pessoais.";

    // Buscar todos os usuários ativos
    const usuarios = await prisma.usuario.findMany({
      select: { id: true, email: true },
    });

    if (!usuarios || usuarios.length === 0) {
      throw new Error("Nenhum usuário encontrado para envio de notificações.");
    }

    // Criar notificações e enviar e-mails
    const notificacoesPromises = usuarios.map(async (usuario) => {
      // Criar notificação no banco de dados
      await prisma.notificacao.create({
        data: {
          id_usuario: usuario.id,
          mensagem,
        },
      });

      // Verificar se o e-mail do usuário está presente antes de enviar
      if (usuario.email) {
        const assunto = "Notificação sobre seus dados pessoais";
        await emailService.enviarEmail(usuario.email, assunto, mensagem);
      }
    });

    // Aguardar todas as operações de notificação serem concluídas
    await Promise.all(notificacoesPromises);

    return {
      sucesso: true,
      mensagem: `Notificações enviadas para ${usuarios.length} usuários.`,
    };
  }

}

export default new NotificacaoService();
