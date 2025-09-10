-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('FRUIT', 'VEGETABLE', 'GRAIN', 'LEGUME', 'NUT', 'SEED', 'DAIRY', 'MEAT', 'FISH', 'EGG', 'SPICE', 'HERB', 'BEVERAGE', 'SWEETENER', 'OIL');

-- AlterTable
ALTER TABLE "public"."Food" ADD COLUMN     "category" "public"."Category" NOT NULL DEFAULT 'VEGETABLE';
