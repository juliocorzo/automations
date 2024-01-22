import { toFile } from 'openai';
import openai from '@/utilities/openai/client';
import { TranscriptionOptions } from '@/utilities/openai/types/audio';

const main = async () => {
  const inputFile = await toFile(Buffer.from([]), 'speech.mp3');

  const transcriptionOptions = new TranscriptionOptions({
    file: inputFile,
    temperature: 0.5,
  });
};
