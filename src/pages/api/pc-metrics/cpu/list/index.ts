import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();

    const allRows = await prisma.cpuMetric.findMany();

    prisma.$disconnect();

    if (allRows) {
      return res.status(200).json({ data: allRows });
    }

    return res.status(404).json({ error: 'No data found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
