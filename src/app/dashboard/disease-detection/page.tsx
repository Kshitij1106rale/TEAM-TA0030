import { DiseaseDetectionForm } from "@/components/disease-detection-form";
import { Sprout } from "lucide-react";

export default function DiseaseDetectionPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start gap-4 md:items-center">
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
          <Sprout className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline">AI Disease Detection</h1>
          <p className="text-muted-foreground">
            Upload a photo of a crop leaf to get an instant diagnosis and treatment recommendations.
          </p>
        </div>
      </div>
      <DiseaseDetectionForm />
    </div>
  );
}
