import type { NextApiRequest, NextApiResponse } from 'next';
import type { AppleAudiobookResponse } from '@/types/media/apple/audiobook';
import { isAppleAudiobookResponse } from '@/types/media/apple/audiobook';
import {
  generateSearchUrl, parseResponse,
} from '@/pages/api/media/apple/audiobook';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { term, country = 'us' } = req.query;

  // Validate that only one string is passed for each query parameter
  if (Array.isArray(term) || Array.isArray(country)) {
    res.status(400).json({ error: 'Query parameters must be unique' });
    return;
  }

  // Validate that search term is provided and not empty
  if (!term || term === '') {
    res.status(400).json({ error: 'Search term parameter must be provided' });
    return;
  }

  const url = generateSearchUrl(term, 'audiobook', country);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(503).json({
        error: `Failed to fetch data from the Apple API. External response was ${response.status} ${response.statusText}`,
      });
      return;
    }

    const appleResponse: unknown = await response.json();

    if (!isAppleAudiobookResponse(appleResponse)) {
      res.status(500).json({ error: 'Invalid response from the Apple API' });
      return;
    }

    // Type guard above ensures that the response is the expected type, unsure why TS is not happy
    const internalResponse = parseResponse(appleResponse as AppleAudiobookResponse);

    res.status(200).json(internalResponse);
  } catch (error) {
    res.status(500).json({ error: 'Unknown error when fetching data from the Apple API' });
  }
}
