'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useJsonl } from '@/contexts/jsonl-context';

const ACCEPTED_FILE_TYPES = {
  'application/json': ['.json']
};

export default function UploadFile() {
  const { isLoading, convertJsonFile } = useJsonl();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: ACCEPTED_FILE_TYPES
  });

  const files = acceptedFiles.map((file: File) => (
    <li key={file.name}>{file.name}</li>
  ));

  const uploadfile = () => {
    convertJsonFile(acceptedFiles[0]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload your file</CardTitle>
        <CardDescription>
          Select a JSON file to convert to JSONLines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps({
            className:
              'flex flex-1 flex-col items-center p-5 border-2 border-dashed border-gray-300 rounded bg-gray-200 text-gray-400 outline-none transition-all duration-200 ease-in-out hover:border-gray-400'
          })}
        >
          <input {...getInputProps()} />
          <p>
            Drag &lsquo;n&rsquo; drop a file here, or click to select a file
          </p>
        </div>
        <br />
        <aside>
          {isLoading ? (
            <>
              <div className="size-8 animate-spin bg-black" />
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Converting your data...
              </p>
            </>
          ) : (
            <>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                File:
              </h4>
              <ul className="my-6 ml-6 list-none">{files}</ul>
            </>
          )}
        </aside>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button type="button" onClick={uploadfile}>
          Convert to JSONL
        </Button>
      </CardFooter>
    </Card>
  );
}
