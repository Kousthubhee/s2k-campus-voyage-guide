
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export function CategorySelector({ categories, selectedCategory, onCategorySelect }: CategorySelectorProps) {
  return (
    <div className="mt-2">
      <Select value={selectedCategory} onValueChange={onCategorySelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
