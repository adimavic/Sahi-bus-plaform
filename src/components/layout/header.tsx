import { Bus } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container flex h-16 items-center justify-between text-white md:h-20">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Bus className="h-7 w-7 text-white" />
            <span className="inline-block font-headline font-bold text-xl">Sahibus</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="hover:underline transition-colors">Buses</Link>
            <Link href="#" className="hover:underline transition-colors">Operators</Link>
            <Link href="#" className="hover:underline transition-colors">Deals</Link>
            <Link href="#" className="hover:underline transition-colors">Help</Link>
        </nav>
        <div>
        </div>
      </div>
    </header>
  );
}
