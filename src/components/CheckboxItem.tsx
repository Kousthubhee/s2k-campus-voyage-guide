import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react"; // optional: replace with any icon

interface CheckboxItemProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function CheckboxItem({
  id,
  checked,
  onCheckedChange,
  children,
  className = "",
}: CheckboxItemProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <label
        htmlFor={id}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
      >
        {children}
      </label>

      <button
        type="button"
        onClick={() => onCheckedChange(!checked)}
        aria-checked={checked}
        id={id}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-2 transition-all duration-200 ${
          checked
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-400"
        }`}
      >
        {checked && <Check className="w-4 h-4" />}
      </button>
    </div>
  );
}
