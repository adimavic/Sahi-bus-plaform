'use client';

import React from 'react';
import { Bus } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from './ui/button';

interface FiltersProps {
  buses: Bus[];
}

export function Filters({ buses }: FiltersProps) {
  const operators = [...new Set(buses.map(bus => bus.operator.name))];
  const maxPrice = Math.max(...buses.flatMap(bus => bus.otas.map(ota => parseFloat(ota.price.replace(/[^0-9.-]+/g,"")))), 0);

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Filters & Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="sort-by" className="text-gray-600">Sort by</Label>
          <Select defaultValue="price">
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
            <Slider defaultValue={[maxPrice]} max={maxPrice} step={10} />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>₹0</span>
            <span>₹{maxPrice.toLocaleString()}</span>
          </div>
        </div>
        <Separator />
        <div>
          <Label className="text-gray-600">Seat Type</Label>
          <div className="flex gap-2 mt-2">
             <Button variant="outline" className="rounded-full flex-1 data-[active=true]:bg-primary/10 data-[active=true]:border-primary data-[active=true]:text-primary" data-active={true}>Seater</Button>
             <Button variant="outline" className="rounded-full flex-1">Sleeper</Button>
          </div>
        </div>
        <Separator />
        <div>
          <Label className="text-gray-600">Operators</Label>
          <ScrollArea className="h-32 mt-2">
            <div className="space-y-2">
              {operators.map(op => (
                <div key={op} className="flex items-center space-x-2">
                  <Switch id={op} />
                  <Label htmlFor={op} className="font-normal">{op}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
