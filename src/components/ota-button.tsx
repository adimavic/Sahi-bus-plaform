'use client';

import { OTA } from '@/lib/types';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type OtaButtonProps = {
  ota: OTA;
  isDirect: boolean;
};

export function OtaButton({ ota, isDirect }: OtaButtonProps) {
  const buttonContent = (
    <Button
      className="w-full justify-between"
      style={{ backgroundColor: ota.color, color: ota.textColor }}
      asChild
    >
      <a href={ota.url} target="_blank" rel="noopener noreferrer">
        <span className="font-semibold">{ota.name}</span>
        <div className="flex items-center gap-2">
          <span className="font-bold">{ota.price}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </a>
    </Button>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {buttonContent}
        </TooltipTrigger>
        <TooltipContent>
          <p>{isDirect ? `Go to ${ota.name}` : 'Book on partner site'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
