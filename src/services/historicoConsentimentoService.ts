import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class historicoConsentimentoService {
  // Cria um novo histórico de consentimento
  async criarHistoricoConsentimento(id_usuario: string, id_termo: string, aceito: boolean, confirmado: boolean) {
    try {
      const consentimento = await prisma.historicoConsentimento.create({
        data: {
          id_usuario,
          id_termo,
          aceito,
          confirmado,
        },
      });
      return consentimento;
    } catch (error) {
      throw new Error('Erro ao criar histórico de consentimento: ' + error);
    }
  }

  // Lista todos os históricos de consentimento
  async listarHistoricos() {
    try {
      const consentimentos = await prisma.historicoConsentimento.findMany();
      return consentimentos;
    } catch (error) {
      throw new Error('Erro ao listar históricos de consentimento: ' + error);
    }
  }

  // Obtém o histórico de consentimento por ID
  async obterHistoricoPorId(id: string) {
    try {
      const consentimento = await prisma.historicoConsentimento.findUnique({
        where: { id },
      });
      return consentimento;
    } catch (error) {
      throw new Error('Erro ao obter histórico de consentimento: ' + error);
    }
  }

  // Atualiza o consentimento, alterando o valor de 'aceito'
  async atualizarHistorico(id: string, aceito: boolean) {
    try {
      const consentimentoAtualizado = await prisma.historicoConsentimento.update({
        where: { id },
        data: { aceito },
      });
      return consentimentoAtualizado;
    } catch (error) {
      throw new Error('Erro ao atualizar histórico de consentimento: ' + error);
    }
  }

  // Exclui o consentimento com o ID fornecido
  async excluirHistorico(id: string) {
    try {
      const consentimentoExcluido = await prisma.historicoConsentimento.delete({
        where: { id },
      });
      return consentimentoExcluido;
    } catch (error) {
      throw new Error('Erro ao excluir histórico de consentimento: ' + error);
    }
  }

  async verificarTermosPendentes(id_usuario: string) {
    try {
      const termoMaisRecente = await prisma.termo.findFirst({
        orderBy: {
          data_criacao: 'desc',
        },
      });
  
      console.log('Termo mais recente encontrado:', termoMaisRecente);  // Log do termo encontrado
  
      if (!termoMaisRecente) return null;
  
      const consentimento = await prisma.historicoConsentimento.findFirst({
        where: {
          id_usuario,
          id_termo: termoMaisRecente.id,
          confirmado: true, // Verifique se o campo 'confirmado' existe no seu modelo
        },
      });
  
      console.log('Consentimento encontrado:', consentimento);  // Log do consentimento encontrado
  
      return consentimento ? null : termoMaisRecente;
    } catch (error) {
      console.error('Erro ao verificar termos pendentes:', error);
      throw new Error('Erro ao verificar termos pendentes: ' + error);
    }
  }
  
  
}

export default new historicoConsentimentoService();
