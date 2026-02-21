'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LifeBuoy, LogOut, Settings, User, MapPin, LocateFixed } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { useTranslation, type Language } from "@/providers/i18n-provider";
import { NotificationsDropdown } from "./notifications-dropdown";
import { locations, weatherDataByLocation, type Location } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export function DashboardHeader() {
  const { t, setLanguage, language, location, setLocation } = useTranslation();
  const { toast } = useToast();

  const handleLiveLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: t('notifications.locationError.title'),
        description: "Geolocation is not supported by your browser.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        let closestCity: Location | null = null;
        let minDistance = Infinity;

        for (const loc of locations) {
            const cityData = weatherDataByLocation[loc];
            if (cityData.coords) {
                const distance = getDistance(latitude, longitude, cityData.coords.lat, cityData.coords.lon);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCity = loc;
                }
            }
        }

        if (closestCity) {
            setLocation(closestCity);
            toast({
                title: t('notifications.locationSuccess.title'),
                description: t('notifications.locationSuccess.description', { location: t(`weather.cities.${closestCity.toLowerCase()}`) }),
            });
        }
      },
      () => {
        toast({
            variant: "destructive",
            title: t('notifications.locationError.title'),
            description: t('notifications.locationError.description'),
        });
      }
    );
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />

      <div className="flex w-full items-center justify-end gap-2 md:gap-4">
        <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
          <SelectTrigger className="w-[120px] focus:ring-accent">
            <SelectValue placeholder={t('header.language')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिन्दी</SelectItem>
            <SelectItem value="mr">मराठी</SelectItem>
          </SelectContent>
        </Select>

        <NotificationsDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/user/100/100" data-ai-hint="person portrait" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="sr-only">{t('header.userMenu')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t('header.myAccount')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t('header.profile')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t('header.settings')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleLiveLocation}>
              <LocateFixed className="mr-2 h-4 w-4" />
              <span>{t('header.liveLocation')}</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <MapPin className="mr-2 h-4 w-4" />
                <span>{t('header.location')}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={location} onValueChange={(value) => setLocation(value as Location)}>
                  {locations.map((loc) => (
                    <DropdownMenuRadioItem key={loc} value={loc}>
                      {t(`weather.cities.${loc.toLowerCase()}`)}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>{t('header.support')}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t('header.logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
