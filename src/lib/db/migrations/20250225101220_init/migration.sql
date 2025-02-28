/*
  Warnings:

  - You are about to drop the column `deliveredAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `expectedDeliveryDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `isDelivered` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `itemsPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `taxPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `countInStock` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `PaymentResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RatingDistribution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingAddress` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paymentIntentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentIntentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentResult" DROP CONSTRAINT "PaymentResult_orderId_fkey";

-- DropForeignKey
ALTER TABLE "RatingDistribution" DROP CONSTRAINT "RatingDistribution_productId_fkey";

-- DropForeignKey
ALTER TABLE "ShippingAddress" DROP CONSTRAINT "ShippingAddress_orderId_fkey";

-- DropIndex
DROP INDEX "Product_slug_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveredAt",
DROP COLUMN "expectedDeliveryDate",
DROP COLUMN "isDelivered",
DROP COLUMN "isPaid",
DROP COLUMN "itemsPrice",
DROP COLUMN "paidAt",
DROP COLUMN "paymentMethod",
DROP COLUMN "shippingPrice",
DROP COLUMN "taxPrice",
DROP COLUMN "totalPrice",
DROP COLUMN "updatedAt",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paymentIntentId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "category",
DROP COLUMN "clientId",
DROP COLUMN "color",
DROP COLUMN "countInStock",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "size",
DROP COLUMN "slug",
ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brand",
DROP COLUMN "sizes",
DROP COLUMN "slug",
DROP COLUMN "tags",
ALTER COLUMN "images" SET NOT NULL,
ALTER COLUMN "images" SET DATA TYPE TEXT,
ALTER COLUMN "isPublished" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeId" TEXT;

-- DropTable
DROP TABLE "PaymentResult";

-- DropTable
DROP TABLE "RatingDistribution";

-- DropTable
DROP TABLE "ShippingAddress";

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentIntentId_key" ON "Order"("paymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
