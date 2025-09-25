'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Bus, SearchQuery } from '@/lib/types';
import { generateMockBuses } from '@/lib/data';
import { BusCard } from './bus-card';
import { Skeleton } from './ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';

type BusResultsProps = {
  query: SearchQuery | null;
  setAllBuses: (buses: Bus[]) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  compareIds: Set<string>;
  toggleCompare: (busId: string) => void;
};

const BUSES_PER_PAGE = 5;

export function BusResults({ query, setAllBuses, isSearching, setIsSearching, compareIds, toggleCompare }: BusResultsProps) {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (query) {
      // Reset state for new search
      setBuses([]);
      setCurrentPage(1);

      const timer = setTimeout(() => {
        const mockBuses = generateMockBuses(query);
        setBuses(mockBuses);
        setAllBuses(mockBuses);
        setIsSearching(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [query, setAllBuses, setIsSearching]);

  const paginatedBuses = useMemo(() => {
      const startIndex = (currentPage - 1) * BUSES_PER_PAGE;
      return buses.slice(startIndex, startIndex + BUSES_PER_PAGE);
  }, [buses, currentPage]);
  
  const totalPages = Math.ceil(buses.length / BUSES_PER_PAGE);

  if (isSearching) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
              </div>
               <div className="text-center">
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="text-right space-y-2">
                    <Skeleton className="h-4 w-20 ml-auto" />
                    <Skeleton className="h-3 w-16 ml-auto" />
                </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
        <p className="font-medium">Your search results will appear here</p>
        <p className="text-sm">Enter your route and travel date to find buses.</p>
      </div>
    );
  }
  
  if (buses.length > 0 && paginatedBuses.length === 0 && currentPage > 1) {
    setCurrentPage(totalPages);
  }

  if (buses.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
        <p className="font-medium">No buses found for this route</p>
        <p className="text-sm">Try adjusting your search criteria or date.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-headline font-semibold">{buses.length} buses found</h2>
      </div>
      
      <div className="space-y-4">
        {paginatedBuses.map((bus) => (
          <BusCard
            key={bus.id}
            bus={bus}
            isComparing={compareIds.has(bus.id)}
            onCompareToggle={() => toggleCompare(bus.id)}
            canCompare={compareIds.size < 3 || compareIds.has(bus.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p-1)) }} aria-disabled={currentPage === 1} />
            </PaginationItem>
            <PaginationItem>
                <span className="px-4 text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p+1)) }} aria-disabled={currentPage === totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
