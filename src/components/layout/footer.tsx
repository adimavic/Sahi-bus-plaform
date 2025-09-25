import { Faq } from "@/components/faq";
import { PromoSection } from "@/components/promo-section";
import { Bus } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container py-12">
                <Faq />
                <PromoSection />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800">
                <div className="container py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                         <Bus className="h-6 w-6 text-primary" />
                         <span className="font-bold text-lg text-foreground">Sahibus</span>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-4 md:mb-0">
                        <Link href="#" className="hover:underline">About</Link>
                        <Link href="#" className="hover:underline">Privacy Policy</Link>
                        <Link href="#" className="hover:underline">Terms of Service</Link>
                        <Link href="#" className="hover:underline">Contact</Link>
                    </div>
                     <p>&copy; {new Date().getFullYear()} Sahibus. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
