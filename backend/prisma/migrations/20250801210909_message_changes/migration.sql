/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_clienteId_fkey";

-- DropIndex
DROP INDEX "Message_clienteId_idx";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "clienteId";
