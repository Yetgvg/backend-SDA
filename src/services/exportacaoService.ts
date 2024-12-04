import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';
import { decryptAES } from '../utils/crypto';

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

  async gerarPDF(id_usuario: string) {
    // Buscar dados do usuário
    const usuario = await prisma.usuario.findUnique({
      where: { id: id_usuario },
      include: {
        consentimentos: true,
        notificacoes: true,
        exportacoes: true,
      },
    });
  
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
  
    // Descriptografar dados sensíveis
    const telefone = usuario.telefone ? decryptAES(usuario.telefone) : 'Não informado';
    const cpf = usuario.cpf ? usuario.cpf : 'Não informado';
  
    // Criar o PDF
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
  
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      return pdfBuffer;
    });
  
    // Adicionar conteúdo ao PDF
    doc.fontSize(20).text('Dados Pessoais - Portabilidade', { align: 'center' });
    doc.moveDown();
  
    doc.fontSize(12).text(`Nome: ${usuario.nome}`);
    doc.text(`Email: ${usuario.email}`);
    doc.text(`Telefone: ${telefone}`);
    doc.text(`CPF: ${cpf}`);
    doc.moveDown();
  
    doc.fontSize(16).text('Histórico de Consentimentos:');
    usuario.consentimentos.forEach((item, index) => {
      doc.fontSize(12).text(`${index + 1}. Termo: ${item.id_termo}, Aceito: ${item.aceito}`);
    });
    doc.moveDown();
  
    doc.fontSize(16).text('Notificações:');
    usuario.notificacoes.forEach((item, index) => {
      doc.fontSize(12).text(`${index + 1}. Mensagem: ${item.mensagem}, Lida: ${item.lida}`);
    });
    doc.moveDown();
  
    doc.fontSize(16).text('Exportações Realizadas:');
    usuario.exportacoes.forEach((item, index) => {
      doc.fontSize(12).text(`${index + 1}. Formato: ${item.formato}, Data: ${item.data_exportacao}`);
    });
  
    doc.end();
  
    // Retornar buffer concatenado
    return new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });
  }

  async listarUsuario(email: string, senha: string) {
    // Buscar o usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: {
        consentimentos: true,
        notificacoes: true,
        exportacoes: true,
      },
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    if (usuario.esquecido) {
      throw new Error('Este usuário não tem mais acesso às informações');
    }

    // Descriptografar a senha armazenada no banco de dados
    const senhaCriptografada = decryptAES(usuario.senha);

    // Comparar a senha informada com a senha descriptografada
    if (senha !== senhaCriptografada) {
      throw new Error('Senha incorreta');
    }

    // Descriptografar dados sensíveis, como telefone
    const telefone = usuario.telefone ? decryptAES(usuario.telefone) : null;

    // Retornar os dados completos do usuário
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      telefone,
      cpf: usuario.cpf,
      esquecido: usuario.esquecido,
      data_criacao: usuario.data_criacao,
      data_atualizacao: usuario.data_atualizacao,
      senha: usuario.senha
    };
  }
}

export default new ExportacaoService();
