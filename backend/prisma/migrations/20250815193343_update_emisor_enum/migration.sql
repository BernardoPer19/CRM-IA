/*
  Warnings:

  - The values [EMPLEADO] on the enum `Emisor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Emisor_new" AS ENUM ('ADMIN', 'EMPLOYEE', 'IA');
ALTER TABLE "public"."Message" ALTER COLUMN "emisor" TYPE "public"."Emisor_new" USING ("emisor"::text::"public"."Emisor_new");
ALTER TYPE "public"."Emisor" RENAME TO "Emisor_old";
ALTER TYPE "public"."Emisor_new" RENAME TO "Emisor";
DROP TYPE "public"."Emisor_old";
COMMIT;
