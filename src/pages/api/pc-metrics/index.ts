import type { NextApiRequest, NextApiResponse } from 'next';
import type { AquaSuiteViewResponse } from '@/pages/api/pc-metrics/PCMetrics.types';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

function parseResponse(response: AquaSuiteViewResponse) {
  const metrics = response.d.reduce((acc, metric) => {
    acc[metric.n] = metric.v;
    return acc;
  }, {} as Record<string, string>);

  return metrics;
}

const { AQUASUITE_KEY, AQUASUITE_URL } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `${AQUASUITE_URL}/view/${AQUASUITE_KEY}`;

  try {
    if (!AQUASUITE_KEY || !AQUASUITE_URL) {
      return res.status(500).json({ error: 'Internal server error, missing configuration values' });
    }

    const response = await fetch(url);
    const body = await response.json() as AquaSuiteViewResponse;

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
      GPU_PACKAGE_POWER,
    } = parseResponse(body);

    prisma.$connect();

    try {
      const latestMetric = await prisma.metric.findFirst({
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

    try {
      const metric = await prisma.metric.create({
        data:
        {
          cpu_package_power: parseFloat(CPU_PACKAGE_POWER) || 0,
          cpu_package_temp: parseFloat(CPU_PACKAGE_TEMP) || 0,
          cpu_core_utilization: parseInt(CPU_CORE_UTILIZATION, 10) || 0,
          gpu_package_power: parseFloat(GPU_PACKAGE_POWER) || 0,
          created_at: DateTime.fromISO(body.t).toString(),
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
