'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useJsonl } from '@/contexts/jsonl-context';

export default function DownloadFile() {
  const { filename, jsonlData, isLoading } = useJsonl();
  const filenameWithoutExtension = filename.split('.').shift();

  const downloadJsonlFile = () => {
    const blob = new Blob([jsonlData], { type: 'text/jsonl' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `converted-${filenameWithoutExtension}.jsonl`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card
      className={`${!isLoading && jsonlData ? 'border border-green-400' : ''}`}
    >
      <CardHeader>
        <CardTitle>Download your JSONL</CardTitle>
        <CardDescription>Thanks for using toJSONL.com!</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          className="border border-gray-300 disabled:placeholder:dark:text-gray-300"
          type="text"
          placeholder={
            filename ? `converted-${filenameWithoutExtension}.jsonl` : ''
          }
          disabled
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={downloadJsonlFile} disabled={!jsonlData}>
          Download JSONL file
        </Button>
      </CardFooter>
    </Card>
  );
}
