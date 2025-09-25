import { Bus } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Bus className="h-6 w-6 text-primary" />
            <span className="inline-block font-headline font-bold text-lg">Sahibus</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
