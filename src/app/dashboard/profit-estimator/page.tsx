import { ProfitEstimatorForm } from "@/components/profit-estimator-form";
import { Calculator } from "lucide-react";

export default function ProfitEstimatorPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start gap-4 md:items-center">
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
          <Calculator className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline">Profit Estimation Engine</h1>
          <p className="text-muted-foreground">
            Forecast your potential profit based on crop data and market conditions.
          </p>
        </div>
      </div>
      <ProfitEstimatorForm />
    </div>
  );
}
