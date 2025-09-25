'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, MapPin, Search, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { countries } from '@/lib/data';
import type { SearchQuery, Country } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  country: z.string().min(1, 'Please select a country.'),
  source: z.string().min(2, 'Source is required.'),
  destination: z.string().min(2, 'Destination is required.'),
  date: z.date({
    required_error: 'A date of travel is required.',
  }),
}).refine(data => data.source !== data.destination, {
  message: "Source and destination can't be the same.",
  path: ['destination'],
});

type BusSearchFormProps = {
  onSearch: (query: SearchQuery) => void;
  isSearching: boolean;
};

export function BusSearchForm({ onSearch, isSearching }: BusSearchFormProps) {
  const [selectedCountryCode, setSelectedCountryCode] = React.useState('IN');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: 'IN',
      source: '',
      destination: '',
      date: new Date(),
    },
  });
  
  const selectedCountry = countries.find(c => c.code === selectedCountryCode);

  React.useEffect(() => {
    form.setValue('country', selectedCountryCode);
    form.resetField('source');
    form.resetField('destination');
  }, [selectedCountryCode, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch(values as SearchQuery);
  }
  
  return (
    <Card className="shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              
              <div className="md:col-span-3">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={(value) => { field.onChange(value); setSelectedCountryCode(value); }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <div className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground"/>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedCountry?.cities.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger>
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground"/>
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedCountry?.cities.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Travel Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-1 flex items-end h-full">
                <Button type="submit" disabled={isSearching} className="w-full h-10">
                  {isSearching ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
