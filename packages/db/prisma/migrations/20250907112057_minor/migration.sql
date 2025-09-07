/*
  Warnings:

  - You are about to drop the column `dob` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Doctor" DROP COLUMN "dob",
DROP COLUMN "gender";
