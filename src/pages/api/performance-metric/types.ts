/** Aquasuite response */
export type AquasuiteFlatResponse = {
  liquid_in_temp: number;
  liquid_out_temp: number;
  front_mid_air_temp: number;
  back_top_air_temp: number;
  back_mid_air_temp: number;
  cpu_package_temp: number;
  gpu_core_temp: number;
  cooling_power: number;
  cpu_package_power: number;
  gpu_package_power: number;
  liquid_flow_rate: number;
  cpu_load: number;
  gpu_load: number;
  memory_load: number;
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
