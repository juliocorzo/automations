import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { env } from '@/env/server';
import { aquasuiteViewResponseSchema, generateNewDatabaseRow } from '@/utilities/pc-metrics/cpu';
import type { AquaSuiteViewResponse } from '@/utilities/pc-metrics/cpu';
import pino from 'pino';

const prisma = new PrismaClient({
  log: ['error'],
});

const logger = pino({});

const { AQUASUITE_CPU_METRICS_KEY, AQUASUITE_URL, CRON_SECRET } = env;

/**
 * Fetches the latest CPU metrics from Aquasuite API and stores them in the database
 * Only used by a Vercel cron job, as the creation of new data should be done by the
 * server, never the client.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!AQUASUITE_CPU_METRICS_KEY || !AQUASUITE_URL) {
    logger.error('(CPU Metrics API): Request to /api/pc-metrics/cpu failed due to missing Aquasuite env variables');
    return res.status(500).json({ error: 'Internal server error, missing configuration values' });
  }

  if (req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
    logger.error('(CPU Metrics API): Request to /api/pc-metrics/cpu failed due to no CRON_SECRET header');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const url = `${AQUASUITE_URL}/view/${AQUASUITE_CPU_METRICS_KEY}`;

  let aquasuiteResponse: AquaSuiteViewResponse | undefined;

  try {
    const response = await fetch(url);
    const body = await response.json() as AquaSuiteViewResponse;
    aquasuiteResponse = body;
  } catch (error) {
    logger.error('Failed to fetch PC metrics from Aquasuite API', error);
    return res.status(500).json({ error: 'Failed to download latest PC metrics' });
  }

  const parsedAquasuiteResponse = aquasuiteViewResponseSchema.safeParse(aquasuiteResponse);

  if (!parsedAquasuiteResponse.success) {
    logger.error('(CPU Metrics API): Malformed response from Aquasuite API');
    return res.status(500).json({ error: 'Failed to read latest PC metrics' });
  }

  aquasuiteResponse = parsedAquasuiteResponse.data;

  prisma.$connect();

  try {
    const latestMetric = await prisma.cpuMetric.findFirst({
      where: {
        created_at: DateTime.fromISO(aquasuiteResponse.t).toJSDate(),
      },
    });

    if (latestMetric) {
      return res.status(200).json({ ...latestMetric });
    }
  } catch (error) {
    logger.error('(CPU Metrics API) Failed to find latest metric in database', error);
    return res.status(500).json({ error: 'Database error' });
  }

  const newRow = generateNewDatabaseRow(aquasuiteResponse);

  let latestWrittenMetric: Prisma.CpuMetricCreateInput | undefined;

  try {
    const metric = await prisma.cpuMetric.create({
      data:
        {
          ...newRow,
        },
    });
    latestWrittenMetric = metric;
  } catch (error) {
    logger.error('(CPU Metrics API) Failed to write new metric to database', error);
    return res.status(500).json({ error: 'Database error' });
  }

  prisma.$disconnect();

  return res.status(200).json(latestWrittenMetric);
}
