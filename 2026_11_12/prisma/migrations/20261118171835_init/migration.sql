/*
  Warnings:

  - Made the column `postId` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropIndex
DROP INDEX `Comment_postId_fkey` ON `comment`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `content` VARCHAR(191) NULL,
    MODIFY `postId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
