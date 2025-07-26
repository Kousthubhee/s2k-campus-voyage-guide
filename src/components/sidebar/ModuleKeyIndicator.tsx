
import { Key } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ModuleKeyIndicatorProps {
  keysRequired?: number;
  isUnlocked: boolean;
  userKeys: number;
}

export const ModuleKeyIndicator = ({ keysRequired, isUnlocked, userKeys }: ModuleKeyIndicatorProps) => {
  if (!keysRequired || isUnlocked) return null;

  const canUnlock = userKeys >= keysRequired;

  return (
    <Badge 
      variant={canUnlock ? "default" : "secondary"} 
      className="ml-2 flex items-center gap-1 text-xs"
    >
      <Key className="h-3 w-3" />
      {keysRequired}
    </Badge>
  );
};
