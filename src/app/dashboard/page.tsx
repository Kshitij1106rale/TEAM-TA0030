import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { featureCards, mandiPrices } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WeatherWidget } from '@/components/weather-widget';

function MarketSnapshotWidget() {
  const topPrices = [...mandiPrices].sort((a, b) => b.price - a.price).slice(0, 4);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium font-headline">Market Snapshot</CardTitle>
        <Button asChild variant="link" className="p-0 h-auto">
            <Link href="/dashboard/market-prices">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Mandi</TableHead>
              <TableHead className="text-right">Price (₹/Qtl)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPrices.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.crop}</TableCell>
                <TableCell className="text-muted-foreground">{item.mandi.split(',')[0]}</TableCell>
                <TableCell className="text-right font-semibold">
                    <div className="flex items-center justify-end gap-2">
                        <span>{item.price.toLocaleString('en-IN')}</span>
                        {item.change > 0 ? (
                            <ArrowUp className="h-4 w-4 text-primary" />
                        ) : (
                            <ArrowDown className="h-4 w-4 text-destructive" />
                        )}
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
    const processFlowImage = PlaceHolderImages.find(img => img.id === 'process-flow');

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome, Farmer!</h1>
                <p className="text-muted-foreground">Here's your farm's overview for today.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <WeatherWidget />
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {featureCards.map((feature) => (
                        <Link href={feature.link} key={feature.title} className="block group">
                            <Card className="hover:border-primary hover:bg-card/95 transition-all h-full">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-medium font-headline">{feature.title}</CardTitle>
                                    <feature.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
                <MarketSnapshotWidget />
                {processFlowImage && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Our Process</CardTitle>
                            <CardDescription>From diagnosis to profit, a seamless journey.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-hidden rounded-lg border">
                                <Image 
                                    src={processFlowImage.imageUrl} 
                                    alt={processFlowImage.description}
                                    data-ai-hint={processFlowImage.imageHint}
                                    width={1200}
                                    height={400}
                                    className="object-cover w-full aspect-[3/1]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
