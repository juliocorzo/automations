// import type { AquaSuiteViewResponse } from '@/pages/api/pc-metrics/PCMetrics.types';
import z from 'zod';

const aquasuiteViewResponseSchema = z.object({
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
    parsedResponse.error.errors.forEach((error) => {
      // TODO: Log error to a logging service
      console.error(`(CPU Metrics API) Error parsing Aquasuite view response: ${error.message}`);
    });
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

const parsedCoreTempSchema = z.record((
  z.string().refine((value) => isCoreTemp(value)),
  z.number()
));

export type CoreTemps = z.infer<typeof parsedCoreTempSchema>;

/**
 * Returns a record of core temperatures from the call to get PC metrics from API. They key of the
 * record is the logical core number (starting from zero) and the value is the temperature.
 */
export function parseCoreTemps(response: AquaSuiteViewResponse): CoreTemps {
  const parsedResponse = aquasuiteViewResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    parsedResponse.error.errors.forEach((error) => {
      // TODO: Log error to a logging service
      console.error(`(CPU Metrics API) Error parsing core temperatures: ${error.message}`);
    });
    return {};
  }

  const coreTemps = {} as CoreTemps;

  parsedResponse.data.d.forEach((metric) => {
    if (isCoreTemp(metric.n)) {
      const coreNumber = parseInt(metric.n.split('_')[2], 10);
      coreTemps[`CPU_CORE_${coreNumber - 1}_TEMP`] = parseFloat(metric.v);
    }
  });

  const parsedCoreTemps = parsedCoreTempSchema.safeParse(coreTemps);

  if (!parsedCoreTemps.success) {
    return {};
  }

  return parsedCoreTemps.data;
}

export function findMinCoreTemp(coreTemps: CoreTemps): number {
  const parsedCoreTemps = parsedCoreTempSchema.safeParse(coreTemps);

  if (!parsedCoreTemps.success) {
    return -1;
  }

  return Math.min(...Object.values(coreTemps));
}

const coreNumbers = z.number().int().min(0)
  .array();

type CoreNumbers = z.infer<typeof coreNumbers>;

export function findHottestCores(coreTemps: CoreTemps): CoreNumbers {
  // Find hottest core(s) with their core number(s)
  const hottestCoreTemp = Math.max(...Object.values(coreTemps));
  const hottestCores = Object.keys(coreTemps)
    .filter((key) => coreTemps[key] === hottestCoreTemp)
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
