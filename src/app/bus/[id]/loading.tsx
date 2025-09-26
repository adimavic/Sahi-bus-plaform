import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/layout/header";

export default function Loading() {
  return (
    <div className="bg-background min-h-screen">
        <header className="bg-indigo-darker text-white">
                <div className="container py-4 flex justify-between items-center">
                    <Skeleton className="h-10 w-36" />
                    <Skeleton className="h-6 w-24" />
                </div>
        </header>

        <main className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-1/2" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <Skeleton className="h-9 w-48" />
                            <Skeleton className="h-5 w-64 mt-2" />
                        </div>
                        <Skeleton className="h-10 w-24" />
                    </div>
                    
                    <Card>
                        <CardHeader className="bg-muted/20">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-4 w-1/2 mt-1" />
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-6 w-1/4" />
                                <Skeleton className="h-6 w-1/4" />
                                <Skeleton className="h-5 w-1/6" />
                            </div>
                            <Skeleton className="h-px w-full" />
                             <div className="space-y-6">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-8 w-1/2" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    </div>
  );
}