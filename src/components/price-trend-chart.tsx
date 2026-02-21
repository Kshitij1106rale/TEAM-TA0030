'use client';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { priceTrends } from '@/lib/data';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartConfig = {
  Wheat: {
    label: "Wheat",
    color: "hsl(var(--chart-1))",
  },
  Rice: {
    label: "Rice",
    color: "hsl(var(--chart-2))",
  },
  Corn: {
    label: "Corn",
    color: "hsl(var(--chart-3))",
  },
}

export function PriceTrendChart() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full aspect-video">
            <ResponsiveContainer width="100%" height={350}>
            <LineChart data={priceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                    dataKey="Wheat"
                    type="monotone"
                    stroke="var(--color-Wheat)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="Rice"
                    type="monotone"
                    stroke="var(--color-Rice)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="Corn"
                    type="monotone"
                    stroke="var(--color-Corn)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
