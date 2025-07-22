
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Capacitor } from '@capacitor/core';

export function QuickAddMobile() {
  const isNative = Capacitor.isNativePlatform();
  
  return (
    <Card className="md:hidden">
      <CardHeader>
        <CardTitle>Quick Add</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3 items-center">
        <Button 
          size="sm" 
          variant="outline" 
          className={`rounded-full ${isNative ? 'active:scale-95 transition-transform' : ''}`}
        >
          <Plus className="h-4 w-4" /> Add Expense
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className={`rounded-full ${isNative ? 'active:scale-95 transition-transform' : ''}`}
        >
          <Plus className="h-4 w-4" /> Add Income
        </Button>
      </CardContent>
    </Card>
  );
}
