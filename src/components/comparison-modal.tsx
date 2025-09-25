'use client';

import { Bus } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, CheckCircle2, XCircle } from 'lucide-react';
import { OtaButton } from './ota-button';
import { FeatureIcon } from './feature-icon';

type ComparisonModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  buses: Bus[];
};

export function ComparisonModal({ isOpen, onOpenChange, buses }: ComparisonModalProps) {
  const allFeatures = ['AC', 'Sleeper', 'WiFi', 'Charging Port'] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Compare Buses</DialogTitle>
          <DialogDescription>
            Here's a side-by-side comparison of the buses you selected.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-gray-800">Feature</TableHead>
                {buses.map((bus) => (
                  <TableHead key={bus.id} className="text-center">
                    <p className="font-headline font-bold">{bus.operator.name}</p>
                    <div className="flex items-center justify-center gap-1 text-sm text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{bus.operator.rating.toFixed(1)}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Route</TableCell>
                {buses.map((bus) => (
                  <TableCell key={bus.id} className="text-center text-sm">{bus.source} to {bus.destination}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Timings</TableCell>
                {buses.map((bus) => (
                  <TableCell key={bus.id} className="text-center text-sm">
                    {bus.departureTime} - {bus.arrivalTime} <span className="text-muted-foreground">({bus.duration})</span>
                  </TableCell>
                ))}
              </TableRow>
              {allFeatures.map(feature => (
                <TableRow key={feature}>
                    <TableCell className="font-medium flex items-center gap-2">
                        <FeatureIcon feature={feature} />
                    </TableCell>
                    {buses.map(bus => (
                        <TableCell key={bus.id} className="text-center">
                            {bus.features.includes(feature) ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                                <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                        </TableCell>
                    ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium align-top pt-4">Prices</TableCell>
                {buses.map(bus => (
                    <TableCell key={bus.id} className="text-center">
                        <div className="flex flex-col gap-2">
                            {bus.otas.map(ota => <OtaButton key={ota.name} ota={ota} isDirect={false} isCheapest={false} />)}
                            {bus.directBooking && <OtaButton ota={bus.directBooking} isDirect={true} isCheapest={false} />}
                        </div>
                    </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
