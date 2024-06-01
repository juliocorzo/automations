// import type { AquaSuiteViewResponse } from '@/pages/api/pc-metrics/PCMetrics.types';
import z from 'zod';
import { Prisma } from '@prisma/client';
import { findNumberDelta } from '@/utilities/math';

export const aquasuiteViewResponseSchema = z.object({
  /** Array of all metrics */
  d: z.array(z.object({
    /** Index of array object */
    i: z.number(),
    /** Metric name */
    n: z.string(),
    /** Metric unit */
    u: z.string(),
    /** Metric value */
    v: z.string(),
  })),
  /** Aquasuite key (do not return as part of response) */
  g: z.string(),
  /** Internal Aquasuite data export name */
  n: z.string(),
  /** ISO8601 timestamp of date export */
  t: z.string(),
});

export type AquaSuiteViewResponse = z.infer<typeof aquasuiteViewResponseSchema>;

const parsedAquasuiteViewResponseSchema = z.record(z.string(), z.string());

export type ParsedAquasuiteViewResponse = z.infer<typeof parsedAquasuiteViewResponseSchema>;

export function parseAquasuiteViewResponse(
  response: AquaSuiteViewResponse,
): ParsedAquasuiteViewResponse {
  const parsedResponse = aquasuiteViewResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    return {};
  }

  const metrics = parsedResponse.data.d.reduce((acc, metric) => {
    acc[metric.n] = metric.v;
    return acc;
  }, {} as ParsedAquasuiteViewResponse);

  const parsedMetrics = parsedAquasuiteViewResponseSchema.safeParse(metrics);

  if (!parsedMetrics.success) {
    return {};
  }

  return parsedMetrics.data;
}

function isCoreTemp(metricName: string): boolean {
  const coreTempRegex = /CPU_CORE_[1-9][0-9]*_TEMP/;
  return coreTempRegex.test(metricName);
}

const coreTempsSchema = z.object({
  CPU_CORE_0_TEMP: z.number(),
  CPU_CORE_1_TEMP: z.number(),
  CPU_CORE_2_TEMP: z.number(),
  CPU_CORE_3_TEMP: z.number(),
  CPU_CORE_4_TEMP: z.number(),
  CPU_CORE_5_TEMP: z.number(),
  CPU_CORE_6_TEMP: z.number(),
  CPU_CORE_7_TEMP: z.number(),
  CPU_CORE_8_TEMP: z.number(),
  CPU_CORE_9_TEMP: z.number(),
  CPU_CORE_10_TEMP: z.number(),
  CPU_CORE_11_TEMP: z.number(),
  CPU_CORE_12_TEMP: z.number(),
  CPU_CORE_13_TEMP: z.number(),
  CPU_CORE_14_TEMP: z.number(),
  CPU_CORE_15_TEMP: z.number(),
  CPU_CORE_16_TEMP: z.number(),
  CPU_CORE_17_TEMP: z.number(),
  CPU_CORE_18_TEMP: z.number(),
  CPU_CORE_19_TEMP: z.number(),
  CPU_CORE_20_TEMP: z.number(),
  CPU_CORE_21_TEMP: z.number(),
  CPU_CORE_22_TEMP: z.number(),
  CPU_CORE_23_TEMP: z.number(),
});

export type CoreTemps = z.infer<typeof coreTempsSchema>;

/**
 * Returns a record of core temperatures from the call to get PC metrics from API. They key of the
 * record is the logical core number (starting from zero) and the value is the temperature.
 *
 * Only supports a discrete nmber of cores, 24, in order to ensure type safety.
 */
export function parseCoreTemps(response: AquaSuiteViewResponse): CoreTemps {
  const parsedResponse = aquasuiteViewResponseSchema.safeParse(response);

  const defaultCoreTemps = {
    CPU_CORE_0_TEMP: -100,
    CPU_CORE_1_TEMP: -100,
    CPU_CORE_2_TEMP: -100,
    CPU_CORE_3_TEMP: -100,
    CPU_CORE_4_TEMP: -100,
    CPU_CORE_5_TEMP: -100,
    CPU_CORE_6_TEMP: -100,
    CPU_CORE_7_TEMP: -100,
    CPU_CORE_8_TEMP: -100,
    CPU_CORE_9_TEMP: -100,
    CPU_CORE_10_TEMP: -100,
    CPU_CORE_11_TEMP: -100,
    CPU_CORE_12_TEMP: -100,
    CPU_CORE_13_TEMP: -100,
    CPU_CORE_14_TEMP: -100,
    CPU_CORE_15_TEMP: -100,
    CPU_CORE_16_TEMP: -100,
    CPU_CORE_17_TEMP: -100,
    CPU_CORE_18_TEMP: -100,
    CPU_CORE_19_TEMP: -100,
    CPU_CORE_20_TEMP: -100,
    CPU_CORE_21_TEMP: -100,
    CPU_CORE_22_TEMP: -100,
    CPU_CORE_23_TEMP: -100,
  };

  if (!parsedResponse.success) {
    return defaultCoreTemps;
  }

  const tempCoreTemps = defaultCoreTemps;

  parsedResponse.data.d.forEach((metric) => {
    if (isCoreTemp(metric.n)) {
      const coreNumber = parseInt(metric.n.split('_')[2], 10);
      tempCoreTemps[`CPU_CORE_${coreNumber - 1}_TEMP` as keyof CoreTemps] = parseFloat(metric.v);
    }
  });

  const coreTemps = {
    CPU_CORE_0_TEMP: tempCoreTemps?.CPU_CORE_0_TEMP || -100,
    CPU_CORE_1_TEMP: tempCoreTemps?.CPU_CORE_1_TEMP || -100,
    CPU_CORE_2_TEMP: tempCoreTemps?.CPU_CORE_2_TEMP || -100,
    CPU_CORE_3_TEMP: tempCoreTemps?.CPU_CORE_3_TEMP || -100,
    CPU_CORE_4_TEMP: tempCoreTemps?.CPU_CORE_4_TEMP || -100,
    CPU_CORE_5_TEMP: tempCoreTemps?.CPU_CORE_5_TEMP || -100,
    CPU_CORE_6_TEMP: tempCoreTemps?.CPU_CORE_6_TEMP || -100,
    CPU_CORE_7_TEMP: tempCoreTemps?.CPU_CORE_7_TEMP || -100,
    CPU_CORE_8_TEMP: tempCoreTemps?.CPU_CORE_8_TEMP || -100,
    CPU_CORE_9_TEMP: tempCoreTemps?.CPU_CORE_9_TEMP || -100,
    CPU_CORE_10_TEMP: tempCoreTemps?.CPU_CORE_10_TEMP || -100,
    CPU_CORE_11_TEMP: tempCoreTemps?.CPU_CORE_11_TEMP || -100,
    CPU_CORE_12_TEMP: tempCoreTemps?.CPU_CORE_12_TEMP || -100,
    CPU_CORE_13_TEMP: tempCoreTemps?.CPU_CORE_13_TEMP || -100,
    CPU_CORE_14_TEMP: tempCoreTemps?.CPU_CORE_14_TEMP || -100,
    CPU_CORE_15_TEMP: tempCoreTemps?.CPU_CORE_15_TEMP || -100,
    CPU_CORE_16_TEMP: tempCoreTemps?.CPU_CORE_16_TEMP || -100,
    CPU_CORE_17_TEMP: tempCoreTemps?.CPU_CORE_17_TEMP || -100,
    CPU_CORE_18_TEMP: tempCoreTemps?.CPU_CORE_18_TEMP || -100,
    CPU_CORE_19_TEMP: tempCoreTemps?.CPU_CORE_19_TEMP || -100,
    CPU_CORE_20_TEMP: tempCoreTemps?.CPU_CORE_20_TEMP || -100,
    CPU_CORE_21_TEMP: tempCoreTemps?.CPU_CORE_21_TEMP || -100,
    CPU_CORE_22_TEMP: tempCoreTemps?.CPU_CORE_22_TEMP || -100,
    CPU_CORE_23_TEMP: tempCoreTemps?.CPU_CORE_23_TEMP || -100,
  };

  const parsedCoreTemps = coreTempsSchema.safeParse(coreTemps);

  if (!parsedCoreTemps.success) {
    return defaultCoreTemps;
  }

  return parsedCoreTemps.data;
}

export function findMinCoreTemp(coreTemps: CoreTemps): number {
  const parsedCoreTemps = coreTempsSchema.safeParse(coreTemps);

  if (!parsedCoreTemps.success) {
    return -1;
  }

  const minCoreTemp = Math.min(...Object.values(coreTemps));

  return minCoreTemp;
}

const coreNumbers = z.number().int().min(0)
  .array();

type CoreNumbers = z.infer<typeof coreNumbers>;

export function findHottestCores(coreTemps: CoreTemps): CoreNumbers {
  // Find hottest core(s) with their core number(s)
  const hottestCoreTemp = Math.max(...Object.values(coreTemps));
  const hottestCores = Object.keys(coreTemps)
    .filter((key) => coreTemps[key as keyof CoreTemps] === hottestCoreTemp)
    .map((key) => parseInt(key.split('_')[2], 10));

  const parsedHottestCores = coreNumbers.safeParse(hottestCores);

  if (!parsedHottestCores.success) {
    return [];
  }

  return parsedHottestCores.data;
}

export function findColdestCores(coreTemps: Record<string, number>): CoreNumbers {
  // Find coldest core(s) with their core number(s)
  const coldestCoreTemp = Math.min(...Object.values(coreTemps));
  const coldestCores = Object.keys(coreTemps)
    .filter((key) => coreTemps[key] === coldestCoreTemp)
    .map((key) => parseInt(key.split('_')[2], 10));

  const parsedColdestCores = coreNumbers.safeParse(coldestCores);

  if (!parsedColdestCores.success) {
    return [];
  }

  return parsedColdestCores.data;
}

export function findCoreTempDelta(coreTemps: CoreTemps): number {
  const parsedCoreTemps = coreTempsSchema.safeParse(coreTemps);

  if (!parsedCoreTemps.success) {
    return -1;
  }
  const coreTempDelta = findNumberDelta(Object.values(coreTemps));

  return coreTempDelta;
}

export function findPerformanceCoreTempDelta(coreTemps: CoreTemps): number {
  const parsedCoreTemps = coreTempsSchema.safeParse(coreTemps);

  if (!parsedCoreTemps.success) {
    return -1;
  }

  const performanceCoreTempDelta = findNumberDelta(Object.values(coreTemps).slice(0, 8));

  return performanceCoreTempDelta;
}

export function findEfficiencyCoreTempDelta(coreTemps: CoreTemps): number {
  const parsedCoreTemps = coreTempsSchema.safeParse(coreTemps);

  if (!parsedCoreTemps.success) {
    return -1;
  }

  const efficiencyCoreTempDelta = findNumberDelta(Object.values(coreTemps).slice(8));

  return efficiencyCoreTempDelta;
}

export function findExtremeCoresByCoreTypeAndExtremeType(
  coreTemps: CoreTemps,
  coreType: 'performance' | 'efficiency',
  extremeType: 'hottest' | 'coldest',
): number[] {
  const parsedCoreTemps = coreTempsSchema.safeParse(coreTemps);

  if (!parsedCoreTemps.success) {
    return [];
  }

  const coreTempType = coreType === 'performance' ? 'performance' : 'efficiency';
  const coreTempValues = Object.values(coreTemps);
  const coreTempRange = coreTempType === 'performance' ? coreTempValues.slice(0, 8) : coreTempValues.slice(8);
  const extremeCoreTemp = extremeType === 'hottest' ? Math.max(...coreTempRange) : Math.min(...coreTempRange);

  const extremeCores = Object.keys(coreTemps)
    .filter((key) => coreTemps[key as keyof CoreTemps] === extremeCoreTemp)
    .map((key) => parseInt(key.split('_')[2], 10));

  return extremeCores;
}

export function generateNewDatabaseRow(
  aquasuiteResponse: AquaSuiteViewResponse,
): Prisma.CpuMetricCreateInput {
  const data = parseAquasuiteViewResponse(aquasuiteResponse);
  const coreTemps = parseCoreTemps(aquasuiteResponse);

  const minAllCoreTemp = findMinCoreTemp(coreTemps);
  const maxAllCoreTemp = parseFloat(data.CPU_CORE_MAX_TEMP);

  const allCoreTempDelta = findCoreTempDelta(coreTemps);
  const performanceCoreTempDelta = findPerformanceCoreTempDelta(coreTemps);
  const efficiencyCoreTempDelta = findEfficiencyCoreTempDelta(coreTemps);
  const hottestPerformanceCores = findExtremeCoresByCoreTypeAndExtremeType(coreTemps, 'performance', 'hottest');

  const newRow = Prisma.validator<Prisma.CpuMetricCreateInput>()({
    cpu_package_power: parseFloat(data.CPU_PACKAGE_POWER),
    cpu_package_temp: parseFloat(data.CPU_PACKAGE_TEMP),
    cpu_core_utilization: parseInt(data.CPU_CORE_UTILIZATION, 10),
    cpu_cores_average_temp: parseFloat(data.CPU_CORES_AVERAGE_TEMP),
    cpu_core_max_temp: maxAllCoreTemp,
    cpu_core_min_temp: minAllCoreTemp,
    cpu_max_temp_cores: findHottestCores(coreTemps),
    cpu_min_temp_cores: findColdestCores(coreTemps),
    // cpu_core_temp_delta: allCoreTempDelta,
    // cpu_pcore_temp_delta: performanceCoreTempDelta,
    // cpu_ecore_temp_delta: efficiencyCoreTempDelta,
    cpu_core_0_temp: coreTemps.CPU_CORE_0_TEMP,
    cpu_core_1_temp: coreTemps.CPU_CORE_1_TEMP,
    cpu_core_2_temp: coreTemps.CPU_CORE_2_TEMP,
    cpu_core_3_temp: coreTemps.CPU_CORE_3_TEMP,
    cpu_core_4_temp: coreTemps.CPU_CORE_4_TEMP,
    cpu_core_5_temp: coreTemps.CPU_CORE_5_TEMP,
    cpu_core_6_temp: coreTemps.CPU_CORE_6_TEMP,
    cpu_core_7_temp: coreTemps.CPU_CORE_7_TEMP,
    cpu_core_8_temp: coreTemps.CPU_CORE_8_TEMP,
    cpu_core_9_temp: coreTemps.CPU_CORE_9_TEMP,
    cpu_core_10_temp: coreTemps.CPU_CORE_10_TEMP,
    cpu_core_11_temp: coreTemps.CPU_CORE_11_TEMP,
    cpu_core_12_temp: coreTemps.CPU_CORE_12_TEMP,
    cpu_core_13_temp: coreTemps.CPU_CORE_13_TEMP,
    cpu_core_14_temp: coreTemps.CPU_CORE_14_TEMP,
    cpu_core_15_temp: coreTemps.CPU_CORE_15_TEMP,
    cpu_core_16_temp: coreTemps.CPU_CORE_16_TEMP,
    cpu_core_17_temp: coreTemps.CPU_CORE_17_TEMP,
    cpu_core_18_temp: coreTemps.CPU_CORE_18_TEMP,
    cpu_core_19_temp: coreTemps.CPU_CORE_19_TEMP,
    cpu_core_20_temp: coreTemps.CPU_CORE_20_TEMP,
    cpu_core_21_temp: coreTemps.CPU_CORE_21_TEMP,
    cpu_core_22_temp: coreTemps.CPU_CORE_22_TEMP,
    cpu_core_23_temp: coreTemps.CPU_CORE_23_TEMP,
    created_at: aquasuiteResponse.t,
  });

  return newRow;
}
