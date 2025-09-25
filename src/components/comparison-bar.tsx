'use client';

import { Button } from './ui/button';
import { X, ArrowRightLeft } from 'lucide-react';

type ComparisonBarProps = {
  count: number;
  onCompare: () => void;
  onClear: () => void;
};

export function ComparisonBar({ count, onCompare, onClear }: ComparisonBarProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-primary text-primary-foreground rounded-lg shadow-2xl flex items-center gap-4 px-4 py-3 animate-in fade-in-0 slide-in-from-bottom-5">
        <div className="font-semibold">
          <span className="bg-primary-foreground text-primary rounded-full h-6 w-6 inline-flex items-center justify-center mr-2">{count}</span>
          Bus{count > 1 ? 'es' : ''} Selected
        </div>
        <Button variant="secondary" size="sm" onClick={onCompare}>
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Compare
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/80" onClick={onClear}>
          <X className="h-4 w-4" />
          <span className="sr-only">Clear selection</span>
        </Button>
      </div>
    </div>
  );
}
