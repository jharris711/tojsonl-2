// JsonlContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback
} from 'react';

interface JsonlContextType {
  jsonlData: string;
  filename: string;
  isLoading: boolean;
  convertJsonFile: (file: File) => Promise<void>;
}

const JsonlContext = createContext<JsonlContextType | undefined>(undefined);

interface JsonlProviderProps {
  children: ReactNode;
}

export const JsonlProvider: React.FC<JsonlProviderProps> = ({ children }) => {
  const [jsonlData, setJsonlData] = useState<string>('');
  const [filename, setFilename] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const convertJsonFile = useCallback(async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      setFilename(file.name);
      setJsonlData(data.jsonl);
      setIsLoading(false);
    } catch (error) {
      console.error('Error converting file:', error);
      setIsLoading(false);
    }
  }, []);

  return (
    <JsonlContext.Provider
      value={{ jsonlData, filename, isLoading, convertJsonFile }}
    >
      {children}
    </JsonlContext.Provider>
  );
};

export const useJsonl = (): JsonlContextType => {
  const context = useContext(JsonlContext);
  if (context === undefined) {
    throw new Error('useJsonl must be used within a JsonlProvider');
  }
  return context;
};
