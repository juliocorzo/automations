import type { NextApiRequest, NextApiResponse } from 'next';
import type { AquaSuiteViewResponse } from '@/pages/api/pc-metrics/PCMetrics.types';
import { PrismaClient, Prisma } from '@prisma/client';
import { aquasuiteCpuMetricResponseSchema } from '@/types/pc-metrics';
import type { AquasuiteCpuMetricResponse } from '@/types/pc-metrics';
import { DateTime } from 'luxon';
import { env } from '@/env/server';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

function parseResponse(response: AquaSuiteViewResponse) {
  const metrics = response.d.reduce((acc, metric) => {
    acc[metric.n] = metric.v;
    return acc;
  }, {} as Record<string, string>);

  return metrics;
}

// parseCoreTemps to numbers, also moves from 1-24 to 0-23
function parseCoreTemps(response: AquaSuiteViewResponse) {
  const coreTemps = response.d.reduce((acc, metric) => {
    const coreNumber = parseInt(metric.n.split('_')[2], 10);
    const isCoreTemp = coreNumber >= 1 && coreNumber <= 24;
    if (isCoreTemp) {
      acc[`CPU_CORE_${coreNumber - 1}_TEMP`] = parseFloat(metric.v);
    }
    return acc;
  }, {} as Record<string, number>);

  return coreTemps;
}

function findMinCoreTemp(coreTemps: Record<string, number>) {
  return Math.min(...Object.values(coreTemps));
}

function findHottestCores(coreTemps: Record<string, number>): number[] {
  // Find hottest core(s) with their core number(s)
  const hottestCoreTemp = Math.max(...Object.values(coreTemps));
  const hottestCores = Object.keys(coreTemps)
    .filter((key) => coreTemps[key] === hottestCoreTemp)
    .map((key) => parseInt(key.split('_')[2], 10));

  return hottestCores;
}

function findColdestCores(coreTemps: Record<string, number>): number[] {
  // Find coldest core(s) with their core number(s)
  const coldestCoreTemp = Math.min(...Object.values(coreTemps));
  const coldestCores = Object.keys(coreTemps)
    .filter((key) => coreTemps[key] === coldestCoreTemp)
    .map((key) => parseInt(key.split('_')[2], 10));

  return coldestCores;
}

const { AQUASUITE_CPU_METRICS_KEY, AQUASUITE_URL, CRON_SECRET } = env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!AQUASUITE_CPU_METRICS_KEY || !AQUASUITE_URL) {
    return res.status(500).json({ error: 'Internal server error, missing configuration values' });
  }

  if (req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const url = `${AQUASUITE_URL}/view/${AQUASUITE_CPU_METRICS_KEY}`;

  try {
    const response = await fetch(url);
    const body = await response.json() as AquasuiteCpuMetricResponse;

    try {
      aquasuiteCpuMetricResponseSchema.safeParse(body);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to parse internal API response. Did schema change?' });
    }

    // Check if the query parameter is set to return raw response, return AquaSuite response if true
    const { query } = req;
    const rawResponse = query?.raw === 'true' || false;
    if (rawResponse) {
      return res.status(200).json(body);
    }

    const {
      CPU_PACKAGE_POWER,
      CPU_PACKAGE_TEMP,
      CPU_CORE_UTILIZATION,
      CPU_CORES_AVERAGE_TEMP,
      CPU_CORE_MAX_TEMP,
    } = parseResponse(body);

    const coreTemps = parseCoreTemps(body);

    const {
      CPU_CORE_0_TEMP,
      CPU_CORE_1_TEMP,
      CPU_CORE_2_TEMP,
      CPU_CORE_3_TEMP,
      CPU_CORE_4_TEMP,
      CPU_CORE_5_TEMP,
      CPU_CORE_6_TEMP,
      CPU_CORE_7_TEMP,
      CPU_CORE_8_TEMP,
      CPU_CORE_9_TEMP,
      CPU_CORE_10_TEMP,
      CPU_CORE_11_TEMP,
      CPU_CORE_12_TEMP,
      CPU_CORE_13_TEMP,
      CPU_CORE_14_TEMP,
      CPU_CORE_15_TEMP,
      CPU_CORE_16_TEMP,
      CPU_CORE_17_TEMP,
      CPU_CORE_18_TEMP,
      CPU_CORE_19_TEMP,
      CPU_CORE_20_TEMP,
      CPU_CORE_21_TEMP,
      CPU_CORE_22_TEMP,
      CPU_CORE_23_TEMP,
    } = coreTemps;

    prisma.$connect();

    try {
      const latestMetric = await prisma.cpuMetric.findFirst({
        where: {
          created_at: DateTime.fromISO(body.t).toJSDate(),
        },
      });

      if (latestMetric) {
        return res.status(200).json({ ...latestMetric });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }

    const newRow = Prisma.validator<Prisma.CpuMetricCreateInput>()({
      cpu_package_power: parseFloat(CPU_PACKAGE_POWER) || 0,
      cpu_package_temp: parseFloat(CPU_PACKAGE_TEMP) || 0,
      cpu_core_utilization: parseInt(CPU_CORE_UTILIZATION, 10) || 0,
      cpu_cores_average_temp: parseFloat(CPU_CORES_AVERAGE_TEMP) || 0,
      cpu_core_max_temp: parseFloat(CPU_CORE_MAX_TEMP) || 0,
      cpu_core_min_temp: findMinCoreTemp(coreTemps),
      cpu_max_temp_cores: findHottestCores(coreTemps),
      cpu_min_temp_cores: findColdestCores(coreTemps),
      cpu_core_0_temp: CPU_CORE_0_TEMP,
      cpu_core_1_temp: CPU_CORE_1_TEMP,
      cpu_core_2_temp: CPU_CORE_2_TEMP,
      cpu_core_3_temp: CPU_CORE_3_TEMP,
      cpu_core_4_temp: CPU_CORE_4_TEMP,
      cpu_core_5_temp: CPU_CORE_5_TEMP,
      cpu_core_6_temp: CPU_CORE_6_TEMP,
      cpu_core_7_temp: CPU_CORE_7_TEMP,
      cpu_core_8_temp: CPU_CORE_8_TEMP,
      cpu_core_9_temp: CPU_CORE_9_TEMP,
      cpu_core_10_temp: CPU_CORE_10_TEMP,
      cpu_core_11_temp: CPU_CORE_11_TEMP,
      cpu_core_12_temp: CPU_CORE_12_TEMP,
      cpu_core_13_temp: CPU_CORE_13_TEMP,
      cpu_core_14_temp: CPU_CORE_14_TEMP,
      cpu_core_15_temp: CPU_CORE_15_TEMP,
      cpu_core_16_temp: CPU_CORE_16_TEMP,
      cpu_core_17_temp: CPU_CORE_17_TEMP,
      cpu_core_18_temp: CPU_CORE_18_TEMP,
      cpu_core_19_temp: CPU_CORE_19_TEMP,
      cpu_core_20_temp: CPU_CORE_20_TEMP,
      cpu_core_21_temp: CPU_CORE_21_TEMP,
      cpu_core_22_temp: CPU_CORE_22_TEMP,
      cpu_core_23_temp: CPU_CORE_23_TEMP,
      created_at: body.t,
    });

    try {
      const metric = await prisma.cpuMetric.create({
        data:
        {
          ...newRow,
        },
      });

      prisma.$disconnect();

      return res.status(200).json(metric);
    } catch (error) {
      return res.status(500).json({ error });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load PC metrics' });
  }
}
