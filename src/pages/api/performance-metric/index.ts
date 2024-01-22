import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import type { PerformanceMetric } from '@prisma/client';
import type { AquasuiteResponse, AquasuiteFlatResponse } from './types';

// const prisma = new PrismaClient();

const GENERATE_FAKE_METRIC = true;

export const generateMetric = (data: AquasuiteResponse): AquasuiteFlatResponse => {
  const metricsArray = data.d;

  const metrics = {} as AquasuiteFlatResponse;

  metricsArray.forEach((metric) => {
    metrics[metric.n as keyof Omit<AquasuiteFlatResponse, 'timestamp'>] = Number(metric.v);
  });

  return { ...metrics, timestamp: new Date(data.t) };
};

const generateFakeMetric = (): AquasuiteFlatResponse => {
  const fakeMetric = {
    inletTemperature: 0,
    outletTemperature: 0,
    coolingPower: 0,
    flowRate: 0,
    cpuTemperature: 0,
    cpuLoad: 0,
    cpuPower: 0,
    gpuTemperature: 0,
    gpuLoad: 0,
    gpuPower: 0,
    memoryLoad: 0,
    airMotherboardFrontTemperature: 0,
    airMotherboardBackTemperature: 0,
    airCaseTemperature: 0,
    createdAt: new Date(),
  };

  return fakeMetric;
};

export const generateDatabaseMetric = (data: AquasuiteFlatResponse): Omit<PerformanceMetric, 'id'> => {
  const preparedMetric = {
    inletTemperature: data.liquid_in_temp,
    outletTemperature: data.liquid_out_temp,
    coolingPower: data.cooling_power,
    flowRate: data.liquid_flow_rate,
    cpuTemperature: data.cpu_package_temp,
    cpuLoad: data.cpu_load,
    cpuPower: data.cpu_package_power,
    gpuTemperature: data.gpu_core_temp,
    gpuLoad: data.gpu_load,
    gpuPower: data.gpu_package_power,
    memoryLoad: data.memory_load,
    airMotherboardFrontTemperature: data.front_mid_air_temp,
    airMotherboardBackTemperature: data.back_mid_air_temp,
    airCaseTemperature: data.back_top_air_temp,
    createdAt: data.timestamp,
  };

  return preparedMetric;
};

const { AQUASUITE_KEY } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `https://aquasuite.aquacomputer.de/view/${AQUASUITE_KEY}`;

  try {
    if (GENERATE_FAKE_METRIC) {
      res.status(200).json(generateFakeMetric());
    } else {
      const response = await fetch(url);
      const body: AquasuiteResponse = await response.json();
      const metric = generateMetric(body);
      const databaseMetric = generateDatabaseMetric(metric);
      res.status(200).json(databaseMetric);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load PC metrics' });
  }
}
