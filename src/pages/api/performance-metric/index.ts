import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import type { PerformanceMetric } from '@prisma/client';
import type { AquasuiteResponse, AquasuiteFlatResponse } from './types';

// const prisma = new PrismaClient();

export const generateMetric = (data: AquasuiteResponse): AquasuiteFlatResponse => {
  const metricsArray = data.d;
  const metrics = {} as AquasuiteFlatResponse;
  metricsArray.forEach((metric) => {
    metrics[metric.n as keyof Omit<AquasuiteFlatResponse, 'timestamp'>] = Number(metric.v);
  });
  return { ...metrics, timestamp: new Date(data.t) };
};

export const generateDatabaseMetric = (data: AquasuiteFlatResponse): Omit<PerformanceMetric, 'id'> => {
  const preparedMetric = {
    cpuTemperature: data.CPU_TEMP_MAX,
    cpuPower: data.CPU_POWER_DRAW,
    createdAt: data.timestamp,
  };

  return preparedMetric;
};

const { AQUASUITE_KEY } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `https://aquasuite.aquacomputer.de/view/${AQUASUITE_KEY}`;

  try {
    const response = await fetch(url);
    const body: AquasuiteResponse = await response.json();
    const metric = generateMetric(body);
    const databaseMetric = generateDatabaseMetric(metric);
    res.status(200).json(databaseMetric);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load PC metrics' });
  }
}
