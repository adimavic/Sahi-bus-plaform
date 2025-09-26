'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Bus, OTA } from '@/lib/types';
import { generateMockBuses } from '@/lib/data';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star, Heart, Clock, Info, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import Loading from './loading';
import { OtaButton } from '@/components/ota-button';
import { FeatureIcon } from '@/components/feature-icon';

const getOperatorLogo = (operatorName: string) => {
    const name = operatorName.toLowerCase();
    if (name.includes('flixbus')) return 'https://picsum.photos/seed/flixbus/24/24';
    if (name.includes('intercity')) return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlKUZf0EMLCyMV78lIEQQ95jJdiNYoOyCeg&s';
    if (name.includes('vrl')) return 'https://picsum.photos/seed/vrl/24/24';
    if (name.includes('sharma')) return 'https://gst-contracts.s3.ap-southeast-1.amazonaws.com/uploads/bcc/cms/asset/avatar/182261/logo.png';
    if (name.includes('orange')) return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5tONpAaY7w_HZtHNCDAJIUqbP7_KzdWXRuA&s';
    if (name.includes('greenline')) return 'https://play-lh.googleusercontent.com/vW7sCpGUghRISgbvX9RkR7mSDNwictdn7GRzaB76carQs1FpEAVrQjN2kQUSI_uPEKM';
    return 'https://picsum.photos/seed/default-bus/24/24';
}

const BookingProviderCard = ({ provider, isCheapest }: { provider: OTA, isCheapest: boolean }) => (
    <Card className={isCheapest ? "border-2 border-green-500" : ""}>
        <CardContent className="p-4 flex justify-between items-center">
            <div>
                <h3 className="font-semibold">{provider.name}</h3>
                <div className="flex items-center gap-1 text-sm text-yellow-500 mt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">4.5</span>
                    <span className="text-xs text-muted-foreground">(7038)</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Pay with UPI</li>
                    <li className="flex items-center gap-1.5"><Info className="w-3 h-3" /> Self-transfer</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-500" /> Transfer protection</li>
                </ul>
            </div>
            <div className="text-right">
                <p className="text-xl font-bold">{provider.price}</p>
                <OtaButton ota={provider} isDirect={false} isCheapest={false} />
            </div>
        </CardContent>
    </Card>
);

export default function BusDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [bus, setBus] = useState<Bus | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            // In a real app, you'd fetch this from an API.
            // Here, we'll find it in the mock data.
            const allBuses = generateMockBuses({ source: 'Delhi', destination: 'Mumbai', country: 'IN', date: new Date() });
            const foundBus = allBuses.find(b => b.id === params.id);
            // If not found, we generate another set for another route to find it.
            if (foundBus) {
                 setBus(foundBus);
            } else {
                 const allBuses2 = generateMockBuses({ source: 'Bangalore', destination: 'Chennai', country: 'IN', date: new Date() });
                 setBus(allBuses2.find(b => b.id === params.id) || null);
            }
            setIsLoading(false);
        }
    }, [params.id]);

    if (isLoading) {
        return <Loading />;
    }

    if (!bus) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <p>Bus not found.</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        );
    }
    
    const allOtas = [...bus.otas, bus.directBooking].filter(Boolean);
    const cheapestOta = allOtas.reduce((min, ota) => {
        const price = parseFloat(ota!.price.replace(/[^0-9.]/g, ''));
        const minPrice = min ? parseFloat(min.price.replace(/[^0-9.]/g, '')) : Infinity;
        return price < minPrice ? ota! : min;
    }, null as OTA | null);

    return (
        <div className="bg-background min-h-screen">
            <header className="bg-indigo-darker text-white">
                <div className="container py-4 flex justify-between items-center">
                     <Button variant="ghost" onClick={() => router.back()} className="text-white hover:bg-indigo-dark">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to results
                    </Button>
                    <div className="flex items-center gap-2 text-sm">
                        <Image src="https://picsum.photos/seed/default-logo/24/24" alt="logo" width={24} height={24} />
                        Sahibus
                    </div>
                </div>
            </header>

            <main className="container py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-1 space-y-6">
                         <Card>
                            <CardHeader>
                                <CardTitle>Book your ticket</CardTitle>
                            </CardHeader>
                             <CardContent className="space-y-4">
                                {allOtas.map((ota) => (
                                    <BookingProviderCard 
                                        key={ota.name} 
                                        provider={ota} 
                                        isCheapest={ota.name === cheapestOta?.name && ota.price === cheapestOta?.price}
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold">{bus.destination}</h1>
                                <p className="text-muted-foreground">{`1 traveller • ${bus.source} to ${bus.destination}`}</p>
                            </div>
                        </div>
                        
                        <Card>
                            <CardHeader className="bg-muted/20">
                                <CardTitle>Bus details</CardTitle>
                                <p className="text-sm text-muted-foreground">Outbound • {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <Image src={getOperatorLogo(bus.operator.name)} alt={bus.operator.name} width={24} height={24} />
                                        <span className="font-semibold">{bus.operator.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">{bus.departureTime} → {bus.arrivalTime}</p>
                                        <p className="text-sm text-muted-foreground">{bus.source} → {bus.destination}</p>
                                    </div>
                                    <div className="text-sm text-muted-foreground">{bus.duration}</div>
                                </div>
                                
                                <Separator className="my-4" />

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-sm font-semibold pt-1">{bus.departureTime}</div>
                                        <div className="relative">
                                            <div className="h-full w-px bg-border absolute left-2.5"></div>
                                            <div className="relative z-10 h-5 w-5 rounded-full bg-primary border-2 border-background"></div>
                                        </div>
                                        <div className="pb-6">
                                            <p className="font-semibold">{bus.source}</p>
                                            <p className="text-sm text-muted-foreground">Main Bus Terminal</p>
                                        </div>
_                                    </div>
                                     <div className="flex items-center gap-4 pl-12">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">{bus.duration} journey</p>
                                    </div>
                                     <div className="flex items-start gap-4">
                                        <div className="text-sm font-semibold pt-1">{bus.arrivalTime}</div>
                                        <div className="relative">
                                            <div className="h-5 w-5 rounded-full bg-primary border-2 border-background"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{bus.destination}</p>
                                             <p className="text-sm text-muted-foreground">Central Bus Station</p>
                                        </div>
                                    </div>
                                </div>
                                <Separator className="my-6" />
                                <div className="flex items-center gap-4">
                                    {bus.features.map(f => <FeatureIcon key={f} feature={f} />)}
                                </div>

                                <div className="mt-6 text-xs text-muted-foreground">
                                    Arrives: {new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} | Journey duration: {bus.duration}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
