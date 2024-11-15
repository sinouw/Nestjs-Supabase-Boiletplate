-- CreateTable
CREATE TABLE "public"."Interest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserInterest" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "interest_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interest_name_key" ON "public"."Interest"("name");

-- CreateIndex
CREATE INDEX "UserInterest_user_id_idx" ON "public"."UserInterest"("user_id");

-- CreateIndex
CREATE INDEX "UserInterest_interest_id_idx" ON "public"."UserInterest"("interest_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInterest_user_id_interest_id_key" ON "public"."UserInterest"("user_id", "interest_id");

-- AddForeignKey
ALTER TABLE "public"."UserInterest" ADD CONSTRAINT "UserInterest_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "public"."Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
