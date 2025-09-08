/*
  Warnings:

  - The primary key for the `DoctorPatient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bowelMovement` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `dietary_habits` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `digestionQuality` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `mealFrequency` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `waterIntake` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Patient` table. All the data in the column will be lost.
  - The primary key for the `PatientDosha` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `patient_id` on the `PatientDosha` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctor_id,patient_id]` on the table `DoctorPatient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dob` to the `DoctorPatient` table without a default value. This is not possible if the table is not empty.
  - The required column `dp_id` was added to the `DoctorPatient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `gender` to the `DoctorPatient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `DoctorPatient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `DoctorPatient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pd_id` to the `PatientDosha` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PatientDosha" DROP CONSTRAINT "PatientDosha_patient_id_fkey";

-- AlterTable
ALTER TABLE "public"."DoctorPatient" DROP CONSTRAINT "DoctorPatient_pkey",
ADD COLUMN     "bowelMovement" "public"."BowelMovement" NOT NULL DEFAULT 'REGULAR',
ADD COLUMN     "dietary_habits" "public"."DietaryHabits" NOT NULL DEFAULT 'VEGETARIAN',
ADD COLUMN     "digestionQuality" "public"."DigestionQuality" NOT NULL DEFAULT 'AVERAGE',
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dp_id" TEXT NOT NULL,
ADD COLUMN     "gender" "public"."Gender" NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mealFrequency" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "waterIntake" DOUBLE PRECISION NOT NULL DEFAULT 2,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "DoctorPatient_pkey" PRIMARY KEY ("dp_id");

-- AlterTable
ALTER TABLE "public"."Patient" DROP COLUMN "bowelMovement",
DROP COLUMN "dietary_habits",
DROP COLUMN "digestionQuality",
DROP COLUMN "dob",
DROP COLUMN "gender",
DROP COLUMN "height",
DROP COLUMN "mealFrequency",
DROP COLUMN "waterIntake",
DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "public"."PatientDosha" DROP CONSTRAINT "PatientDosha_pkey",
DROP COLUMN "patient_id",
ADD COLUMN     "pd_id" TEXT NOT NULL,
ADD CONSTRAINT "PatientDosha_pkey" PRIMARY KEY ("pd_id", "dosha_id");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorPatient_doctor_id_patient_id_key" ON "public"."DoctorPatient"("doctor_id", "patient_id");

-- AddForeignKey
ALTER TABLE "public"."PatientDosha" ADD CONSTRAINT "PatientDosha_pd_id_fkey" FOREIGN KEY ("pd_id") REFERENCES "public"."DoctorPatient"("dp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
