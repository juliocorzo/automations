/** Aquasuite response */
export type AquasuiteFlatResponse = {
  CPU_POWER_DRAW: number;
  CPU_TEMP_MAX: number;
  timestamp: Date;
};

/** Aquasuite response */
export type AquasuiteResponse = {
  /** Array of individual metrics */
  d: {
    /** Metric index */
    i: number;
    /** Metric name */
    n: string;
    /** Metric unit */
    u: string;
    /** Metric value */
    v: string;
  }[];
  /** Timestamp */
  t: Date;
  /** Token */
  g: string;
  /** Version */
  n: string;
};
