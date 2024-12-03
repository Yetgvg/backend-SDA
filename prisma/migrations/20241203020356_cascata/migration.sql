-- DropForeignKey
ALTER TABLE `Exportacao` DROP FOREIGN KEY `Exportacao_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `HistoricoConsentimento` DROP FOREIGN KEY `HistoricoConsentimento_id_termo_fkey`;

-- DropForeignKey
ALTER TABLE `HistoricoConsentimento` DROP FOREIGN KEY `HistoricoConsentimento_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `Notificacao` DROP FOREIGN KEY `Notificacao_id_usuario_fkey`;

-- AddForeignKey
ALTER TABLE `HistoricoConsentimento` ADD CONSTRAINT `HistoricoConsentimento_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoricoConsentimento` ADD CONSTRAINT `HistoricoConsentimento_id_termo_fkey` FOREIGN KEY (`id_termo`) REFERENCES `Termo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exportacao` ADD CONSTRAINT `Exportacao_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
