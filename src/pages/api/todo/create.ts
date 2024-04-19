import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Todo } from '@prisma/client';

const prisma = new PrismaClient();

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      title, description, duedate, user,
    } = req.query as unknown as Todo;

    console.log(req.query);

    if (!title || !description || !duedate || !user) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const todo = await prisma.todo.create({
        data: {
          user,
          title,
          description,
          completed: false,
          duedate: new Date(duedate),
        },
      });
      res.status(200).json({ ...todo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
