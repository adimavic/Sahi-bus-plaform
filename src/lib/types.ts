export type Country = {
  code: string;
  name: string;
  flag: string; // emoji
  cities: string[];
};

export type OTA = {
  name: string;
  price: string; // Using string to include currency symbol
  color: string;
  textColor: 'white' | 'black';
  url: string;
};

export type Operator = {
  name: string;
  rating: number;
};

export type Bus = {
  id: string;
  operator: Operator;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  source: string;
  destination: string;
  features: ('AC' | 'Sleeper' | 'WiFi' | 'Charging Port')[];
  otas: OTA[];
  directBooking: OTA;
};

export type SearchQuery = {
  source: string;
  destination: string;
  date: Date;
  country: string;
};

export type SortOption = 'price' | 'rating' | 'departure' | 'duration';
