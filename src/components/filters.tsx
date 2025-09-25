'use client';

import React from 'react';
import { SortOption } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface FiltersProps {
  operators: string[];
  maxPrice: number;
  sortBy: SortOption;
  onSortByChange: (value: SortOption) => void;
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  seatType: string;
  onSeatTypeChange: (value: string) => void;
  selectedOperators: string[];
  onSelectedOperatorsChange: (value: string[]) => void;
  departureTime: number[];
  onDepartureTimeChange: (value: number[]) => void;
}

export function Filters({ 
  operators, 
  maxPrice, 
  sortBy, 
  onSortByChange,
  priceRange,
  onPriceChange,
  seatType,
  onSeatTypeChange,
  selectedOperators,
  onSelectedOperatorsChange,
  departureTime,
  onDepartureTimeChange
}: FiltersProps) {
  
  const handleOperatorChange = (operator: string) => {
    const newSelection = selectedOperators.includes(operator)
      ? selectedOperators.filter(op => op !== operator)
      : [...selectedOperators, operator];
    onSelectedOperatorsChange(newSelection);
  };
  
  const formatHour = (hour: number) => {
    const h = Math.floor(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour} ${ampm}`;
  }


  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Filters & Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="sort-by" className="text-gray-600">Sort by</Label>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger id="sort-by" className="rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="departure">Departure</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div>
          <Label className="text-gray-600">Price Range</Label>
          <div className='mt-4'>
            <Slider 
              value={priceRange} 
              onValueChange={onPriceChange} 
              max={maxPrice} 
              step={10} 
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>₹0</span>
            <span>₹{priceRange[0].toLocaleString()}</span>
          </div>
        </div>
        <Separator />
         <div>
          <Label className="text-gray-600">Departure Time</Label>
          <div className='mt-4'>
            <Slider 
              value={departureTime} 
              onValueChange={onDepartureTimeChange} 
              max={24} 
              min={0}
              step={1} 
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{formatHour(departureTime[0])}</span>
            <span>{formatHour(departureTime[1])}</span>
          </div>
        </div>
        <Separator />
        <div>
          <Label className="text-gray-600">Seat Type</Label>
          <div className="flex gap-2 mt-2">
             <Button 
                variant="outline" 
                className="rounded-full flex-1 data-[active=true]:bg-primary/10 data-[active=true]:border-primary data-[active=true]:text-primary" 
                data-active={seatType === 'seater'}
                onClick={() => onSeatTypeChange('seater')}
             >
                Seater
             </Button>
             <Button 
                variant="outline" 
                className="rounded-full flex-1 data-[active=true]:bg-primary/10 data-[active=true]:border-primary data-[active=true]:text-primary" 
                data-active={seatType === 'sleeper'}
                onClick={() => onSeatTypeChange('sleeper')}
              >
                Sleeper
              </Button>
          </div>
           <Button 
                variant="link" 
                className="text-xs mt-1"
                onClick={() => onSeatTypeChange('all')}
            >
                Show all
            </Button>
        </div>
        <Separator />
        <div>
          <Label className="text-gray-600">Operators</Label>
          <ScrollArea className="h-32 mt-2">
            <div className="space-y-2">
              {operators.map(op => (
                <div key={op} className="flex items-center space-x-2">
                  <Checkbox 
                    id={op} 
                    checked={selectedOperators.includes(op)}
                    onCheckedChange={() => handleOperatorChange(op)}
                  />
                  <Label htmlFor={op} className="font-normal">{op}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
           <Button 
                variant="link" 
                className="text-xs mt-1"
                onClick={() => onSelectedOperatorsChange([])}
            >
                Clear selection
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
