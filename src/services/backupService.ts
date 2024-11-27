import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class BackupService {
  async criarBackup(arquivo: string) {
    const backup = await prisma.backup.create({
      data: {
        arquivo,
      },
    });
    return backup;
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
