-- CreateTable
CREATE TABLE `Blacklist` (
    `id_usuario` VARCHAR(191) NOT NULL,
    `data_exclusao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `motivo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
