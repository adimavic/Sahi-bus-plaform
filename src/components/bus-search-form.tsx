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
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

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
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="p-4 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-6 items-end">
              
              <div className="md:col-span-4">
                 <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel>From</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="shadow-sm rounded-lg h-12 text-base bg-white">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-muted-foreground"/>
                                <SelectValue placeholder="Select source" />
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

              <div className="md:col-span-1 flex items-center justify-center -mt-2 md:mt-0 md:pb-3">
                    <Button type="button" variant="ghost" size="icon" onClick={handleSwap} className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200">
                      <ArrowRightLeft className="h-4 w-4 text-gray-600" />
                    </Button>
              </div>


              <div className="md:col-span-4">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>To</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                           <SelectTrigger className="shadow-sm rounded-lg h-12 text-base bg-white">
                            <div className="flex items-center gap-2">
                               <MapPin className="h-5 w-5 text-muted-foreground"/>
                               <SelectValue placeholder="Select destination" />
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
                        <FormLabel>Departure Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal shadow-sm rounded-lg h-12 text-base bg-white',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-5 w-5" />
                              {field.value ? format(field.value, 'dd-MM-yyyy') : <span>Pick a date</span>}
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

              <div className="md:col-span-12 lg:col-span-3 lg:col-start-10">
                <Button type="submit" disabled={isSearching} className="w-full h-12 rounded-lg text-base font-bold bg-primary hover:bg-primary/90 transition-transform hover:scale-105">
                  {isSearching ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" /> Search Buses
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
