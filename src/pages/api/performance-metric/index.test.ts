import type { PerformanceMetric } from '@prisma/client';
import type { AquasuiteResponse, AquasuiteFlatResponse } from './types';
import { generateMetric, generateDatabaseMetric } from '.';

const mockResponse: AquasuiteResponse = {
  d: [{
    i: 0, n: 'liquid_in_temp', u: '°C', v: '29.1',
  }, {
    i: 1, n: 'liquid_out_temp', u: '°C', v: '29.9',
  }, {
    i: 2, n: 'front_mid_air_temp', u: '°C', v: '31.9',
  }, {
    i: 3, n: 'back_top_air_temp', u: '°C', v: '28.7',
  }, {
    i: 4, n: 'back_mid_air_temp', u: '°C', v: '38.4',
  }, {
    i: 5, n: 'cpu_package_temp', u: '°C', v: '41.0',
  }, {
    i: 6, n: 'gpu_core_temp', u: '°C', v: '30.0',
  }, {
    i: 7, n: 'cooling_power', u: 'W', v: '158',
  }, {
    i: 8, n: 'cpu_package_power', u: 'W', v: '51',
  }, {
    i: 9, n: 'gpu_package_power', u: 'W', v: '38',
  }, {
    i: 10, n: 'liquid_flow_rate', u: 'l/h', v: '180.6',
  }, {
    i: 11, n: 'cpu_load', u: '%', v: '2.9',
  }, {
    i: 12, n: 'memory_load', u: '%', v: '45.7',
  }, {
    i: 13, n: 'gpu_load', u: '%', v: '10.0',
  }],
  g: 'thisisafaketokendontwasteyourtime',
  n: 'web export',
  t: new Date('2024-01-15T06:36:46.889287Z'),
};

const mockFlatResponse: AquasuiteFlatResponse = {
  liquid_in_temp: 29.1,
  liquid_out_temp: 29.9,
  front_mid_air_temp: 31.9,
  back_top_air_temp: 28.7,
  back_mid_air_temp: 38.4,
  cpu_package_temp: 41,
  gpu_core_temp: 30,
  cooling_power: 158,
  cpu_package_power: 51,
  gpu_package_power: 38,
  liquid_flow_rate: 180.6,
  cpu_load: 2.9,
  memory_load: 45.7,
  gpu_load: 10,
  timestamp: new Date('2024-01-15T06:36:46.889287Z'),
};

const mockPerformanceMetric: Omit<PerformanceMetric, 'id'> = {
  inletTemperature: 29.1,
  outletTemperature: 29.9,
  coolingPower: 158,
  flowRate: 180.6,
  cpuTemperature: 41,
  cpuLoad: 2.9,
  cpuPower: 51,
  gpuTemperature: 30,
  gpuLoad: 10,
  gpuPower: 38,
  memoryLoad: 45.7,
  airMotherboardFrontTemperature: 31.9,
  airMotherboardBackTemperature: 38.4,
  airCaseTemperature: 28.7,
  createdAt: new Date('2024-01-15T06:36:46.889287Z'),
};

describe('generateMetric', () => {
  it('should return a flat metric', () => {
    expect(generateMetric(mockResponse)).toEqual(mockFlatResponse);
  });
});

describe('generateDatabaseMetric', () => {
  it('should return a database metric', () => {
    expect(generateDatabaseMetric(mockFlatResponse)).toEqual(mockPerformanceMetric);
  });
});
