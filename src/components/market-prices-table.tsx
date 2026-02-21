'use client';
import { useState, useMemo } from 'react';
import { mandiPrices } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ArrowUp, ArrowDown, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useTranslation } from '@/providers/i18n-provider';

export function MarketPricesTable() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('all');

    const filteredPrices = useMemo(() => {
        return mandiPrices
            .filter(item => selectedCrop === 'all' || item.crop === selectedCrop)
            .filter(item => item.mandi.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, selectedCrop]);

    const highestPricesByCrop = useMemo(() => {
        const cropMap = new Map();
        mandiPrices.forEach(item => {
            if (!cropMap.has(item.crop) || cropMap.get(item.crop).price < item.price) {
                cropMap.set(item.crop, item);
            }
        });
        return cropMap;
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('marketPricesTable.title')}</CardTitle>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder={t('marketPricesTable.searchPlaceholder')}
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder={t('marketPricesTable.filterPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('marketPricesTable.allCrops')}</SelectItem>
                            {[...new Set(mandiPrices.map(p => p.crop))].map(crop => (
                                <SelectItem key={crop} value={crop}>{t(`crops.${crop}`)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('marketPricesTable.crop')}</TableHead>
                                <TableHead>{t('marketPricesTable.variety')}</TableHead>
                                <TableHead>{t('marketPricesTable.mandi')}</TableHead>
                                <TableHead className="text-right">{t('marketPricesTable.price')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPrices.map((item) => (
                                <TableRow key={item.id} className={highestPricesByCrop.get(item.crop)?.id === item.id ? 'bg-primary/5' : ''}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        {t(`crops.${item.crop}`)}
                                        {highestPricesByCrop.get(item.crop)?.id === item.id && (
                                            <Badge variant="secondary" className="bg-accent/80 text-accent-foreground text-xs">{t('marketPricesTable.highest')}</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{item.variety}</TableCell>
                                    <TableCell>{item.mandi}</TableCell>
                                    <TableCell className="text-right font-semibold">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>{item.price.toLocaleString('en-IN')}</span>
                                            {item.change > 0 ? (
                                                <span className="flex items-center text-primary"><ArrowUp className="h-3 w-3 mr-1" /> {item.change}%</span>
                                            ) : (
                                                <span className="flex items-center text-destructive"><ArrowDown className="h-3 w-3 mr-1" /> {Math.abs(item.change)}%</span>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredPrices.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                        {t('marketPricesTable.noResults')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
