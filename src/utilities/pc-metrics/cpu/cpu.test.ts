import {
  parseAquasuiteViewResponse,
  parseCoreTemps,
  findMinCoreTemp,
  findColdestCores,
  findHottestCores,
  findCoreTempDelta,
  findPerformanceCoreTempDelta,
  findEfficiencyCoreTempDelta,
  findExtremeCoresByCoreTypeAndExtremeType,
} from '@/utilities/pc-metrics/cpu';
import type {
  AquaSuiteViewResponse,
  CoreTemps,
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
  test('returns an empty object when no core temperatures are returned', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];
    for (let i = 1; i <= 24; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '30', i, u: 'C',
      });
    }
    const response = {
      d: [],
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    const output = Object.fromEntries(
      mockCoresArray.map((core) => [`CPU_CORE_${core.i - 1}_TEMP`, -100]),
    );

    expect(parseCoreTemps(response)).toEqual(output);
  });
  test('handles a malformed response', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];
    for (let i = 1; i <= 24; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '30', i, u: 'C',
      });
    }
    const response = {
      d: {},
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    } as AquaSuiteViewResponse;

    const output = Object.fromEntries(
      mockCoresArray.map((core) => [`CPU_CORE_${core.i - 1}_TEMP`, -100]),
    );

    expect(parseCoreTemps(response)).toEqual(output);
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
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];
    for (let i = 1; i <= 23; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '30', i, u: 'C',
      });
    }
    mockCoresArray.push({
      n: 'CPU_CORE_24_TEMP', v: '10', i: 24, u: 'C',
    });

    const input = {
      d: mockCoresArray,
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(findMinCoreTemp(parseCoreTemps(input))).toBe(10);
  });
});

describe('findColdestCores', () => {
  test('returns the core numbers for the coldest cores', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];

    for (let i = 1; i <= 4; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '20', i, u: 'C',
      });
    }

    for (let i = 5; i <= 24; i += 1) {
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

    expect(findColdestCores(parseCoreTemps(input))).toEqual([0, 1, 2, 3]);
  });
});

describe('findHottestCores', () => {
  test('returns the core numbers for the hottest cores', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];

    for (let i = 1; i <= 4; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '40', i, u: 'C',
      });
    }

    for (let i = 5; i <= 24; i += 1) {
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

    expect(findHottestCores(parseCoreTemps(input))).toEqual([0, 1, 2, 3]);
  });
});

describe('findCoreTempDelta', () => {
  test('returns the difference between the hottest and coldest cores', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];

    for (let i = 1; i <= 4; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '40', i, u: 'C',
      });
    }

    for (let i = 5; i <= 24; i += 1) {
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

    expect(findCoreTempDelta(parseCoreTemps(input))).toBe(10);
  });

  test('returns 0 when all core temperatures are the same', () => {
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

    expect(findCoreTempDelta(parseCoreTemps(input))).toBe(0);
  });

  test('returns -1 when the input is malformed', () => {
    const input: Partial<CoreTemps> & { BAD_CORE: number } = {
      BAD_CORE: 100,
    };

    expect(findCoreTempDelta(input as CoreTemps)).toBe(-1);
  });

  test('returns -1 when the input is empty', () => {
    expect(findCoreTempDelta({} as CoreTemps)).toBe(-1);
  });
});

describe('findPerformanceCoreTempDelta', () => {
  test('returns the difference between the hottest and coldest cores performance cores', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];

    for (let i = 1; i <= 6; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '40', i, u: 'C',
      });
    }

    mockCoresArray.push({
      n: 'CPU_CORE_7_TEMP', v: '45', i: 7, u: 'C',
    });

    mockCoresArray.push({
      n: 'CPU_CORE_8_TEMP', v: '35', i: 8, u: 'C',
    });

    for (let i = 9; i <= 24; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '0', i, u: 'C',
      });
    }

    const input = {
      d: mockCoresArray,
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(findPerformanceCoreTempDelta(parseCoreTemps(input))).toBe(10);
  });
});

describe('findEfficiencyCoreTempDelta', () => {
  test('returns the difference between the hottest and coldest cores efficiency cores', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];

    [1, 2, 3, 4, 5, 6, 7, 8].forEach((i) => {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '0', i, u: 'C',
      });
    });

    [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].forEach((i) => {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '40', i, u: 'C',
      });
    });

    mockCoresArray.push({
      n: 'CPU_CORE_23_TEMP', v: '45', i: 23, u: 'C',
    });

    mockCoresArray.push({
      n: 'CPU_CORE_24_TEMP', v: '35', i: 24, u: 'C',
    });

    const input = {
      d: mockCoresArray,
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(findEfficiencyCoreTempDelta(parseCoreTemps(input))).toBe(10);
  });
});

describe('findExtremeCoresByCoreTypeAndExtremeType', () => {
  test('returns single hottest performance core', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];

    for (let i = 1; i <= 6; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '40', i, u: 'C',
      });
    }

    mockCoresArray.push({
      n: 'CPU_CORE_7_TEMP', v: '45', i: 7, u: 'C',
    });

    mockCoresArray.push({
      n: 'CPU_CORE_8_TEMP', v: '35', i: 8, u: 'C',
    });

    for (let i = 9; i <= 24; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '0', i, u: 'C',
      });
    }

    const input = {
      d: mockCoresArray,
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(findExtremeCoresByCoreTypeAndExtremeType(parseCoreTemps(input), 'performance', 'hottest')).toEqual([6]);
  });

  test('returns multiple hottest performance cores', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];

    for (let i = 1; i <= 6; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '40', i, u: 'C',
      });
    }

    mockCoresArray.push({
      n: 'CPU_CORE_7_TEMP', v: '45', i: 7, u: 'C',
    });

    mockCoresArray.push({
      n: 'CPU_CORE_8_TEMP', v: '45', i: 8, u: 'C',
    });

    for (let i = 9; i <= 24; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '0', i, u: 'C',
      });
    }

    const input = {
      d: mockCoresArray,
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(findExtremeCoresByCoreTypeAndExtremeType(parseCoreTemps(input), 'performance', 'hottest')).toEqual([6, 7]);
  });

  test('returns all performance cores when temperatures are equal', () => {
    const mockCoresArray: AquaSuiteViewResponse['d'] = [];

    for (let i = 1; i <= 8; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '40', i, u: 'C',
      });
    }

    for (let i = 9; i <= 24; i += 1) {
      mockCoresArray.push({
        n: `CPU_CORE_${i}_TEMP`, v: '0', i, u: 'C',
      });
    }

    const input = {
      d: mockCoresArray,
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    expect(findExtremeCoresByCoreTypeAndExtremeType(parseCoreTemps(input), 'performance', 'hottest')).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });
});
