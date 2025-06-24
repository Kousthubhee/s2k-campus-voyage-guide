
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxItemProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function CheckboxItem({ id, checked, onCheckedChange, children, className = "" }: CheckboxItemProps) {
  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="mt-1"
      />
      <label 
        htmlFor={id} 
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
      >
        {children}
      </label>
    </div>
  );
}
