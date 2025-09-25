import { Bus } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full">
      <div className="container flex h-16 items-center justify-between text-white md:h-20">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Bus className="h-7 w-7 text-white" />
            <span className="inline-block font-headline font-bold text-xl">Sahibus</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="hover:underline transition-colors opacity-80 hover:opacity-100">Buses</Link>
            <Link href="#" className="hover:underline transition-colors opacity-80 hover:opacity-100">Operators</Link>
            <Link href="#" className="hover:underline transition-colors opacity-80 hover:opacity-100">Deals</Link>
            <Link href="#" className="hover:underline transition-colors opacity-80 hover:opacity-100">Help</Link>
        </nav>
      </div>
    </header>
  );
}
