/*
  Warnings:

  - You are about to drop the `_savedCars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_savedCars";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SavedCarItem" (
    "userId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "carId"),
    CONSTRAINT "SavedCarItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavedCarItem_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
