/*
  Warnings:

  - Added the required column `nome` to the `Backup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Backup` ADD COLUMN `nome` VARCHAR(255) NOT NULL,
    MODIFY `arquivo` TEXT NOT NULL;
