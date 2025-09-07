/*
  Warnings:

  - You are about to drop the column `cuisineCuisine_id` on the `Food` table. All the data in the column will be lost.
  - Added the required column `dob` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Doctor" ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" "public"."Gender" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Food" DROP COLUMN "cuisineCuisine_id";

-- AlterTable
ALTER TABLE "public"."Patient" ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL;
