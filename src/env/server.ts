import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    /** URL to fetch PC metrics from */
    AQUASUITE_URL: z.string().url(),
    /** API key to fetch PC CPU metrics with (it's actually a path) */
    AQUASUITE_CPU_METRICS_KEY: z.string(),
    OPEN_AI_KEY: z.string(),
    CRON_SECRET: z.string(),
  },
  runtimeEnv: {
    AQUASUITE_URL: process.env.AQUASUITE_URL,
    AQUASUITE_CPU_METRICS_KEY: process.env.AQUASUITE_CPU_METRICS_KEY,
    OPEN_AI_KEY: process.env.OPEN_AI_KEY,
    CRON_SECRET: process.env.CRON_SECRET,
  },
});
