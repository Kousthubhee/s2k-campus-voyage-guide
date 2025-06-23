
interface BenefitsListProps {
  benefits: string[];
}

export const BenefitsList = ({ benefits }: BenefitsListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {benefits.map((benefit, index) => (
      <div key={index} className="flex items-center">
        <div className="text-blue-600 mr-2">✓</div>
        <span className="text-blue-800">{benefit}</span>
      </div>
    ))}
  </div>
);

