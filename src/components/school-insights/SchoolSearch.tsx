
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SchoolSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function SchoolSearch({ searchTerm, onSearchChange }: SchoolSearchProps) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search schools by name, program, or location..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 w-full bg-white border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
