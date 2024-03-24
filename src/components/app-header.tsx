import React from 'react';
import Link from 'next/link';
import { Package2 } from 'lucide-react';

interface Props {
  name: string;
}

export default function AppHeader({ name }: Props) {
  return (
    <header className="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="size-6" /> {name}
          <span className="sr-only">{name}</span>
        </Link>
      </nav>
    </header>
  );
}
