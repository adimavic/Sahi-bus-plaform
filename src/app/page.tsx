'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Bus, SearchQuery, SortOption } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { BusSearchForm } from '@/components/bus-search-form';
import { BusResults } from '@/components/bus-results';
import { ComparisonBar } from '@/components/comparison-bar';
import { ComparisonModal } from '@/components/comparison-modal';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarTrigger } from '@/components/ui/sidebar';
import { Filters } from '@/components/filters';
import { generateMockBuses } from '@/lib/data';
import Image from 'next/image';

export default function Home() {
    const [query, setQuery] = useState<SearchQuery | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    
    const [allBuses, setAllBuses] = useState<Bus[]>([]);
    const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    const [recentSearches, setRecentSearches] = useLocalStorage<SearchQuery[]>('recent-searches', []);

    // Filter states
    const [sortBy, setSortBy] = useState<SortOption>('price');
    const [priceRange, setPriceRange] = useState<number[]>([1000]);
    const [seatType, setSeatType] = useState<string>('all');
    const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
    
    const operators = useMemo(() => [...new Set(allBuses.map(bus => bus.operator.name))], [allBuses]);
    const maxPrice = useMemo(() => Math.max(...allBuses.flatMap(bus => [...bus.otas, bus.directBooking].filter(Boolean).map(ota => parseFloat(ota!.price.replace(/[^0-9.-]+/g,"")))), 0) || 1000, [allBuses]);

    const handleSearch = useCallback((newQuery: SearchQuery) => {
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

        // Simulate API call
        setTimeout(() => {
            const mockBuses = generateMockBuses(newQuery);
            setAllBuses(mockBuses);
            const newMaxPrice = Math.max(...mockBuses.flatMap(bus => [...bus.otas, bus.directBooking].filter(Boolean).map(ota => parseFloat(ota!.price.replace(/[^0-9.-]+/g,"")))), 0) || 1000;
            setPriceRange([newMaxPrice]);
            setSelectedOperators([]);
            setSortBy('price');
            setSeatType('all');
            setIsSearching(false);
        }, 1000);
    }, [recentSearches, setRecentSearches]);

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

    const getMinPrice = (bus: Bus) => {
        const prices = [...bus.otas, bus.directBooking]
            .filter(Boolean)
            .map(ota => parseFloat(ota!.price.replace(/[^0-9.]/g, '')));
        return Math.min(...prices);
    }
    
    const filteredBuses = useMemo(() => {
        let buses = [...allBuses];

        // Filter by price
        buses = buses.filter(bus => getMinPrice(bus) <= priceRange[0]);

        // Filter by seat type
        if (seatType !== 'all') {
            buses = buses.filter(bus => 
                seatType === 'sleeper' ? bus.features.includes('Sleeper') : !bus.features.includes('Sleeper')
            );
        }

        // Filter by operators
        if (selectedOperators.length > 0) {
            buses = buses.filter(bus => selectedOperators.includes(bus.operator.name));
        }

        // Sort buses
        buses.sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return getMinPrice(a) - getMinPrice(b);
                case 'rating':
                    return b.operator.rating - a.operator.rating;
                case 'departure':
                    return a.departureTime.localeCompare(b.departureTime);
                case 'duration':
                    const durationA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1]?.replace('m', '') || '0');
                    const durationB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1]?.replace('m', '') || '0');
                    return durationA - durationB;
                default:
                    return 0;
            }
        });

        return buses;
    }, [allBuses, sortBy, priceRange, seatType, selectedOperators]);

    
    const busesToCompare = allBuses.filter(bus => compareIds.has(bus.id));

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full flex-col bg-background">
                <div className="relative bg-navy text-white pb-10">
                    <div className="container relative z-10">
                        <Header />
                        <div className="pt-16 pb-12 md:pt-20 md:pb-16 text-center">
                            <h1 className="text-4xl font-headline font-bold tracking-tight md:text-5xl drop-shadow-md">
                                The best bus offers anywhere across India
                            </h1>
                            <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-sm">
                                Compare prices from RedBus, MakeMyTrip, AbhiBus, and more in one place.
                            </p>
                        </div>
                         <BusSearchForm onSearch={handleSearch} isSearching={isSearching} />
                    </div>

                    <Image
                        src="https://picsum.photos/seed/bus-travel/1800/600"
                        alt="Scenic bus route"
                        fill
                        className="object-cover z-0 opacity-20"
                        data-ai-hint="ocean waves"
                    />
                </div>

                <div className="flex flex-1 container py-6 md:py-10">
                    {query && (
                        <Sidebar>
                            <SidebarContent>
                                <Filters
                                    operators={operators}
                                    maxPrice={maxPrice}
                                    sortBy={sortBy}
                                    onSortByChange={setSortBy}
                                    priceRange={priceRange}
                                    onPriceChange={setPriceRange}
                                    seatType={seatType}
                                    onSeatTypeChange={setSeatType}
                                    selectedOperators={selectedOperators}
                                    onSelectedOperatorsChange={setSelectedOperators}
                                />
                            </SidebarContent>
                        </Sidebar>
                    )}
                    <SidebarInset className="bg-background !ml-0">
                        <main className="flex-1">
                            {query && (
                                <div className="flex items-center mb-4">
                                    <SidebarTrigger className="md:hidden"/>
                                    <h2 className="text-lg font-semibold ml-2 md:hidden">Filters & Sort</h2>
                                </div>
                            )}
                            <BusResults 
                                query={query}
                                buses={filteredBuses}
                                isSearching={isSearching}
                                compareIds={compareIds}
                                toggleCompare={toggleCompare}
                            />
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
