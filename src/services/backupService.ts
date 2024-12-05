import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const execAsync = promisify(exec);

class BackupService {

  async criarBackup(arquivo: string) {
    const backup = await prisma.backup.create({
      data: {
        arquivo,
      },
    });
    return backup;
  }

  async criarRotinaBackup() {
    const timestamp = new Date().toISOString();
    const backupFileName = `backup-${timestamp}.sql`;
    const backupFilePath = path.join(__dirname, '../../', 'backups', backupFileName);

    try {
      // Rodar o comando do MySQL Dump
      await execAsync(`mysqldump -u user -p'password' database_name > ${backupFilePath}`);

      // Ler o backup
      const backup = fs.readFileSync(backupFilePath, 'utf8');

      // Salvar o backup
      await prisma.backup.create({
        data: {
          arquivo: backup,
        },
      });

      console.log(`Backup criado e armazenado com sucesso: ${backupFileName}`);
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      throw error; 
    }
  }

  async listarBackups() {
    const backups = await prisma.backup.findMany();
    return backups;
  }

  async obterBackupPorId(id: string) {
    const backup = await prisma.backup.findUnique({
      where: { id },
    });
    return backup;
  }

  async excluirBackup(id: string) {
    const backupExcluido = await prisma.backup.delete({
      where: { id },
    });
    return backupExcluido;
  }
}

export default new BackupService();