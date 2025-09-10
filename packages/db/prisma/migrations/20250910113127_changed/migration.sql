/*
  Warnings:

  - The primary key for the `DietChartRecipe` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."DietChartRecipe" DROP CONSTRAINT "DietChartRecipe_pkey",
ADD CONSTRAINT "DietChartRecipe_pkey" PRIMARY KEY ("chart_id", "recipe_id", "WeekDay");
