import { Faq } from "@/components/faq";
import { PromoSection } from "@/components/promo-section";
import { Globe, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const AboutUs = () => (
    <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-3 text-sm opacity-80">
        <h3 className="font-semibold text-white opacity-100">About Us</h3>
        <p>We’re a team of travel-tech enthusiasts passionate about making bus travel simpler, smarter, and more affordable. Our platform brings together real-time fares from multiple online travel agencies (OTAs) — so you don’t have to open countless tabs or apps to find the best deal.</p>
        <p>By comparing prices, schedules, seat availability, and amenities in one place, we save you time and money on every journey.</p>
    </div>
);


export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container">
                <Faq />
                <PromoSection />
            </div>
            <div className="bg-indigo-darker text-white">
                <div className="container py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        
                        <AboutUs />
                        
                        <div className="text-sm">
                            <h3 className="font-semibold text-white mb-4">Partners</h3>
                            <p className="opacity-80">We are proud to partner with leading travel providers like Redbus, Goibibo, MakeMyTrip, Intercity and more to bring you the best deals.</p>
                        </div>
                        
                        <div className="text-sm">
                           <h3 className="font-semibold text-white mb-4">Help</h3>
                           <ul className="space-y-3">
                                <li>
                                    <a href="tel:8668592567" className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:underline">
                                        <Phone className="h-4 w-4" />
                                        <span>8668592567</span>
                                    </a>
                                </li>
                                <li>
                                     <a href="mailto:adityakale732@gmail.com" className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:underline">
                                        <Mail className="h-4 w-4" />
                                        <span>adityakale732@gmail.com</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                         <div className="text-sm">
                             <h3 className="font-semibold text-white mb-4">Language & Currency</h3>
                             <Button variant="outline" className="bg-transparent border-indigo-light hover:bg-indigo-dark w-full justify-start text-left h-auto">
                                <Globe className="mr-3 h-5 w-5" />
                                <div>
                                    <p className="font-semibold">English (UK) - ₹ INR</p>
                                </div>
                            </Button>
                        </div>

                    </div>
                </div>
                 <div className="container border-t border-indigo-light py-6 text-center text-xs text-gray-400">
                    <p>&copy; Sahibus Ltd {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
}
