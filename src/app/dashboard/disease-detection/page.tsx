'use client';

import { DiseaseDetectionForm } from "@/components/disease-detection-form";
import { useTranslation } from "@/providers/i18n-provider";
import { Sprout } from "lucide-react";

export default function DiseaseDetectionPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start gap-4 md:items-center">
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
          <Sprout className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline">{t('diseaseDetectionPage.title')}</h1>
          <p className="text-muted-foreground">
            {t('diseaseDetectionPage.description')}
          </p>
        </div>
      </div>
      <DiseaseDetectionForm />
    </div>
  );
}
