import type { NextApiRequest, NextApiResponse } from 'next';

type MediaType = 'audiobook';

const generateSearchUrl = (query: string = '', type: MediaType = 'audiobook', country: string = 'us'): string => (
  `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=${type}&country=${country}`
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query = '', type = 'audiobook', country = 'us' } = req.query;
  const url = generateSearchUrl(query as string, type as MediaType, country as string);

  res.status(200).json({ url });
}
