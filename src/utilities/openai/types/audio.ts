import type {
  TranscriptionCreateParams,
} from 'openai/resources/audio/transcriptions.mjs';
import { toFile } from 'openai';
import type { Uploadable } from 'openai/uploads.mjs';

type VanillaTypeOmits = 'File' | 'language' | 'model' | 'temperature';

export interface TranscriptionParameters extends Omit<TranscriptionCreateParams, VanillaTypeOmits> {
  file: Uploadable;
  model: 'whisper-1';
  language?: 'en' | 'es' | 'fr';
  temperature?: number;
}

export class TranscriptionOptions {
  readonly file: TranscriptionParameters['file'];

  readonly model: TranscriptionParameters['model'];

  readonly language: TranscriptionParameters['language'];

  readonly prompt: TranscriptionParameters['prompt'];

  readonly temperature: TranscriptionParameters['temperature'];

  readonly response_format: TranscriptionParameters['response_format'];

  constructor({
    file,
    model = 'whisper-1',
    language = 'en',
    prompt,
    response_format = 'text',
    temperature = 0.5,
  }: TranscriptionParameters) {

    const allowedFileMimeTypes = ['audio/mpeg', 'audio/mp4', 'audio/aac', 'audio/wav', 'audio/webm'];
    const allowedFileExtensions = ['mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm'];

    // If standard number, convert to Temperature
    if (temperature < 0 || temperature > 1) {
      throw new Error('Temperature must be between 0 and 1');
    }

    if (file.size > 25 * 1048576) {
      throw new Error(`File size must be less than 25MB (${internalFile.size / 1048576} MB)`);
    }

    if (!allowedFileMimeTypes.includes(file.type)) {
      throw new Error(`Incorrect file type ${file.type}. File type must be one of ${allowedFileMimeTypes.join(', ')}`);
    }

    this.file = await toFile(file);
    this.model = model;
    this.language = language;
    this.temperature = temperature;
    this.prompt = prompt;
    this.response_format = response_format;
  }
}
