import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import { decryptAES, encryptAES } from '../utils/crypto';

dotenv.config();

const prisma = new PrismaClient();
const AES_SECRET_KEY = process.env.AES_SECRET_KEY || 'default_key';

class BackupService {
  private encryptData(data: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', AES_SECRET_KEY, Buffer.alloc(16, 0));
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    return encrypted.toString('base64');
  }

  private decryptData(data: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', AES_SECRET_KEY, Buffer.alloc(16, 0));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]);
    return decrypted.toString('utf8');
  }

  private async exportTableData(tableName: string): Promise<string> {
    let data;
    switch (tableName) {
      case 'Usuario':
        data = await prisma.usuario.findMany();
        break;
      case 'Termo':
        data = await prisma.termo.findMany();
        break;
      case 'HistoricoConsentimento':
        data = await prisma.historicoConsentimento.findMany();
        break;
      case 'Notificacao':
        data = await prisma.notificacao.findMany();
        break;
      case 'Backup':
        data = await prisma.backup.findMany();
        break;
      case 'Exportacao':
        data = await prisma.exportacao.findMany();
        break;
      default:
        throw new Error(`Tabela não reconhecida: ${tableName}`);
    }
    return JSON.stringify(data, null, 2);
  }

  async criarBackupDeTudo() {
    const tabelas = [
      'Usuario',
      'Termo',
      'HistoricoConsentimento',
      'Notificacao',
      'Backup',
      'Exportacao',
    ];
  
    const backupsCriados = [];
    for (const tabela of tabelas) {
      const dados = await this.exportTableData(tabela); // Assumindo que você já tenha esta função
      const jsonData = JSON.stringify(dados);
      const encryptedData = encryptAES(jsonData); // Usando a função de criptografia
  
      const backup = await prisma.backup.create({
        data: {
          nome: `Backup_${tabela}_${new Date().toISOString()}`,
          arquivo: encryptedData,
        },
      });
  
      backupsCriados.push(backup);
    }
  
    return backupsCriados;
  }  

  async criarBackupSeparado(tabela: string) {
    const dados = await this.exportTableData(tabela);
    const encryptedData = this.encryptData(dados);

    const backup = await prisma.backup.create({
      data: {
        nome: `Backup_${tabela}_${new Date().toISOString()}`,
        arquivo: encryptedData,
      },
    });

    return backup;
  }

  async listarBackups() {
    const backups = await prisma.backup.findMany();
    return backups.map((backup) => ({
      ...backup,
      arquivo: undefined, // Evitar envio do arquivo criptografado
    }));
  }

  async obterBackupPorId(id: string) {
    const backup = await prisma.backup.findUnique({ where: { id } });
  
    if (!backup) {
      throw new Error('Backup não encontrado');
    }
  
    // Aqui você chama a função decryptAES para descriptografar o arquivo
    const decryptedData = decryptAES(backup.arquivo);
    
    // Retorna os dados descriptografados no formato que desejar
    return {
      ...backup,
      arquivo: decryptedData, // Retorna o arquivo descriptografado
    };
  }  

  async excluirBackup(id: string) {
    const backupExcluido = await prisma.backup.delete({ where: { id } });
    return backupExcluido;
  }
}

export default new BackupService();
