'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { weatherDataByLocation } from "@/lib/data";
import { AlertTriangle, Droplets, Wind } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useTranslation } from "@/providers/i18n-provider";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function WeatherWidget() {
  const { t, location } = useTranslation();
  const { current, forecast, advisory } = weatherDataByLocation[location];
  const CurrentIcon = current.icon;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">
            {isClient ? t('weather.advisory') : <Skeleton className="h-7 w-48" />}
        </CardTitle>
        <CardDescription>
            {isClient ? t(current.city): <Skeleton className="h-5 w-24" />}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <CurrentIcon className="h-16 w-16 text-accent" />
              <div>
                {isClient ? (
                  <>
                    <p className="text-5xl font-bold">{current.temperature}°C</p>
                    <p className="text-muted-foreground">{t(current.condition)}</p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-28" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                )}
              </div>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-4 sm:ml-auto">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Droplets className="h-5 w-5 text-muted-foreground" />
                {isClient ? (
                  <span className="font-medium">{current.humidity}% {t('weather.humidity')}</span>
                ) : <Skeleton className="h-5 w-20" />}
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Wind className="h-5 w-5 text-muted-foreground" />
                {isClient ? (
                  <span className="font-medium">{current.wind} km/h {t('weather.wind')}</span>
                ) : <Skeleton className="h-5 w-20" />}
              </div>
            </div>
          </div>
          <div className="flex justify-between overflow-x-auto gap-4 pb-2 -mx-4 px-4">
            {isClient ? forecast.map(({ day, temp, icon: Icon }) => (
              <div key={day} className="flex flex-col items-center gap-1 text-center flex-shrink-0 w-16">
                <p className="font-medium text-sm">{t(day)}</p>
                <Icon className="h-8 w-8 text-muted-foreground" />
                <p className="font-semibold">{temp}°C</p>
              </div>
            )) : (
              Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-1 text-center flex-shrink-0 w-16 space-y-1">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-10" />
                </div>
              ))
            )}
          </div>
          {advisory && (
            <Alert className="bg-primary/10 border-primary/20">
              <AlertTriangle className="h-4 w-4 text-primary" />
              {isClient ? (
                <>
                  <AlertTitle className="text-primary font-bold">{t('weather.farmingAdvisory')}</AlertTitle>
                  <AlertDescription className="text-primary/90">
                    {t(advisory)}
                  </AlertDescription>
                </>
              ) : (
                <div className="space-y-2">
                    <Skeleton className="h-5 w-36 bg-primary/20" />
                    <Skeleton className="h-4 w-full bg-primary/20" />
                </div>
              )}
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
