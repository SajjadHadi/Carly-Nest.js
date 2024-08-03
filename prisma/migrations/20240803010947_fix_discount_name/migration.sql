/*
  Warnings:

  - You are about to drop the column `discount` on the `Car` table. All the data in the column will be lost.
  - Added the required column `discountedPrice` to the `Car` table without a default value. This is not possible if the table is not empty.

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
    "price" DECIMAL NOT NULL,
    "discountedPrice" DECIMAL NOT NULL,
    "manufactureYear" INTEGER NOT NULL,
    "topSpeed" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Car" ("brand", "condition", "createdAt", "description", "fuel", "id", "image", "manufactureYear", "model", "price", "topSpeed", "transmission", "type", "updatedAt") SELECT "brand", "condition", "createdAt", "description", "fuel", "id", "image", "manufactureYear", "model", "price", "topSpeed", "transmission", "type", "updatedAt" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
