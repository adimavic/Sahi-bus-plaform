'use client';

import { SearchQuery } from '@/lib/types';
import { ArrowRight, History } from 'lucide-react';

type RecentSearchesProps = {
  searches: SearchQuery[];
  onSearch: (query: SearchQuery) => void;
};

export function RecentSearches({ searches, onSearch }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <History className="h-4 w-4" />
        <h3 className="font-medium">Recent Searches:</h3>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearch(search)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 hover:bg-secondary rounded-full text-sm font-medium text-secondary-foreground transition-colors"
          >
            <span>{search.source}</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
            <span>{search.destination}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
