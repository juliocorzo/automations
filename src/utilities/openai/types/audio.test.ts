import 'openai/shims/node';
import { toFile } from 'openai';
import { TranscriptionOptions } from './audio';

const getDefaults = async () => ({
  file: await toFile(Buffer.from([]), 'speech.mp3'),
  prompt: `
  The following is a transcription of an interview between a journalist and a
  celebrity, where both speakers are separated by line breaks.
  
  For example:

  Journalist: What is your profession?
  Celebrity: I'm a software engineer.`,
});

describe('TranscriptionOptions', () => {
  it('should set defaults', async () => {
    const defaults = await getDefaults();

    const transcriptionOptions = new TranscriptionOptions({
      ...(await getDefaults()),
    });

    expect(transcriptionOptions).toEqual({
      ...defaults,
      model: 'whisper-1',
      language: 'en',
      response_format: 'text',
      temperature: 0.5,
    });
  });

  it('should thrown an error if temperature is not between 0 and 1', async () => {
    const defaults = await getDefaults();

    const transcriptionOptions = {
      ...defaults,
      temperature: 1.2,
    };

    expect(() => new TranscriptionOptions(transcriptionOptions)).toThrow('Temperature must be between 0 and 1');
  });
});
