'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, MapPin, Search, ArrowRightLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { countries } from '@/lib/data';
import type { SearchQuery } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PopularRoutes } from './popular-routes';
import { RecentSearches } from './recent-searches';
import { useLocalStorage } from '@/hooks/use-local-storage';


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
  const [recentSearches] = useLocalStorage<SearchQuery[]>('recent-searches', []);


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
  }, [selectedCountryCode, form]);
  
  const handleSwap = () => {
    const source = form.getValues('source');
    const destination = form.getValues('destination');
    form.setValue('source', destination);
    form.setValue('destination', source);
  };


  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch(values as SearchQuery);
  }
  
  return (
    <div className="relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-navy-deep rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-2 gap-y-4 items-center">
              
              <div className="md:col-span-3">
                 <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="shadow-none rounded-md h-16 bg-navy text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 text-base">
                            <div className="text-left">
                                <p className="text-xs text-gray-400">From</p>
                                <SelectValue placeholder="Select source" className="font-semibold" />
                            </div>
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
              </div>

              <div className="relative md:col-span-1 flex items-center justify-center">
                    <Button type="button" variant="outline" size="icon" onClick={handleSwap} className="h-8 w-8 rounded-full bg-navy hover:bg-navy-light border-gray-600 text-white">
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>
              </div>

              <div className="md:col-span-3">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                           <SelectTrigger className="shadow-none rounded-md h-16 bg-navy text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 text-base">
                             <div className="text-left">
                                <p className="text-xs text-gray-400">To</p>
                                <SelectValue placeholder="Select destination" className="font-semibold" />
                             </div>
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
              </div>
              
               <div className="md:col-span-3">
                 <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'ghost'}
                              className={cn(
                                'w-full justify-start text-left font-normal shadow-none rounded-md h-16 bg-navy text-white border border-gray-600 hover:bg-navy-light focus:ring-2 focus:ring-blue-500 text-base',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                               <div className="text-left">
                                    <p className="text-xs text-gray-400">Depart</p>
                                    {field.value ? <span className="font-semibold">{format(field.value, 'MMM d, yyyy')}</span> : <span>Pick a date</span>}
                               </div>
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

               <div className="md:col-span-2">
                <Button type="submit" disabled={isSearching} className="w-full h-16 rounded-lg text-lg font-bold bg-primary hover:bg-primary/90 transition-transform">
                  {isSearching ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : "Search"}
                </Button>
              </div>

            </div>
          </form>
        </Form>
        <div className="mt-4 px-2">
            <PopularRoutes onSearch={onSearch} />
            <RecentSearches searches={recentSearches} onSearch={onSearch} />
        </div>
    </div>
  );
}
