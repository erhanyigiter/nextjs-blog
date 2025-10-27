/*
  Warnings:

  - You are about to drop the column `description` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `static_pages` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `static_pages` table. All the data in the column will be lost.
  - You are about to drop the column `metaDescription` on the `static_pages` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `static_pages` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `static_pages` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tags` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LanguageCode" AS ENUM ('TR', 'EN', 'DE', 'FR', 'ES', 'AR');

-- DropIndex
DROP INDEX "public"."categories_name_key";

-- DropIndex
DROP INDEX "public"."tags_name_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "description",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "content",
DROP COLUMN "excerpt",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "static_pages" DROP COLUMN "content",
DROP COLUMN "excerpt",
DROP COLUMN "metaDescription",
DROP COLUMN "metaTitle",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "code" "LanguageCode" NOT NULL,
    "name" TEXT NOT NULL,
    "nativeName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_translations" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_translations" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tag_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_translations" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "static_page_translations" (
    "id" TEXT NOT NULL,
    "staticPageId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "static_page_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_translations_categoryId_languageId_key" ON "category_translations"("categoryId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "tag_translations_tagId_languageId_key" ON "tag_translations"("tagId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "post_translations_postId_languageId_key" ON "post_translations"("postId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "static_page_translations_staticPageId_languageId_key" ON "static_page_translations"("staticPageId", "languageId");

-- AddForeignKey
ALTER TABLE "category_translations" ADD CONSTRAINT "category_translations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_translations" ADD CONSTRAINT "category_translations_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_translations" ADD CONSTRAINT "tag_translations_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_translations" ADD CONSTRAINT "tag_translations_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_translations" ADD CONSTRAINT "post_translations_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_translations" ADD CONSTRAINT "post_translations_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "static_page_translations" ADD CONSTRAINT "static_page_translations_staticPageId_fkey" FOREIGN KEY ("staticPageId") REFERENCES "static_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "static_page_translations" ADD CONSTRAINT "static_page_translations_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
