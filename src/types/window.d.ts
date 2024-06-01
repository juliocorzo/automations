import type { noticeError } from 'newrelic';

declare global {
  interface Window {
    newrelic: {
      noticeError: noticeError;
    }
  }
}
