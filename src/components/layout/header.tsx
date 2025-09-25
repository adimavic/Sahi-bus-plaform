import { Bus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="bg-card sticky top-0 z-50 w-full border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Bus className="h-7 w-7 text-primary" />
            <span className="inline-block font-headline font-bold text-xl text-gray-800">Sahibus</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="#" className="hover:text-primary transition-colors">Buses</Link>
            <Link href="#" className="hover:text-primary transition-colors">Operators</Link>
            <Link href="#" className="hover:text-primary transition-colors">Deals</Link>
            <Link href="#" className="hover:text-primary transition-colors">Help</Link>
        </nav>
        <div>
            <Button className="rounded-full font-semibold">Login / Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
