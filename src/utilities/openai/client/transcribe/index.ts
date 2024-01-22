import { TranscriptionOptions } from '@/utilities/openai/types/audio';
import type { TranscriptionParameters } from '@/utilities/openai/types/audio';
import OpenAI from 'openai';

const openai = new OpenAI();

export const transcribe = async (options: TranscriptionParameters) => {
  const transcriptionOptions = new TranscriptionOptions({
    ...options,
  });

  const response = await openai.audio.transcriptions.create({
    file: transcriptionOptions.file,
    model: transcriptionOptions.model,
    language: transcriptionOptions.language,
    prompt: transcriptionOptions.prompt,
    response_format: transcriptionOptions.response_format,
    temperature: transcriptionOptions.temperature,
  });

  return response;
};
