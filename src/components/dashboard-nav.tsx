'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, LayoutDashboard, Landmark, Calculator, Leaf } from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { useTranslation } from '@/providers/i18n-provider';

const navItems = [
  { href: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { href: '/dashboard/disease-detection', labelKey: 'nav.diseaseDetection', icon: Sprout },
  { href: '/dashboard/market-prices', labelKey: 'nav.marketPrices', icon: Landmark },
  { href: '/dashboard/profit-estimator', labelKey: 'nav.profitEstimator', icon: Calculator },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { t } = useTranslation();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          {state === 'expanded' && <h1 className="text-xl font-bold text-primary-active font-headline">{t('app.name')}</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={t(item.labelKey)}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <p className="px-4 text-xs text-muted-foreground">&copy; 2024 {t('app.name')}</p>
      </SidebarFooter>
    </>
  );
}
