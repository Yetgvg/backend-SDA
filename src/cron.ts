import cron from 'node-cron';
import BackupService from './services/backupService';

// Rotina de backups diários à meia noite
cron.schedule('0 0 * * *', async () => {
    console.log('Iniciando rotina automática de backup...');
    try {
        await BackupService.criarRotinaBackup();
        console.log('Rotina de backup concluída.');
    } catch (error) {
        console.error('Erro durante a rotina de backup:', error);
    }
});