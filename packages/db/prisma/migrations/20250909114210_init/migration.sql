-- CreateEnum
CREATE TYPE "public"."DietaryHabits" AS ENUM ('VEGETARIAN', 'VEGAN', 'NON_VEGETARIAN', 'EGGITARIAN');

-- CreateEnum
CREATE TYPE "public"."BowelMovement" AS ENUM ('REGULAR', 'CONSTIPATED', 'LOOSE');

-- CreateEnum
CREATE TYPE "public"."DigestionQuality" AS ENUM ('EXCELLENT', 'GOOD', 'AVERAGE', 'POOR');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "public"."AgeGroup" AS ENUM ('INFANT', 'CHILD', 'ADOLESCENT', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "public"."MealTime" AS ENUM ('BREAKFAST', 'LUNCH', 'SNACKS', 'DINNER');

-- CreateTable
CREATE TABLE "public"."Doctor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Patient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DoctorPatient" (
    "dp_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "isActivePatient" BOOLEAN NOT NULL DEFAULT true,
    "gender" "public"."Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "dietary_habits" "public"."DietaryHabits" NOT NULL DEFAULT 'VEGETARIAN',
    "mealFrequency" INTEGER NOT NULL DEFAULT 3,
    "waterIntake" DOUBLE PRECISION NOT NULL DEFAULT 2,
    "digestionQuality" "public"."DigestionQuality" NOT NULL DEFAULT 'AVERAGE',
    "bowelMovement" "public"."BowelMovement" NOT NULL DEFAULT 'REGULAR',
    "priority" "public"."Priority" NOT NULL DEFAULT 'medium',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastConsultation" TIMESTAMP(3),
    "nextConsultation" TIMESTAMP(3),

    CONSTRAINT "DoctorPatient_pkey" PRIMARY KEY ("dp_id")
);

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

-- CreateTable
CREATE TABLE "public"."Cuisine" (
    "cuisine_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cuisine_pkey" PRIMARY KEY ("cuisine_id")
);

-- CreateTable
CREATE TABLE "public"."Food" (
    "food_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hindi_name" TEXT,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("food_id")
);

-- CreateTable
CREATE TABLE "public"."Nutrient" (
    "nutrient_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "Nutrient_pkey" PRIMARY KEY ("nutrient_id")
);

-- CreateTable
CREATE TABLE "public"."Rasa" (
    "rasa_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Rasa_pkey" PRIMARY KEY ("rasa_id")
);

-- CreateTable
CREATE TABLE "public"."Guna" (
    "guna_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Guna_pkey" PRIMARY KEY ("guna_id")
);

-- CreateTable
CREATE TABLE "public"."Dosha" (
    "dosha_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Dosha_pkey" PRIMARY KEY ("dosha_id")
);

-- CreateTable
CREATE TABLE "public"."Virya" (
    "virya_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Virya_pkey" PRIMARY KEY ("virya_id")
);

-- CreateTable
CREATE TABLE "public"."Vipaka" (
    "vipaka_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Vipaka_pkey" PRIMARY KEY ("vipaka_id")
);

-- CreateTable
CREATE TABLE "public"."Digestibility" (
    "digestibility_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Digestibility_pkey" PRIMARY KEY ("digestibility_id")
);

-- CreateTable
CREATE TABLE "public"."Rda" (
    "rda_id" TEXT NOT NULL,
    "nutrient_id" TEXT NOT NULL,
    "age_group" "public"."AgeGroup" NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rda_pkey" PRIMARY KEY ("rda_id")
);

-- CreateTable
CREATE TABLE "public"."FoodNutrient" (
    "food_id" TEXT NOT NULL,
    "nutrient_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FoodNutrient_pkey" PRIMARY KEY ("food_id","nutrient_id")
);

-- CreateTable
CREATE TABLE "public"."FoodRasa" (
    "food_id" TEXT NOT NULL,
    "rasa_id" TEXT NOT NULL,

    CONSTRAINT "FoodRasa_pkey" PRIMARY KEY ("food_id","rasa_id")
);

-- CreateTable
CREATE TABLE "public"."FoodGuna" (
    "food_id" TEXT NOT NULL,
    "guna_id" TEXT NOT NULL,

    CONSTRAINT "FoodGuna_pkey" PRIMARY KEY ("food_id","guna_id")
);

-- CreateTable
CREATE TABLE "public"."FoodDosha" (
    "food_id" TEXT NOT NULL,
    "dosha_id" TEXT NOT NULL,

    CONSTRAINT "FoodDosha_pkey" PRIMARY KEY ("food_id","dosha_id")
);

-- CreateTable
CREATE TABLE "public"."PatientDosha" (
    "pd_id" TEXT NOT NULL,
    "dosha_id" TEXT NOT NULL,

    CONSTRAINT "PatientDosha_pkey" PRIMARY KEY ("pd_id","dosha_id")
);

-- CreateTable
CREATE TABLE "public"."FoodVirya" (
    "food_id" TEXT NOT NULL,
    "virya_id" TEXT NOT NULL,

    CONSTRAINT "FoodVirya_pkey" PRIMARY KEY ("food_id","virya_id")
);

-- CreateTable
CREATE TABLE "public"."FoodVipaka" (
    "food_id" TEXT NOT NULL,
    "vipaka_id" TEXT NOT NULL,

    CONSTRAINT "FoodVipaka_pkey" PRIMARY KEY ("food_id")
);

-- CreateTable
CREATE TABLE "public"."FoodDigestibility" (
    "food_id" TEXT NOT NULL,
    "digestibility_id" TEXT NOT NULL,

    CONSTRAINT "FoodDigestibility_pkey" PRIMARY KEY ("food_id")
);

-- CreateTable
CREATE TABLE "public"."Recipe" (
    "recipe_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cuisine_id" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("recipe_id")
);

-- CreateTable
CREATE TABLE "public"."RecipeIngredient" (
    "recipe_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("recipe_id","food_id")
);

-- CreateTable
CREATE TABLE "public"."DietChart" (
    "chart_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "DietChart_pkey" PRIMARY KEY ("chart_id")
);

-- CreateTable
CREATE TABLE "public"."DietChartRecipe" (
    "chart_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "mealTime" "public"."MealTime" NOT NULL,
    "food_id" TEXT,
    "quantity" DOUBLE PRECISION,

    CONSTRAINT "DietChartRecipe_pkey" PRIMARY KEY ("chart_id","recipe_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "public"."Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "public"."Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorPatient_doctor_id_patient_id_key" ON "public"."DoctorPatient"("doctor_id", "patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "CriticalHealthCondition_name_key" ON "public"."CriticalHealthCondition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rasa_name_key" ON "public"."Rasa"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Guna_name_key" ON "public"."Guna"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dosha_name_key" ON "public"."Dosha"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Virya_name_key" ON "public"."Virya"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vipaka_name_key" ON "public"."Vipaka"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Digestibility_name_key" ON "public"."Digestibility"("name");

-- AddForeignKey
ALTER TABLE "public"."DoctorPatient" ADD CONSTRAINT "DoctorPatient_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "public"."Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DoctorPatient" ADD CONSTRAINT "DoctorPatient_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChcPatient" ADD CONSTRAINT "ChcPatient_chc_id_fkey" FOREIGN KEY ("chc_id") REFERENCES "public"."CriticalHealthCondition"("chc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChcPatient" ADD CONSTRAINT "ChcPatient_dp_id_fkey" FOREIGN KEY ("dp_id") REFERENCES "public"."DoctorPatient"("dp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rda" ADD CONSTRAINT "Rda_nutrient_id_fkey" FOREIGN KEY ("nutrient_id") REFERENCES "public"."Nutrient"("nutrient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodNutrient" ADD CONSTRAINT "FoodNutrient_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("food_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodNutrient" ADD CONSTRAINT "FoodNutrient_nutrient_id_fkey" FOREIGN KEY ("nutrient_id") REFERENCES "public"."Nutrient"("nutrient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodRasa" ADD CONSTRAINT "FoodRasa_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("food_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodRasa" ADD CONSTRAINT "FoodRasa_rasa_id_fkey" FOREIGN KEY ("rasa_id") REFERENCES "public"."Rasa"("rasa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodGuna" ADD CONSTRAINT "FoodGuna_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("food_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodGuna" ADD CONSTRAINT "FoodGuna_guna_id_fkey" FOREIGN KEY ("guna_id") REFERENCES "public"."Guna"("guna_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodDosha" ADD CONSTRAINT "FoodDosha_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("food_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodDosha" ADD CONSTRAINT "FoodDosha_dosha_id_fkey" FOREIGN KEY ("dosha_id") REFERENCES "public"."Dosha"("dosha_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PatientDosha" ADD CONSTRAINT "PatientDosha_dosha_id_fkey" FOREIGN KEY ("dosha_id") REFERENCES "public"."Dosha"("dosha_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PatientDosha" ADD CONSTRAINT "PatientDosha_pd_id_fkey" FOREIGN KEY ("pd_id") REFERENCES "public"."DoctorPatient"("dp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodVirya" ADD CONSTRAINT "FoodVirya_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("food_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodVirya" ADD CONSTRAINT "FoodVirya_virya_id_fkey" FOREIGN KEY ("virya_id") REFERENCES "public"."Virya"("virya_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodVipaka" ADD CONSTRAINT "FoodVipaka_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("food_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodVipaka" ADD CONSTRAINT "FoodVipaka_vipaka_id_fkey" FOREIGN KEY ("vipaka_id") REFERENCES "public"."Vipaka"("vipaka_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodDigestibility" ADD CONSTRAINT "FoodDigestibility_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("food_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodDigestibility" ADD CONSTRAINT "FoodDigestibility_digestibility_id_fkey" FOREIGN KEY ("digestibility_id") REFERENCES "public"."Digestibility"("digestibility_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recipe" ADD CONSTRAINT "Recipe_cuisine_id_fkey" FOREIGN KEY ("cuisine_id") REFERENCES "public"."Cuisine"("cuisine_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."Recipe"("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("food_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DietChartRecipe" ADD CONSTRAINT "DietChartRecipe_chart_id_fkey" FOREIGN KEY ("chart_id") REFERENCES "public"."DietChart"("chart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DietChartRecipe" ADD CONSTRAINT "DietChartRecipe_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."Recipe"("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DietChartRecipe" ADD CONSTRAINT "DietChartRecipe_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("food_id") ON DELETE SET NULL ON UPDATE CASCADE;
