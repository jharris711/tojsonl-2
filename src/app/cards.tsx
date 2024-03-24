'use client';

import React from 'react';

import UploadFile from '@/components/upload-file';
import DownloadFile from '@/components/download-file';
import { JsonlProvider } from '@/contexts/jsonl-context';

export default function Cards() {
  return (
    <JsonlProvider>
      <UploadFile />
      <DownloadFile />
    </JsonlProvider>
  );
}
