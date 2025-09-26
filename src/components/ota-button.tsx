'use client';

import { OTA } from '@/lib/types';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type OtaButtonProps = {
  ota: OTA;
  isDirect: boolean;
  isCheapest: boolean;
};

export function OtaButton({ ota, isDirect, isCheapest }: OtaButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(ota.url, '_blank', 'noopener,noreferrer');
  };

  const buttonContent = (
    <Button
      onClick={handleClick}
      className={cn(
          "w-full justify-between px-3 py-1.5 h-auto rounded-md text-sm font-medium transition-all",
          isCheapest ? "bg-green-100 text-green-800 border-2 border-green-500 hover:bg-green-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
          isDirect && "bg-blue-100 text-blue-800 hover:bg-blue-200"
      )}
      style={isDirect ? { backgroundColor: ota.color, color: ota.textColor } : {}}
    >
      <span className="font-semibold">{isDirect ? "Book Direct" : ota.name}</span>
      <span className="font-bold">{ota.price}</span>
    </Button>
  );

  if(ota.name === 'Redbus' || ota.name === 'MakeMyTrip' || ota.name === 'AbhiBus' || ota.name === '12Go' || ota.name === 'Bookaway'){
     return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent>
            <p>{isCheapest ? "Best Price!" : (isDirect ? `Book direct with ${ota.name}` : 'Book on partner site')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else {
     return (
        <Button asChild className="mt-2">
            <a href={ota.url} target="_blank" rel="noopener noreferrer">Select</a>
        </Button>
     )
  }
}
