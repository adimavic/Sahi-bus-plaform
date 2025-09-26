'use client';

import { Bus, Operator, OTA } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, Wifi, Wind, Bed, Zap } from 'lucide-react';
import { OtaButton } from './ota-button';
import { FeatureIcon } from './feature-icon';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type BusCardProps = {
  bus: Bus;
  isComparing: boolean;
  onCompareToggle: (e: React.MouseEvent) => void;
  canCompare: boolean;
};

const getOperatorLogo = (operatorName: string) => {
    const name = operatorName.toLowerCase();
    if (name.includes('flixbus')) return '/logos/flixbus.png';
    if (name.includes('intercity')) return '/logos/intercity.png';
    if (name.includes('vrl')) return '/logos/vrl.png';
    if (name.includes('sharma')) return '/logos/sharma.png';
    if (name.includes('orange')) return '/logos/orange.png';
    return '/logos/default.png';
}

const OperatorInfo = ({ operator }: { operator: Operator }) => (
    <div className="flex items-center gap-3">
        <Image src={getOperatorLogo(operator.name)} alt={operator.name} width={48} height={48} className="rounded-full" />
        <div>
            <p className="font-semibold text-gray-800">{operator.name}</p>
            <div className="flex items-center gap-1 text-sm text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{operator.rating.toFixed(1)}</span>
            </div>
        </div>
    </div>
);

const TravelInfo = ({ time, city }: { time: string; city: string }) => (
    <div>
        <p className="text-lg font-bold text-gray-900">{time}</p>
        <p className="text-sm text-gray-500">{city}</p>
    </div>
);

export function BusCard({ bus, isComparing, onCompareToggle, canCompare }: BusCardProps) {
  const cheapestOta = [...bus.otas, bus.directBooking].filter(Boolean).reduce((min, ota) => {
      const price = parseFloat(ota!.price.replace(/[^0-9.]/g, ''));
      const minPrice = min ? parseFloat(min.price.replace(/[^0-9.]/g, '')) : Infinity;
      return price < minPrice ? ota! : min;
  }, null as OTA | null);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCompareToggle(e);
  };
  
  const handleOtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Link href={`/bus/${bus.id}`} className="block transition-all hover:shadow-lg hover:-translate-y-1">
        <Card className="rounded-2xl shadow-md p-5 bg-white">
        <CardContent className="p-0 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Left Section */}
            <div className="w-full md:w-1/4 flex flex-col gap-3 self-start">
            <OperatorInfo operator={bus.operator} />
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-2">
                {bus.features.map(feature => <FeatureIcon key={feature} feature={feature} />)}
            </div>
            </div>

            {/* Center Section */}
            <div className="w-full md:w-1/2 flex items-center justify-around">
                <TravelInfo time={bus.departureTime} city={bus.source} />
                <div className="text-center">
                    <p className="text-gray-600 font-medium">{bus.duration}</p>
                    <div className="w-full h-px bg-border my-1"></div>
                    <p className="text-sm text-gray-400">Direct</p>
                </div>
                <TravelInfo time={bus.arrivalTime} city={bus.destination} />
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/4 text-right flex flex-col items-end gap-3 self-start">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2" onClick={handleCompareClick}>
                                <Label htmlFor={`compare-${bus.id}`} className={cn("text-sm font-medium", !canCompare && !isComparing && "text-muted cursor-not-allowed")}>
                                    Compare
                                </Label>
                                <Switch id={`compare-${bus.id}`} checked={isComparing} onCheckedChange={() => {}} disabled={!canCompare && !isComparing} />
                            </div>
                        </TooltipTrigger>
                        {!canCompare && !isComparing && (
                                <TooltipContent>
                                <p>You can compare up to 3 buses.</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>

                <div className="flex flex-col gap-2 mt-2 w-full max-w-[200px]" onClick={handleOtaClick}>
                    {bus.otas.map(ota => (
                        <OtaButton 
                            key={ota.name} 
                            ota={ota} 
                            isDirect={false}
                            isCheapest={ota.name === cheapestOta?.name && ota.price === cheapestOta?.price}
                        />
                    ))}
                    {bus.directBooking && (
                        <OtaButton 
                            ota={bus.directBooking} 
                            isDirect={true} 
                            isCheapest={bus.directBooking.name === cheapestOta?.name && bus.directBooking.price === cheapestOta?.price}
                        />
                    )}
                </div>
            </div>

        </CardContent>
        </Card>
    </Link>
  );
}
