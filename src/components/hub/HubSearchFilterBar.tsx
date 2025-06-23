
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HubSearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  categories: string[];
}

export function HubSearchFilterBar({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories
}: HubSearchFilterBarProps) {
  return (
    <div className="mt-6 flex flex-col md:flex-row items-center gap-3 justify-center">
      <div className="flex items-center gap-2 w-full md:w-96">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search community posts…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="border rounded px-2 py-2 text-sm md:w-48 w-full focus:outline-none"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
