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
            <h3 className="text-md font-medium text-gray-700">Popular routes in India:</h3>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
                {routes.map((route, index) => (
                    <button
                        key={index}
                        onClick={() => handleRouteClick(route)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                    >
                        <span>{route.source}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span>{route.destination}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
