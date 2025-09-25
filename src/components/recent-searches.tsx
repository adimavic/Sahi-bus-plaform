'use client';

import React, { useState, useEffect } from 'react';
import { SearchQuery } from '@/lib/types';

type RecentSearchesProps = {
  searches: SearchQuery[];
  onSearch: (query: SearchQuery) => void;
};

export function RecentSearches({ searches, onSearch }: RecentSearchesProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || searches.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 mt-3">
      <h3 className="text-sm font-medium text-gray-400">Recent:</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearch(search)}
            className="text-sm font-medium text-white opacity-80 hover:opacity-100 hover:underline transition-opacity"
          >
             <span>{search.source} - {search.destination}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
