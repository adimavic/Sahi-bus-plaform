'use client';

import { SearchQuery } from '@/lib/types';
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
        <div className="hidden md:flex items-center gap-4">
            <h3 className="text-sm font-medium text-gray-400">Popular routes:</h3>
            <div className="flex flex-wrap items-center gap-3">
                {routes.map((route, index) => (
                    <button
                        key={index}
                        onClick={() => handleRouteClick(route)}
                        className="text-sm font-medium text-white opacity-80 hover:opacity-100 hover:underline transition-opacity"
                    >
                        <span>{route.source} - {route.destination}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
