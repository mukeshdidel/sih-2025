/*
  Warnings:

  - You are about to drop the column `description` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DietChart` table. All the data in the column will be lost.
  - Added the required column `db_id` to the `DietChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DietChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WeekDay` to the `DietChartRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DietChart" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "db_id" TEXT NOT NULL,
ADD COLUMN     "mealSlots" "public"."MealTime"[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."DietChartRecipe" ADD COLUMN     "WeekDay" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."DietChart" ADD CONSTRAINT "DietChart_db_id_fkey" FOREIGN KEY ("db_id") REFERENCES "public"."DoctorPatient"("dp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
