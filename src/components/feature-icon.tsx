import { Wifi, Wind, Bed, Zap } from 'lucide-react';

type FeatureIconProps = {
  feature: 'AC' | 'Sleeper' | 'WiFi' | 'Charging Port';
};

export function FeatureIcon({ feature }: FeatureIconProps) {
  const getIcon = () => {
    switch (feature) {
      case 'AC':
        return <Wind className="h-4 w-4 text-primary" />;
      case 'Sleeper':
        return <Bed className="h-4 w-4 text-primary" />;
      case 'WiFi':
        return <Wifi className="h-4 w-4 text-primary" />;
      case 'Charging Port':
        return <Zap className="h-4 w-4 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      {getIcon()}
      <span>{feature}</span>
    </div>
  );
}
