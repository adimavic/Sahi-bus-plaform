import { Country, Bus, SearchQuery } from './types';

export const countries: Country[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur'],
  },
  {
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Krabi'],
  },
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    cities: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hoi An', 'Nha Trang'],
  },
];

const operators = [
  { name: 'Sharma Transports', rating: 4.5 },
  { name: 'VRL Travels', rating: 4.2 },
  { name: 'Orange Tours', rating: 4.8 },
  { name: 'GreenLine', rating: 3.9 },
  { name: 'FastGo', rating: 4.1 },
  { name: 'Intercity', rating: 4.7 },
  { name: 'FlixBus', rating: 4.4 },
];

const features: ('AC' | 'Sleeper' | 'WiFi' | 'Charging Port')[] = ['AC', 'Sleeper', 'WiFi', 'Charging Port'];

const getOtas = (country: string, basePrice: number) => {
  const currency = country === 'IN' ? '₹' : country === 'TH' ? '฿' : '$';
  const price = country === 'IN' ? basePrice : basePrice / 2.5;

  let otas = [];
  if (country === 'IN') {
    otas = [
      { name: 'Redbus', color: '#d83f4f', textColor: 'white' as const, url: '#' },
      { name: 'MakeMyTrip', color: '#0066cc', textColor: 'white' as const, url: '#' },
      { name: 'AbhiBus', color: '#00b38a', textColor: 'white' as const, url: '#' },
    ];
  } else {
    otas = [
      { name: '12Go', color: '#009b3a', textColor: 'white' as const, url: '#' },
      { name: 'Bookaway', color: '#ff6f61', textColor: 'white' as const, url: '#' },
    ];
  }

  return otas.map(ota => ({
    ...ota,
    price: `${currency}${Math.floor(price + Math.random() * 50)}`,
  }));
};

const getRandomSubset = <T>(arr: T[], a: number = 2): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * (arr.length - a + 1)) + a);
};

export const generateMockBuses = (query: SearchQuery): Bus[] => {
  const results: Bus[] = [];
  const numResults = Math.floor(Math.random() * 15) + 10;

  for (let i = 0; i < numResults; i++) {
    const depHour = Math.floor(Math.random() * 14) + 6; // 6 AM to 8 PM
    const depMinute = Math.random() > 0.5 ? 30 : 0;
    const durationHours = Math.floor(Math.random() * 8) + 4;
    const durationMinutes = Math.random() > 0.5 ? 30 : 0;

    const departure = new Date(query.date);
    departure.setHours(depHour, depMinute, 0, 0);

    const arrival = new Date(departure.getTime() + (durationHours * 60 + durationMinutes) * 60000);

    const operator = operators[Math.floor(Math.random() * operators.length)];

    const basePrice = 400 + Math.random() * 600;

    const bus: Bus = {
      id: `${query.source}-${query.destination}-${i}`,
      operator,
      departureTime: departure.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      arrivalTime: arrival.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      duration: `${durationHours}h ${durationMinutes > 0 ? `${durationMinutes}m` : ''}`,
      source: query.source,
      destination: query.destination,
      features: getRandomSubset(features, 1),
      otas: getOtas(query.country, basePrice),
      directBooking: {
          name: operator.name,
          price: `${query.country === 'IN' ? '₹' : '$'}${Math.floor(basePrice - 20)}`,
          color: '#333333',
          textColor: 'white',
          url: '#'
      }
    };
    results.push(bus);
  }

  return results.sort((a,b) => a.departureTime.localeCompare(b.departureTime));
};
