import { MarketPricesTable } from "@/components/market-prices-table";
import { PriceTrendChart } from "@/components/price-trend-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark } from "lucide-react";

export default function MarketPricesPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-start gap-4 md:items-center">
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
          <Landmark className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline">Real-time Mandi Prices</h1>
          <p className="text-muted-foreground">
            Compare prices across different markets to maximize your profit.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>7-Day Price Trend</CardTitle>
            <CardDescription>Price fluctuation for major crops over the last week (₹ per Quintal).</CardDescription>
        </CardHeader>
        <CardContent>
            <PriceTrendChart />
        </CardContent>
      </Card>
      <MarketPricesTable />
    </div>
  );
}
