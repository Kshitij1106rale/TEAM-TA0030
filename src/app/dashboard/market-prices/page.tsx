'use client';

import { MarketPricesTable } from "@/components/market-prices-table";
import { PriceTrendChart } from "@/components/price-trend-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/providers/i18n-provider";
import { Landmark } from "lucide-react";

export default function MarketPricesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-start gap-4 md:items-center">
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
          <Landmark className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline">{t('marketPricesPage.title')}</h1>
          <p className="text-muted-foreground">
            {t('marketPricesPage.description')}
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>{t('marketPricesPage.trendTitle')}</CardTitle>
            <CardDescription>{t('marketPricesPage.trendDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
            <PriceTrendChart />
        </CardContent>
      </Card>
      <MarketPricesTable />
    </div>
  );
}
