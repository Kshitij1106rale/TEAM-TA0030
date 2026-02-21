import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { weatherData } from "@/lib/data";
import { AlertTriangle, Droplets, Wind } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function WeatherWidget() {
  const { current, forecast, advisory } = weatherData;
  const CurrentIcon = current.icon;

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Weather Advisory</CardTitle>
        <CardDescription>{current.city}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <CurrentIcon className="h-16 w-16 text-accent" />
              <div>
                <p className="text-5xl font-bold">{current.temperature}°C</p>
                <p className="text-muted-foreground">{current.condition}</p>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-4 sm:ml-auto">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Droplets className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{current.humidity}% Humidity</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Wind className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{current.wind} km/h Wind</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between overflow-x-auto gap-4 pb-2 -mx-4 px-4">
            {forecast.map(({ day, temp, icon: Icon }) => (
              <div key={day} className="flex flex-col items-center gap-1 text-center flex-shrink-0">
                <p className="font-medium text-sm">{day}</p>
                <Icon className="h-8 w-8 text-muted-foreground" />
                <p className="font-semibold">{temp}°C</p>
              </div>
            ))}
          </div>
          {advisory && (
            <Alert className="bg-accent/10 border-accent/20">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <AlertTitle className="text-accent font-bold">Farming Advisory</AlertTitle>
              <AlertDescription className="text-accent-foreground/80">
                {advisory}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
