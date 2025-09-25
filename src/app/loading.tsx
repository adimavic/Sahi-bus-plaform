import { Header } from "@/components/layout/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="container flex-1 py-6 md:py-10">
        <section className="text-center">
            <Skeleton className="h-10 md:h-14 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto mt-4" />
        </section>
        
        <section className="mt-8 max-w-4xl mx-auto">
            <div className="border rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3"><Skeleton className="h-10 w-full" /></div>
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="md:col-span-1"><Skeleton className="h-10 w-full" /></div>
                </div>
            </div>
        </section>

        <section className="mt-12">
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-6 w-1/6" />
                    </div>
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-10 w-full" />
                </div>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}
