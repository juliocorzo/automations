import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

const {
  PC_METRIC_DB_UPDATE_KEY,
  PC_METRIC_DB_DANGEROUS_UPDATES_ENABLED,
} = process.env;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.headers.authorization !== `Bearer ${PC_METRIC_DB_UPDATE_KEY}`) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  if (PC_METRIC_DB_DANGEROUS_UPDATES_ENABLED !== 'true') {
    return response.status(403).json({ error: 'Dangerous database updates disabled' });
  }

  try {
    const result = await sql`CREATE TABLE pcmetrics (
      id SERIAL PRIMARY KEY NOT NULL,
      cpu_package_temp FLOAT NOT NULL,
      cpu_package_power FLOAT NOT NULL,
      cpu_core_utilization INT NOT NULL,
      gpu_package_power FLOAT NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
