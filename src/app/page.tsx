import Link from 'next/link';
import Cards from './cards';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">
            Convert your data to JSONLines
          </h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <div className="grid gap-6">
            <Cards />
          </div>
        </div>
      </main>
    </div>
  );
}
