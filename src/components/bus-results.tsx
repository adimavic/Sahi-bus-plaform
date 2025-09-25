'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Bus, SearchQuery } from '@/lib/types';
import { generateMockBuses } from '@/lib/data';
import { BusCard } from './bus-card';
import { Skeleton } from './ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Map } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';

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
  const [filterWeekend, setFilterWeekend] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

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

  const filteredBuses = useMemo(() => {
    if (!query) return [];
    const searchDate = new Date(query.date);
    const dayOfWeek = searchDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    return buses.filter(() => {
        if (!filterWeekend) return true;
        return isWeekend;
    });
  }, [buses, filterWeekend, query]);
  
  const paginatedBuses = useMemo(() => {
      const startIndex = (currentPage - 1) * BUSES_PER_PAGE;
      return filteredBuses.slice(startIndex, startIndex + BUSES_PER_PAGE);
  }, [filteredBuses, currentPage]);
  
  const totalPages = Math.ceil(filteredBuses.length / BUSES_PER_PAGE);

  if (isSearching) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/6" />
            </div>
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
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
        <h2 className="text-xl font-headline font-semibold">{filteredBuses.length} buses found</h2>
        <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center space-x-2">
                <Switch id="weekend-toggle" checked={filterWeekend} onCheckedChange={setFilterWeekend} />
                <Label htmlFor="weekend-toggle">Weekend</Label>
            </div>
            <Select defaultValue="rating">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="rating">Sort by rating</SelectItem>
                    <SelectItem value="price">Sort by price</SelectItem>
                    <SelectItem value="departure">Sort by departure</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => toast({ title: "Map View", description: "This feature is coming soon!" })}>
                <Map className="mr-2 h-4 w-4" /> Show Map
            </Button>
        </div>
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
