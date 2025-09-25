'use client';

import { Bus, Operator } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';
import { OtaButton } from './ota-button';
import { FeatureIcon } from './feature-icon';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';

type BusCardProps = {
  bus: Bus;
  isComparing: boolean;
  onCompareToggle: () => void;
  canCompare: boolean;
};

const OperatorInfo = ({ operator }: { operator: Operator }) => (
    <div className="flex flex-col">
        <p className="font-headline font-semibold">{operator.name}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
            <span>{operator.rating.toFixed(1)}</span>
        </div>
    </div>
);

const TravelInfo = ({ time, city }: { time: string; city: string }) => (
    <div className="flex flex-col">
        <p className="text-xl font-bold font-headline">{time}</p>
        <p className="text-sm text-muted-foreground">{city}</p>
    </div>
);


export function BusCard({ bus, isComparing, onCompareToggle, canCompare }: BusCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-12 md:col-span-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <OperatorInfo operator={bus.operator} />
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center space-x-1">
                                    <Checkbox id={`compare-${bus.id}`} checked={isComparing} onCheckedChange={onCompareToggle} disabled={!canCompare && !isComparing} />
                                    <Label htmlFor={`compare-${bus.id}`} className={cn("text-sm font-medium", !canCompare && !isComparing && "text-muted-foreground cursor-not-allowed")}>
                                        Compare
                                    </Label>
                                </div>
                            </TooltipTrigger>
                            {!canCompare && !isComparing && (
                                 <TooltipContent>
                                    <p>You can compare up to 3 buses.</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-8 my-4">
                <TravelInfo time={bus.departureTime} city={bus.source} />
                <div className="flex-grow flex items-center justify-center text-center">
                    <div className="w-full">
                        <p className="text-sm text-muted-foreground">{bus.duration}</p>
                        <div className="w-full h-px bg-border my-1"></div>
                        <p className="text-xs text-muted-foreground">Direct</p>
                    </div>
                </div>
                <TravelInfo time={bus.arrivalTime} city={bus.destination} />
            </div>

             <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                {bus.features.map(feature => <FeatureIcon key={feature} feature={feature} />)}
            </div>
        </div>

        <Separator orientation="vertical" className="mx-auto h-32 hidden md:block col-span-1" />
        
        <div className="col-span-12 md:col-span-3">
            <div className="flex flex-col gap-2">
                {bus.otas.map(ota => <OtaButton key={ota.name} ota={ota} isDirect={false} />)}
                {bus.directBooking && <OtaButton ota={bus.directBooking} isDirect={true} />}
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
