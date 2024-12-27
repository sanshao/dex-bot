-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ca` VARCHAR(191) NOT NULL,
    `firstCaller` VARCHAR(191) NOT NULL,
    `queryCount` INTEGER NOT NULL,
    `roomCount` INTEGER NOT NULL,
    `firstPrice` VARCHAR(191) NOT NULL,
    `firstFdv` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Token_ca_key`(`ca`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ca` VARCHAR(191) NOT NULL,
    `queryUser` VARCHAR(191) NOT NULL,
    `roomName` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `fdv` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
