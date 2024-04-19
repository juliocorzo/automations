import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const {
      id,
    } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const toDeleteTodo = await prisma.todo.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!toDeleteTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      const todo = await prisma.todo.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({ ...todo });
    } catch (error) {
      return res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
