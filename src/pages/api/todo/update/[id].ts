import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    // Get ID from query parameter ([id].ts)
    const { id } = req.query;
    // Get completed boolean from request body
    const { completed } = req.body;

    // Handle case where ID is not passed impossible due to the fact that this is a dynamic route)
    if (!id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate that todo exists
    try {
      const currentTodo = await prisma.todo.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!currentTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      // Update todo with new completed value
      const updatedTodo = await prisma.todo.update({
        where: {
          id: Number(id),
        },
        data: {
          completed,
        },
      });
      res.status(200).json({ data: updatedTodo });
    } catch (error) {
      return res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
