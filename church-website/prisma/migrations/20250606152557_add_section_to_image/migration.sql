-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "section" TEXT,
ALTER COLUMN "event" DROP NOT NULL;
