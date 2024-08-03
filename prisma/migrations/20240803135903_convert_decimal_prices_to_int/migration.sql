/*
  Warnings:

  - You are about to alter the column `discountedPrice` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `price` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discountedPrice" INTEGER NOT NULL,
    "manufactureYear" INTEGER NOT NULL,
    "topSpeed" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Car" ("brand", "condition", "createdAt", "description", "discountedPrice", "fuel", "id", "image", "manufactureYear", "model", "price", "topSpeed", "transmission", "type", "updatedAt") SELECT "brand", "condition", "createdAt", "description", "discountedPrice", "fuel", "id", "image", "manufactureYear", "model", "price", "topSpeed", "transmission", "type", "updatedAt" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
