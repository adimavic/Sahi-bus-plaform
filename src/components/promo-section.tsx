import Image from 'next/image';

export function PromoSection() {
  return (
    <section className="py-12 md:py-20">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl font-headline font-bold mb-4">
                        Looking for the best bus deals to anywhere in the world?
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        It's easy around here. 100 million travellers use us as their go-to tool, comparing bus deals and offers from more than 1,200 bus and travel providers. With so many options to choose from in one place, you can say hello to savings, and goodbye to stress - here's how.
                    </p>
                </div>
                <div className="relative h-64">
                     <Image 
                        src="https://picsum.photos/seed/travel-world/600/400"
                        alt="Travel the world illustration"
                        fill
                        className="object-contain"
                        data-ai-hint="world map travel illustration"
                     />
                </div>
            </div>
        </div>
    </section>
  );
}
