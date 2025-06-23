
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FrenchIntegrationModuleCardProps {
  icon: React.ComponentType<any>; // Accept anything (LucideProps etc)
  title: string;
  topicCount: number;
  description: string;
  onClick?: () => void;
}

const FrenchIntegrationModuleCard: React.FC<FrenchIntegrationModuleCardProps> = ({
  icon: Icon,
  title,
  topicCount,
  description,
  onClick,
}) => (
  <button
    className={cn(
      "relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e6ecf4] bg-[#f6faff] shadow-sm h-full w-full transition hover:shadow-md hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-indigo-400",
      "outline-none"
    )}
    tabIndex={0}
    onClick={onClick}
    aria-label={`${title}: Start Learning`}
    type="button"
  >
    <div className="flex justify-center items-center w-full pt-8">
      <div className="bg-blue-50 rounded-xl w-20 h-20 flex items-center justify-center mb-5">
        {/* Pass correct Lucide icon props */}
        <Icon className="text-[2.1rem] text-gray-700" size={34} />
      </div>
    </div>
    <div className="flex-1 flex flex-col px-6 pb-5 gap-2">
      <span className="font-bold text-lg text-gray-900 mt-1 text-left">{title}</span>
      <span className="text-sm text-gray-600 text-left">{description}</span>
      <div className="flex justify-between items-end mt-6">
        <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold select-none">
          Available
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <span className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-4 py-1.5 rounded-lg text-sm transition-all">
            Start
          </span>
          <ArrowRight className="ml-1 w-4 h-4 text-gray-400" />
        </span>
      </div>
    </div>
  </button>
);
export default FrenchIntegrationModuleCard;
