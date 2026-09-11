-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "country" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "anonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyStat" (
    "month" TEXT NOT NULL,
    "visitors" INTEGER NOT NULL,
    "pageviews" INTEGER NOT NULL,

    CONSTRAINT "MonthlyStat_pkey" PRIMARY KEY ("month")
);

-- CreateIndex
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");

-- CreateIndex
CREATE INDEX "PageView_anonId_idx" ON "PageView"("anonId");
