'use client';

import React, { useState } from 'react';
import { Bus, SearchQuery } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { BusSearchForm } from '@/components/bus-search-form';
import { RecentSearches } from '@/components/recent-searches';
import { BusResults } from '@/components/bus-results';
import { ComparisonBar } from '@/components/comparison-bar';
import { ComparisonModal } from '@/components/comparison-modal';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarTrigger } from '@/components/ui/sidebar';
import { Filters } from '@/components/filters';

export default function Home() {
    const [query, setQuery] = useState<SearchQuery | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    
    const [allBuses, setAllBuses] = useState<Bus[]>([]);
    const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    const [recentSearches, setRecentSearches] = useLocalStorage<SearchQuery[]>('recent-searches', []);

    const handleSearch = (newQuery: SearchQuery) => {
        setIsSearching(true);
        setQuery(newQuery);
        setCompareIds(new Set()); 

        const isDuplicate = recentSearches.some(
            (r) => r.source === newQuery.source && r.destination === newQuery.destination && r.country === newQuery.country
        );

        if (!isDuplicate) {
            const newRecent = [newQuery, ...recentSearches].slice(0, 5);
            setRecentSearches(newRecent);
        }
    };

    const toggleCompare = (busId: string) => {
        setCompareIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(busId)) {
                newSet.delete(busId);
            } else if (newSet.size < 3) {
                newSet.add(busId);
            }
            return newSet;
        });
    };
    
    const busesToCompare = allBuses.filter(bus => compareIds.has(bus.id));

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full flex-col bg-background">
                <Header />
                <div className="flex flex-1">
                    <Sidebar>
                        <SidebarContent>
                            <Filters buses={allBuses} />
                        </SidebarContent>
                    </Sidebar>
                    <SidebarInset>
                        <main className="container flex-1 py-6 md:py-10">
                             <div className="flex items-center mb-4 md:hidden">
                                <SidebarTrigger />
                                <h2 className="text-lg font-semibold ml-2">Filters & Sort</h2>
                            </div>
                            <section className="text-center">
                                <h1 className="text-3xl font-headline font-bold tracking-tight md:text-5xl">
                                    Find The Best Bus Deals
                                </h1>
                                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Your one-stop destination to compare bus ticket prices from top providers and book the cheapest fares.
                                </p>
                            </section>
                            
                            <section className="mt-8 max-w-4xl mx-auto">
                                <BusSearchForm onSearch={handleSearch} isSearching={isSearching} />
                                <RecentSearches searches={recentSearches} onSearch={handleSearch} />
                            </section>

                            <section className="mt-12">
                                <BusResults 
                                    query={query}
                                    setAllBuses={setAllBuses} 
                                    isSearching={isSearching}
                                    setIsSearching={setIsSearching}
                                    compareIds={compareIds}
                                    toggleCompare={toggleCompare}
                                />
                            </section>
                        </main>
                    </SidebarInset>
                </div>
                
                {compareIds.size > 0 && (
                     <ComparisonBar 
                        count={compareIds.size}
                        onCompare={() => setIsCompareModalOpen(true)}
                        onClear={() => setCompareIds(new Set())}
                     />
                )}

                <ComparisonModal 
                    isOpen={isCompareModalOpen}
                    onOpenChange={setIsCompareModalOpen}
                    buses={busesToCompare}
                />
            </div>
        </SidebarProvider>
    );
}
