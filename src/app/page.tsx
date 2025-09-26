'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Bus, SearchQuery, SortOption, TimeSlot } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { BusSearchForm } from '@/components/bus-search-form';
import { BusResults } from '@/components/bus-results';
import { ComparisonBar } from '@/components/comparison-bar';
import { ComparisonModal } from '@/components/comparison-modal';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';
import { Filters } from '@/components/filters';
import { generateMockBuses } from '@/lib/data';
import Image from 'next/image';
import { Footer } from '@/components/layout/footer';

export default function Home() {
    const [query, setQuery] = useLocalStorage<SearchQuery | null>('last-search-query', null);
    const [isSearching, setIsSearching] = useState(false);
    
    const [allBuses, setAllBuses] = useLocalStorage<Bus[]>('last-search-results', []);
    const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    const [recentSearches, setRecentSearches] = useLocalStorage<SearchQuery[]>('recent-searches', []);

    // Filter states
    const [sortBy, setSortBy] = useState<SortOption>('price');
    const [priceRange, setPriceRange] = useState<number[]>([1000]);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
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
            setSelectedTimeSlots([]);
            setIsSearching(false);
        }, 1000);
    }, [recentSearches, setRecentSearches, setQuery, setAllBuses]);

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

    const parseTimeToHour = (time: string) => {
        if (!time) return 0;
        const [hour, minutePart] = time.split(':');
        const minute = minutePart.substring(0, 2);
        const ampm = minutePart.substring(3);
        let hours = parseInt(hour);
        if (ampm === 'PM' && hours !== 12) {
            hours += 12;
        }
        if (ampm === 'AM' && hours === 12) {
            hours = 0;
        }
        return hours + parseInt(minute) / 60;
    };
    
    const filteredBuses = useMemo(() => {
        let buses = [...allBuses];

        // Filter by price
        buses = buses.filter(bus => getMinPrice(bus) <= priceRange[0]);
        
        // Filter by time
        if (selectedTimeSlots.length > 0) {
            buses = buses.filter(bus => {
                const busDateHour = parseTimeToHour(bus.departureTime);
                return selectedTimeSlots.some(slot => {
                    if (slot === 'before-6') return busDateHour < 6;
                    if (slot === '6-12') return busDateHour >= 6 && busDateHour < 12;
                    if (slot === '12-18') return busDateHour >= 12 && busDateHour < 18;
                    if (slot === 'after-18') return busDateHour >= 18;
                    return false;
                });
            });
        }

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
                    return parseTimeToHour(a.departureTime) - parseTimeToHour(b.departureTime);
                case 'duration':
                    const durationA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1]?.replace('m', '') || '0');
                    const durationB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1]?.replace('m', '') || '0');
                    return durationA - durationB;
                default:
                    return 0;
            }
        });

        return buses;
    }, [allBuses, sortBy, priceRange, seatType, selectedOperators, selectedTimeSlots]);

    
    const busesToCompare = allBuses.filter(bus => compareIds.has(bus.id));
    
    const filterComponent = (
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
            selectedTimeSlots={selectedTimeSlots}
            onSelectedTimeSlotsChange={setSelectedTimeSlots}
        />
    );

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="relative bg-indigo-deep text-white">
                <div className="absolute inset-0">
                    <Image
                        src="https://picsum.photos/seed/bus-travel/1800/600"
                        alt="Scenic bus route"
                        fill
                        className="object-cover z-0 opacity-20"
                        data-ai-hint="grand central station"
                        priority
                    />
                     <div className="absolute inset-0 bg-indigo-deep opacity-80"></div>
                </div>
                <div className="container relative z-10">
                    <Header />
                     <div className="pt-16 pb-12 md:pt-20 md:pb-16 text-center">
                        <h1 className="text-4xl font-headline font-bold tracking-tight md:text-5xl drop-shadow-md">
                            The best bus offers anywhere across India
                        </h1>
                    </div>
                     <BusSearchForm onSearch={handleSearch} isSearching={isSearching} />
                </div>
            </div>

            <div className="flex-1 bg-background">
                <div className="container flex flex-col md:flex-row py-6 md:py-10 gap-8">
                    {query && (
                         <>
                            <div className="w-full md:w-1/4">
                                <div className="md:hidden mb-4">
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" className="w-full">
                                                <PanelLeft className="mr-2 h-4 w-4" />
                                                Filters & Sort
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left">
                                            {filterComponent}
                                        </SheetContent>
                                    </Sheet>
                                </div>
                                <div className="hidden md:block">
                                    {filterComponent}
                                </div>
                            </div>
                            <main className="w-full md:w-3/4">
                                <BusResults 
                                    query={query}
                                    buses={filteredBuses}
                                    isSearching={isSearching}
                                    compareIds={compareIds}
                                    toggleCompare={toggleCompare}
                                />
                            </main>
                        </>
                    )}
                     {!query && !isSearching && (
                        <div className="w-full text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg bg-card">
                            <p className="font-medium">Your search results will appear here</p>
                            <p className="text-sm">Enter your route and travel date to find buses.</p>
                        </div>
                    )}
                </div>
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

            <Footer />
        </div>
    );
}
