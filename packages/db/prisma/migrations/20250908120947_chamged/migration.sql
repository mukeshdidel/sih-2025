/*
  Warnings:

  - Added the required column `updatedAt` to the `DoctorPatient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "public"."DoctorPatient" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActivePatient" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastConsultation" TIMESTAMP(3),
ADD COLUMN     "nextConsultation" TIMESTAMP(3),
ADD COLUMN     "priority" "public"."Priority" NOT NULL DEFAULT 'medium',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."CriticalHealthCondition" (
    "chc_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CriticalHealthCondition_pkey" PRIMARY KEY ("chc_id")
);

-- CreateTable
CREATE TABLE "public"."ChcPatient" (
    "chc_id" TEXT NOT NULL,
    "dp_id" TEXT NOT NULL,
    "diagnosed" TIMESTAMP(3) NOT NULL,
    "resolved" TIMESTAMP(3),

    CONSTRAINT "ChcPatient_pkey" PRIMARY KEY ("chc_id","dp_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CriticalHealthCondition_name_key" ON "public"."CriticalHealthCondition"("name");

-- AddForeignKey
ALTER TABLE "public"."ChcPatient" ADD CONSTRAINT "ChcPatient_chc_id_fkey" FOREIGN KEY ("chc_id") REFERENCES "public"."CriticalHealthCondition"("chc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChcPatient" ADD CONSTRAINT "ChcPatient_dp_id_fkey" FOREIGN KEY ("dp_id") REFERENCES "public"."DoctorPatient"("dp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
