-- CreateTable
CREATE TABLE "public"."Address" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL DEFAULT 'home',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_user_id_key" ON "public"."Address"("user_id");

-- CreateIndex
CREATE INDEX "Address_user_id_idx" ON "public"."Address"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_user_id_type_key" ON "public"."Address"("user_id", "type");
