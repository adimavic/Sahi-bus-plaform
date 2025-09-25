'use client';

import { SearchQuery } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import React from 'react';

type PopularRoutesProps = {
    onSearch: (query: SearchQuery) => void;
};

const routes = [
    { source: 'Delhi', destination: 'Mumbai', country: 'IN' },
    { source: 'Bangalore', destination: 'Chennai', country: 'IN' },
    { source: 'Pune', destination: 'Hyderabad', country: 'IN' },
    { source: 'Hyderabad', destination: 'Bangalore', country: 'IN' },
]

export function PopularRoutes({ onSearch }: PopularRoutesProps) {

    const handleRouteClick = (route: Omit<SearchQuery, 'date'>) => {
        onSearch({ ...route, date: new Date() });
    }

    return (
        <div className="mt-8">
            <h3 className="text-md font-medium text-primary-foreground/90">Popular routes in India:</h3>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
                {routes.map((route, index) => (
                    <button
                        key={index}
                        onClick={() => handleRouteClick(route)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-primary/80 hover:bg-primary/90 backdrop-blur-sm border border-primary-foreground/20 rounded-full text-sm font-medium text-primary-foreground transition-colors"
                    >
                        <span>{route.source}</span>
                        <ArrowRight className="h-4 w-4" />
                        <span>{route.destination}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
