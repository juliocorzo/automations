/** Response from Aquasuite when `/view` path is used */
export type AquaSuiteViewResponse = {
  /** Array of all metrics */
  d: {
    /** Index of array object */
    i: number;
    /** Metric name */
    n: string;
    /** Metric unit */
    u: string;
    /** Metric value */
    v: string;
  }[];
  /** Aquasuite key (do not return as part of response) */
  g: string;
  /** Internal Aquasuite data export name */
  n: string;
  /** ISO8601 timestamp of date export */
  t: string;
};

/** Response from Aquasuite when `/circonus` path is used */
export type AquaSuiteCirconusResponse = {
  /** Power draw of CPU package, measured in W */
  CPU_PACKAGE_POWER: string;
  /** Temperature of CPU package, measured in C */
  CPU_PACKAGE_TEMP: string;
  /** Percentage of CPU compute utilized */
  CPU_CORE_UTILIZATION: number;
  /** Power draw of GPU package, measured in W */
  GPU_PACKAGE_POWER: string;
};
