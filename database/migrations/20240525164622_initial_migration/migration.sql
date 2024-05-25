-- CreateTable
CREATE TABLE "cpumetrics" (
    "id" SERIAL NOT NULL,
    "cpu_package_power" DOUBLE PRECISION NOT NULL,
    "cpu_package_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_utilization" INTEGER NOT NULL,
    "cpu_cores_average_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_max_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_min_temp" DOUBLE PRECISION NOT NULL,
    "cpu_max_temp_cores" INTEGER[],
    "cpu_min_temp_cores" INTEGER[],
    "cpu_core_0_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_1_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_2_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_3_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_4_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_5_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_6_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_7_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_8_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_9_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_10_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_11_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_12_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_13_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_14_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_15_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_16_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_17_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_18_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_19_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_20_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_21_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_22_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_23_temp" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cpumetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pcmetrics" (
    "id" SERIAL NOT NULL,
    "cpu_package_power" DOUBLE PRECISION NOT NULL,
    "cpu_package_temp" DOUBLE PRECISION NOT NULL,
    "cpu_core_utilization" INTEGER NOT NULL,
    "gpu_package_power" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pcmetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duedate" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
