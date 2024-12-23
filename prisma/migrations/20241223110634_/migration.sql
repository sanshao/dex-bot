-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ca" TEXT NOT NULL,
    "firstCaller" TEXT NOT NULL,
    "queryNum" INTEGER NOT NULL,
    "groupNum" INTEGER NOT NULL,
    "firstPrice" TEXT NOT NULL,
    "firstFdv" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ca" TEXT NOT NULL,
    "queryUser" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "fdv" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_ca_key" ON "Token"("ca");
