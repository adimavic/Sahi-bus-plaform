import { Faq } from "@/components/faq";
import { PromoSection } from "@/components/promo-section";
import { Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const footerLinks = {
    help: [
        { title: "Help", href: "#" },
        { title: "Privacy Settings", href: "#" },
        { title: "Log in", href: "#" },
    ],
    legal: [
        { title: "Cookie policy", href: "#" },
        { title: "Privacy policy", href: "#" },
        { title: "Terms of service", href: "#" },
        { title: "Company Details", href: "#" },
    ],
    discover: [
        { title: "Explore", href: "#", dropdown: true },
        { title: "Company", href: "#", dropdown: true },
        { title: "Partners", href: "#", dropdown: true },
        { title: "Trips", href: "#", dropdown: true },
    ]
}

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
                        <div className="col-span-2 md:col-span-4 lg:col-span-1">
                             <Button variant="outline" className="bg-transparent border-indigo-light hover:bg-indigo-dark w-full justify-start text-left h-auto">
                                <Globe className="mr-3 h-5 w-5" />
                                <div>
                                    <p className="text-xs">Language & Currency</p>
                                    <p className="font-semibold">India - English (UK) - ₹ INR</p>
                                </div>
                            </Button>
                        </div>
                        
                        <div className="text-sm">
                            <ul className="space-y-3">
                                {footerLinks.help.map(link => (
                                    <li key={link.title}><Link href={link.href} className="opacity-80 hover:opacity-100 hover:underline">{link.title}</Link></li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="text-sm">
                           <ul className="space-y-3">
                                {footerLinks.legal.map(link => (
                                    <li key={link.title}><Link href={link.href} className="opacity-80 hover:opacity-100 hover:underline">{link.title}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-sm">
                            <ul className="space-y-3">
                                {footerLinks.discover.map(link => (
                                    <li key={link.title}>
                                        <Link href={link.href} className="flex justify-between items-center opacity-80 hover:opacity-100 hover:underline">
                                            <span>{link.title}</span>
                                            {link.dropdown && <ChevronDown className="h-4 w-4" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                 <div className="container border-t border-indigo-light py-6 text-center text-xs text-gray-400">
                    <p>&copy; Sahibus Ltd 2024 - {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
}
