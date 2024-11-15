-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "logo_url" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "postal_code" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'USD',
    "billing_period" VARCHAR(10) NOT NULL DEFAULT 'monthly',
    "features" JSONB,
    "trial_days" INTEGER,
    "max_users" INTEGER,
    "sort_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profession" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "hint_text" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserProfession" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "profession_id" TEXT NOT NULL,
    "other_profession" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserPlan" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "plan_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "trial_end_date" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "public"."Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_user_id_key" ON "public"."Company"("user_id");

-- CreateIndex
CREATE INDEX "Company_user_id_idx" ON "public"."Company"("user_id");

-- CreateIndex
CREATE INDEX "Company_created_by_idx" ON "public"."Company"("created_by");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "public"."Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profession_name_key" ON "public"."Profession"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfession_user_id_key" ON "public"."UserProfession"("user_id");

-- CreateIndex
CREATE INDEX "UserProfession_user_id_idx" ON "public"."UserProfession"("user_id");

-- CreateIndex
CREATE INDEX "UserProfession_profession_id_idx" ON "public"."UserProfession"("profession_id");

-- CreateIndex
CREATE INDEX "UserProfession_is_primary_idx" ON "public"."UserProfession"("is_primary");

-- CreateIndex
CREATE UNIQUE INDEX "UserPlan_user_id_key" ON "public"."UserPlan"("user_id");

-- CreateIndex
CREATE INDEX "UserPlan_user_id_idx" ON "public"."UserPlan"("user_id");

-- CreateIndex
CREATE INDEX "UserPlan_plan_id_idx" ON "public"."UserPlan"("plan_id");

-- CreateIndex
CREATE INDEX "UserPlan_status_idx" ON "public"."UserPlan"("status");

-- CreateIndex
CREATE UNIQUE INDEX "UserPlan_user_id_status_key" ON "public"."UserPlan"("user_id", "status");

-- AddForeignKey
ALTER TABLE "public"."UserProfession" ADD CONSTRAINT "UserProfession_profession_id_fkey" FOREIGN KEY ("profession_id") REFERENCES "public"."Profession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPlan" ADD CONSTRAINT "UserPlan_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
