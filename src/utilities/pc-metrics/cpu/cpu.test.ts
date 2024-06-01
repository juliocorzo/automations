import {
  parseAquasuiteViewResponse,
  parseCoreTemps,
  findMinCoreTemp,
  // findHottestCores,
  // findColdestCores,
} from '@/utilities/pc-metrics/cpu';
import type {
  AquaSuiteViewResponse,
  CoreTemps,
  // CoreNumbers,
} from '@/utilities/pc-metrics/cpu';

describe('parseAquasuiteViewResponse', () => {
  test('returns values from the call to get PC metrics from API', () => {
    const response = {
      d: [{
        n: 'CPU_PACKAGE_POWER', v: '100', i: 1, u: 'W',
      }],
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(parseAquasuiteViewResponse(response)).toEqual({
      CPU_PACKAGE_POWER: '100',
    });
  });
  test('returns an empty object when no metrics are returned', () => {
    const response = {
      d: [],
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(parseAquasuiteViewResponse(response)).toEqual({});
  });
  test('handles a malformed response', () => {
    const response = {
      d: {},
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    } as AquaSuiteViewResponse;

    expect(parseAquasuiteViewResponse(response)).toEqual({});
  });
});

describe('parseCoreTemps', () => {
  test('returns core temperatures from the call to get PC metrics from API', () => {
    const response = {
      d: [
        {
          n: 'CPU_CORE_1_TEMP', v: '100', i: 1, u: 'C',
        },
        {
          n: 'CPU_CORE_2_TEMP', v: '90', i: 2, u: 'C',
        },
      ],
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(parseCoreTemps(response)).toEqual({
      CPU_CORE_0_TEMP: 100,
      CPU_CORE_1_TEMP: 90,
    });
  });
  test('returns an empty object when no core temperatures are returned', () => {
    const response = {
      d: [],
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(parseCoreTemps(response)).toEqual({});
  });
  test('handles a malformed response', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const response = {
      d: {},
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    } as AquaSuiteViewResponse;

    const result = parseCoreTemps(response);
    expect(result).toEqual({});
    expect(consoleError).toHaveBeenCalled();
  });
  test('handles a response with a 24 cores', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];
    for (let i = 1; i <= 24; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '30', i, u: 'C',
      });
    }

    const input = {
      d: mockCoresArray,
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    const output = Object.fromEntries(
      mockCoresArray.map((core) => [`CPU_CORE_${core.i - 1}_TEMP`, parseFloat(core.v)]),
    );

    expect(parseCoreTemps(input)).toEqual(output);
  });
});

describe('findMinCoreTemp', () => {
  test('returns the minimum core temperature', () => {
    const coreTemps: CoreTemps = {
      CPU_CORE_0_TEMP: 100,
      CPU_CORE_1_TEMP: 90,
      CPU_CORE_2_TEMP: 42,
    };

    expect(findMinCoreTemp(coreTemps)).toBe(42);
  });

  test('returns the minimum core temperature when there is only one core', () => {
    const coreTemps: CoreTemps = {
      CPU_CORE_0_TEMP: 42,
    };

    expect(findMinCoreTemp(coreTemps)).toBe(42);
  });

  test('returns the minimum core temperature when there are multiple cores', () => {
    const coreTemps: CoreTemps = {
      CPU_CORE_0_TEMP: 100,
      CPU_CORE_1_TEMP: 90,
      CPU_CORE_2_TEMP: 42,
    };

    expect(findMinCoreTemp(coreTemps)).toBe(42);
  });
});
