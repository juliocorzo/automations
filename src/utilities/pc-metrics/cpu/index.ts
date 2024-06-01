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

export function parseAquasuiteViewResponse(response: AquaSuiteViewResponse) {
  const parsedResponse = aquasuiteViewResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    return {};
  }

  const metrics = parsedResponse.data.d.reduce((acc, metric) => {
    acc[metric.n] = metric.v;
    return acc;
  }, {} as Record<string, string>);

  return metrics;
}

export function parseCoreTemps(response: AquaSuiteViewResponse, coreCount: number = 24) {
  const parsedResponse = aquasuiteViewResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    return {};
  }

  const coreTemps = response.d.reduce((acc, metric) => {
    const coreNumber = parseInt(metric.n.split('_')[2], 10);
    const isCoreTemp = coreNumber >= 1 && coreNumber <= coreCount - 1;
    if (isCoreTemp) {
      acc[`CPU_CORE_${coreNumber - 1}_TEMP`] = parseFloat(metric.v);
    }
    return acc;
  }, {} as Record<string, number>);

  return coreTemps;
}
