/*
  Warnings:

  - You are about to drop the column `device` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `m2` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerM2` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `room` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_roomId_fkey`;

-- DropIndex
DROP INDEX `product_roomId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `device`,
    DROP COLUMN `height`,
    DROP COLUMN `m2`,
    DROP COLUMN `note`,
    DROP COLUMN `profile`,
    DROP COLUMN `width`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `pricePerM2`,
    DROP COLUMN `roomId`,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `subImage4` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `room`;

-- CreateTable
CREATE TABLE `subscribe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `subscribe_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `subtitle` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
