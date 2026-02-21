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

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/disease-detection', label: 'Disease Detection', icon: Sprout },
  { href: '/dashboard/market-prices', label: 'Market Prices', icon: Landmark },
  { href: '/dashboard/profit-estimator', label: 'Profit Estimator', icon: Calculator },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          {state === 'expanded' && <h1 className="text-xl font-bold text-primary-active font-headline">AgriVision AI</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <p className="px-4 text-xs text-muted-foreground">&copy; 2024 AgriVision AI</p>
      </SidebarFooter>
    </>
  );
}
