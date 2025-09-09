/*
  Warnings:

  - You are about to drop the column `dietary_habits` on the `DoctorPatient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."DoctorPatient" DROP COLUMN "dietary_habits",
ADD COLUMN     "dietaryHabit" "public"."DietaryHabits" NOT NULL DEFAULT 'VEGETARIAN';
