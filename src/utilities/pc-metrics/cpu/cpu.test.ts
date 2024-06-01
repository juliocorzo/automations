import { parseAquasuiteViewResponse, parseCoreTemps } from '@/utilities/pc-metrics/cpu';
import type { AquaSuiteViewResponse } from '@/utilities/pc-metrics/cpu';

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
    const response = {
      d: {},
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    } as AquaSuiteViewResponse;

    expect(parseCoreTemps(response)).toEqual({});
  });
  test.skip('handles a response with a custom core count', () => {
    const coresArray = Array.from({ length: 24 }, (_, i) => ({
      n: `CPU_CORE_${i}_TEMP`, v: '30', i, u: 'C',
    })) as AquaSuiteViewResponse['d'];

    const response = {
      d: coresArray,
      g: '123',
      n: '456',
      t: '2021-09-10T12:00:00',
    };

    const parsedResponse = Object.fromEntries(
      coresArray.map((core) => [core.n, parseFloat(core.v)]),
    );

    console.log(parsedResponse);

    console.log(parseCoreTemps(response, 24));

    expect(parseCoreTemps(response, 24)).toEqual(parsedResponse);
  });
});
