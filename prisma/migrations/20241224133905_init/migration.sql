-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ca" TEXT NOT NULL,
    "queryUser" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "fdv" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_Record" ("ca", "createAt", "fdv", "groupName", "id", "price", "queryUser", "updateAt") SELECT "ca", "createAt", "fdv", "groupName", "id", "price", "queryUser", "updateAt" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
CREATE TABLE "new_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ca" TEXT NOT NULL,
    "firstCaller" TEXT NOT NULL,
    "queryNum" INTEGER NOT NULL,
    "groupNum" INTEGER NOT NULL,
    "firstPrice" TEXT NOT NULL,
    "firstFdv" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_Token" ("ca", "createAt", "firstCaller", "firstFdv", "firstPrice", "groupNum", "id", "queryNum", "updateAt") SELECT "ca", "createAt", "firstCaller", "firstFdv", "firstPrice", "groupNum", "id", "queryNum", "updateAt" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_ca_key" ON "Token"("ca");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
