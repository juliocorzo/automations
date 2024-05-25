import type { CpuMetric } from '@prisma/client';
import { z } from 'zod';

export const aquasuiteCpuMetricResponseSchema = z.object({
  /** Array of all metrics */
  d: z.array(
    z.object({
      /** Index of array object */
      i: z.number(),
      /** Metric name */
      n: z.string(),
      /** Metric unit */
      u: z.string(),
      /** Metric value */
      v: z.string(),
    }),
  ),
  /** Aquasuite key (do not return as part of response) */
  g: z.string(),
  /** Internal Aquasuite data export name */
  n: z.string(),
  /** ISO8601 timestamp of date export */
  t: z.string().datetime({ precision: 6 }),
});

export type AquasuiteCpuMetricResponse = z.infer<typeof aquasuiteCpuMetricResponseSchema>;

export type { CpuMetric };
