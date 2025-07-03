-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'stsimonsjsoc',
    "description" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
