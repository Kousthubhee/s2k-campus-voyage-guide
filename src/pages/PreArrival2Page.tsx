import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Filter, ChefHat, Cloud, Users, CircleDot } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageTitle } from '@/components/PageTitle';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import confetti from 'canvas-confetti';
import { useToast } from '@/hooks/use-toast';
import { Progress } from "@/components/ui/progress";

// Unsplash placeholder city images by name
const cityImages: Record<string, string> = {
  Paris: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=600&q=80",
  Lyon: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
  Marseille: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=600&q=80",
  Toulouse: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
  Nice: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&q=80",
  Nantes: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80",
  Strasbourg: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&q=80",
  Montpellier: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
  Rouen: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&q=80",
  Reims: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=600&q=80",
  Lille: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
  Bordeaux: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=600&q=80",
  Grenoble: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80",
};

const tipsByCity: Record<string, string[]> = {
  Paris: [
    "The metro is fast and affordable—get a Navigo card for convenience.",
    "Bi-weekly markets offer fresh and budget-friendly produce.",
    "Sunday is quiet; most stores are closed.",
  ],
  Lyon: [
    "Try local 'bouchons' for authentic Lyonnaise food.",
    "The Fête des Lumières is a must-see winter event.",
    "Carry a reusable bag for groceries; stores may charge for bags.",
  ],
  Marseille: [
    "Enjoy local seafood at the Vieux Port.",
    "Sun protection is key! Summers are hot and bright.",
    "Markets sell great spices for Mediterranean cooking.",
  ],
  // ...repeat or add more tips for other cities
  Default: [
    "Buy essential toiletries after arrival for lighter baggage.",
    "A compact umbrella is useful anywhere in France.",
    "Many student clubs exist—join one to make new friends.",
    "Get a SIM card at the airport for instant connectivity.",
    "Always keep passport copies in your suitcase and digitally.",
  ]
};

interface PreArrival2PageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  profile: {
    name: string;
    email: string;
    about: string;
    memberSince: string;
    photo: string;
    age: string;
    prevEducation: string;
    workExperience: string;
  };
}

export const PreArrival2Page = ({ onBack, onComplete, isCompleted, profile }: PreArrival2PageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('Paris');
  const [justCompleted, setJustCompleted] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Rouen', 'Reims', 'Lille', 'Bordeaux', 'Grenoble'];
  const cityData = {
    'Paris': {
      food: {
        available: "Diverse range including French, Italian, Asian, and Middle Eastern cuisines. Indian restaurants are plentiful in areas like La Chapelle.",
        supermarkets: "Carrefour, Monoprix, Franprix, Leclerc",
        indianItems: "Spices (turmeric, cumin), lentils, and basmati rice available at Indian stores like VT Cash & Carry. Bring specialty items like specific masalas or pickles if preferred.",
        mustBring: "Regional spices (e.g., garam masala), pressure cooker for quick dal/rice cooking"
      },
      weather: {
        climate: "Cold winters (0–7°C), mild summers (15–25°C), frequent rain",
        clothing: "Warm coat, waterproof boots, scarf, gloves for winter; light jackets and breathable fabrics for summer; umbrella or raincoat essential"
      },
      culture: {
        vibe: "Fast-paced, cosmopolitan, formal etiquette. Greet with \"bonjour\" before conversations",
        traditions: "Bastille Day (July 14), Paris Fashion Week, Christmas markets",
        tips: "Be punctual, respect personal space, learn basic French phrases for daily interactions"
      }
    },
    'Lyon': {
      food: {
        available: "Known for gastronomy; French, Italian, North African cuisines. Some Indian restaurants in Vieux Lyon.",
        supermarkets: "Carrefour, Super U, Casino",
        indianItems: "Basic spices and lentils at Asian markets like Bahadourian. Specialty snacks may be limited.",
        mustBring: "Homemade spice mixes, specific snacks like chakli or thepla"
      },
      weather: {
        climate: "Cold winters (0–5°C), hot summers (20–30°C), occasional rain",
        clothing: "Heavy winter coat, sweaters, waterproof shoes; light clothing for summer; umbrella recommended"
      },
      culture: {
        vibe: "Food-centric, friendly but reserved. Greetings are formal.",
        traditions: "Fête des Lumières (December), Lyon Film Festival",
        tips: "Engage in food culture, try local bouchons, use \"merci\" frequently"
      }
    },
    'Toulouse': {
      food: {
        available: "French, Spanish influences, limited Indian restaurants.",
        supermarkets: "Leclerc, Auchan, Intermarché",
        indianItems: "Basic spices at hypermarkets; Indian stores less common, so stock up in bigger cities.",
        mustBring: "Specialty spices, instant mixes for dosa/idli"
      },
      weather: {
        climate: "Mild winters (5–10°C), hot summers (25–35°C), less rain",
        clothing: "Light winter jacket, t-shirts, shorts for summer; sunglasses and hat for sun protection"
      },
      culture: {
        vibe: "Relaxed, student-friendly, vibrant nightlife.",
        traditions: "Violet Festival (February), rugby culture",
        tips: "Join student clubs, respect local pace, learn basic French for markets"
      }
    },
    'Rouen': {
      food: {
        available: "Traditional French, limited ethnic options.",
        supermarkets: "Carrefour, Monoprix",
        indianItems: "Basic spices at larger stores; Indian shops scarce, order online.",
        mustBring: "Key spices, small cooking tools like a tawa"
      },
      weather: {
        climate: "Cool, rainy winters (2–8°C), mild summers (15–22°C)",
        clothing: "Waterproof jacket, warm layers, sturdy shoes; umbrella essential"
      },
      culture: {
        vibe: "Historical, quieter, formal interactions.",
        traditions: "Joan of Arc Festival (May), Christmas markets",
        tips: "Respect historical sites, use polite greetings, visit local cathedrals"
      }
    },
    'Reims': {
      food: {
        available: "French cuisine, champagne-focused, few Indian options.",
        supermarkets: "Carrefour, Leclerc",
        indianItems: "Limited; basic spices at hypermarkets, order specialty items online.",
        mustBring: "Indian snacks, spice blends"
      },
      weather: {
        climate: "Cold winters (0–5°C), mild summers (15–25°C), rainy",
        clothing: "Heavy coat, scarf, waterproof boots; light layers for summer; umbrella needed"
      },
      culture: {
        vibe: "Elegant, champagne culture, reserved locals.",
        traditions: "Champagne festivals, Reims Cathedral events",
        tips: "Learn about champagne culture, use formal greetings, explore historical sites"
      }
    },
    'Lille': {
      food: {
        available: "French, Belgian influences, some Indian restaurants.",
        supermarkets: "Carrefour, Auchan, Match",
        indianItems: "Spices, lentils at ethnic stores in Wazemmes market.",
        mustBring: "Specific masalas, regional snacks"
      },
      weather: {
        climate: "Cold, wet winters (0–6°C), mild summers (15–22°C)",
        clothing: "Warm jacket, gloves, waterproof shoes; umbrella or raincoat critical"
      },
      culture: {
        vibe: "Friendly, student-heavy, multicultural.",
        traditions: "Braderie de Lille (September), Christmas markets",
        tips: "Engage in markets, learn basic French, respect queue etiquette"
      }
    },
    'Strasbourg': {
      food: {
        available: "French-German fusion, limited Indian options.",
        supermarkets: "Leclerc, Super U, Coop",
        indianItems: "Basic spices at larger stores; Indian shops rare.",
        mustBring: "Specialty spices, instant mixes"
      },
      weather: {
        climate: "Cold winters (-2–5°C), warm summers (18–28°C), frequent rain",
        clothing: "Heavy coat, scarf, boots for winter; light clothing for summer; umbrella essential"
      },
      culture: {
        vibe: "Multicultural, formal, European vibe.",
        traditions: "Christmas markets (December), European Parliament events",
        tips: "Learn about EU culture, use polite French/German greetings, visit Petite France"
      }
    },
    'Bordeaux': {
      food: {
        available: "French, wine-focused, some Asian cuisine.",
        supermarkets: "Carrefour, Leclerc, Intermarché",
        indianItems: "Basic spices at hypermarkets; Indian stores limited.",
        mustBring: "Regional spices, small cookware"
      },
      weather: {
        climate: "Mild winters (5–10°C), warm summers (20–30°C), rainy",
        clothing: "Light winter jacket, waterproof shoes; breathable fabrics for summer; umbrella needed"
      },
      culture: {
        vibe: "Relaxed, wine-centric, friendly.",
        traditions: "Bordeaux Wine Festival (June), local markets",
        tips: "Engage in wine culture, use \"bonjour,\" explore vineyards"
      }
    },
    'Nice': {
      food: {
        available: "Mediterranean, French, Italian influences, some Indian restaurants.",
        supermarkets: "Carrefour, Monoprix, Casino",
        indianItems: "Spices, lentils at ethnic stores in city center.",
        mustBring: "Specialty snacks, specific masalas"
      },
      weather: {
        climate: "Mild winters (8–14°C), hot summers (20–30°C), sunny",
        clothing: "Light jacket for winter, t-shirts, shorts for summer; sunglasses, hat for sun"
      },
      culture: {
        vibe: "Relaxed, tourist-friendly, Mediterranean vibe.",
        traditions: "Nice Carnival (February), Promenade des Anglais events",
        tips: "Learn basic French, respect beach etiquette, join local festivals"
      }
    },
    'Marseille': {
      food: {
        available: "Mediterranean, North African, some Indian options.",
        supermarkets: "Carrefour, Leclerc, Super U",
        indianItems: "Spices, lentils at ethnic markets in Noailles.",
        mustBring: "Regional snacks, spice blends"
      },
      weather: {
        climate: "Mild winters (5–12°C), hot summers (20–32°C), sunny",
        clothing: "Light jacket, breathable fabrics; sunglasses, hat for summer"
      },
      culture: {
        vibe: "Diverse, lively, port-city vibe.",
        traditions: "La Fête du Panier (June), bouillabaisse culture",
        tips: "Embrace diversity, learn basic French, explore markets"
      }
    },
    'Grenoble': {
      food: {
        available: "French, Alpine cuisine, limited Indian options.",
        supermarkets: "Carrefour, Casino",
        indianItems: "Basic spices at hypermarkets; Indian stores rare.",
        mustBring: "Specialty spices, instant mixes"
      },
      weather: {
        climate: "Cold winters (-2–5°C), warm summers (18–28°C), snowy in winter",
        clothing: "Heavy coat, thermal wear, snow boots; light clothing for summer"
      },
      culture: {
        vibe: "Academic, outdoor-focused, friendly.",
        traditions: "Grenoble Jazz Festival (March), mountain festivals",
        tips: "Join outdoor activities, use polite greetings, learn basic French"
      }
    },
    'Nantes': {
      food: {
        available: "French, seafood-heavy, limited Indian restaurants.",
        supermarkets: "Leclerc, Super U, Intermarché",
        indianItems: "Basic spices at larger stores; Indian shops scarce.",
        mustBring: "Specialty spices, snacks like murukku"
      },
      weather: {
        climate: "Mild winters (5–10°C), warm summers (18–25°C), rainy",
        clothing: "Waterproof jacket, warm layers; light clothing for summer; umbrella essential"
      },
      culture: {
        vibe: "Creative, student-friendly, maritime heritage.",
        traditions: "Les Machines de l'Île events, La Folle Journée (February)",
        tips: "Engage in art scene, use \"bonjour,\" explore local history"
      }
    },
    'Montpellier': {
      food: {
        available: "Mediterranean, French, some ethnic options.",
        supermarkets: "Carrefour, Leclerc, Monoprix",
        indianItems: "Basic spices at larger stores; limited Indian shops.",
        mustBring: "Specialty spices, regional snacks"
      },
      weather: {
        climate: "Mild winters (5–12°C), hot summers (20–30°C), sunny",
        clothing: "Light jacket for winter, breathable summer clothes; sunglasses essential"
      },
      culture: {
        vibe: "Young, vibrant, student-oriented.",
        traditions: "Festival de Radio France (July), local markets",
        tips: "Join student activities, learn basic French, explore tram system"
      }
    }
  };

  const faqs: Record<string, { q: string; a: string }[]> = {
    'Paris': [
      {
        q: "What voltage adapters do I need?",
        a: "France uses type C and E outlets (230V, 50Hz). Bring universal/plugs supporting these types."
      },
      {
        q: "Where to buy affordable winter gear?",
        a: "Try Decathlon, Monoprix, or second-hand shops like Guerrisol."
      }
    ],
    'Lyon': [
      {
        q: "Are Indian groceries easy to find?",
        a: "Bahadourian market offers a range of Indian groceries and spices."
      },
      {
        q: "Do I need rain gear?",
        a: "Yes, Lyon has occasional rain. Bring an umbrella and waterproof shoes."
      }
    ],
    'Toulouse': [
      {
        q: "Is English widely understood?",
        a: "Basic phrases are known in student areas, but learning French is recommended."
      },
      {
        q: "Where can I get Indian spices?",
        a: "Hypermarkets and Asian stores usually have essentials."
      }
    ],
    // ... repeat for each city, or provide some generic ones as fallback
  };

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const renderCityInfo = () => {
    const cityInfo = cityData[selectedCity as keyof typeof cityData];
    if (!cityInfo) return null;

    return (
      <div className="mb-8 space-y-6">
        <h2 className="text-xl font-semibold mb-4">🏙️ {selectedCity} City Guide</h2>
        
        {/* Food Preparation */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChefHat className="h-6 w-6 mr-3 text-orange-600" />
              Food Preparation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Available Food:</h4>
                <p className="text-gray-600 text-sm">{cityInfo.food.available}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Major Supermarkets:</h4>
                <p className="text-gray-600 text-sm">{cityInfo.food.supermarkets}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Indian Items:</h4>
                <p className="text-gray-600 text-sm">{cityInfo.food.indianItems}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Must Bring:</h4>
                <p className="text-blue-600 text-sm bg-blue-50 p-2 rounded">{cityInfo.food.mustBring}</p>
              </div>
            </div>
            
            {/* Interactive checklist for food preparation */}
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-gray-900">Food Preparation Checklist:</h4>
              {[
                'Research local supermarkets and ethnic stores',
                'Pack essential spices and specialty ingredients',
                'Learn about local food customs and meal times',
                'Identify halal/vegetarian food sources'
              ].map((item, index) => {
                const stepId = `food-${selectedCity}-${index}`;
                const isCompleted = completedSteps.includes(stepId);
                return (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{item}</span>
                    {!isCompleted ? (
                      <Button size="sm" onClick={() => handleStepComplete(stepId)}>
                        Complete
                      </Button>
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Clothing & Weather */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cloud className="h-6 w-6 mr-3 text-blue-600" />
              Clothing & Weather
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Climate:</h4>
                <p className="text-gray-600 text-sm">{cityInfo.weather.climate}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommended Clothing:</h4>
                <p className="text-blue-600 text-sm bg-blue-50 p-2 rounded">{cityInfo.weather.clothing}</p>
              </div>
            </div>
            
            {/* Interactive checklist for clothing */}
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-gray-900">Clothing Checklist:</h4>
              {[
                'Pack weather-appropriate clothing for all seasons',
                'Include formal attire for presentations/events',
                'Bring comfortable walking shoes',
                'Pack thermal clothing for winter months'
              ].map((item, index) => {
                const stepId = `clothing-${selectedCity}-${index}`;
                const isCompleted = completedSteps.includes(stepId);
                return (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{item}</span>
                    {!isCompleted ? (
                      <Button size="sm" onClick={() => handleStepComplete(stepId)}>
                        Complete
                      </Button>
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Cultural Preparation */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-3 text-purple-600" />
              Cultural Preparation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Local Culture:</h4>
                <p className="text-gray-600 text-sm">{cityInfo.culture.vibe}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Local Traditions:</h4>
                <p className="text-gray-600 text-sm">{cityInfo.culture.traditions}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Important Tips:</h4>
              <p className="text-purple-600 text-sm bg-purple-50 p-2 rounded">{cityInfo.culture.tips}</p>
            </div>
            
            {/* Interactive checklist for cultural preparation */}
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-gray-900">Cultural Preparation Checklist:</h4>
              {[
                'Learn basic French phrases and greetings',
                'Understand French social customs and etiquette',
                'Research local traditions and holidays',
                'Familiarize yourself with French educational system'
              ].map((item, index) => {
                const stepId = `culture-${selectedCity}-${index}`;
                const isCompleted = completedSteps.includes(stepId);
                return (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{item}</span>
                    {!isCompleted ? (
                      <Button size="sm" onClick={() => handleStepComplete(stepId)}>
                        Complete
                      </Button>
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const { toast } = useToast();

  // Helper - total checklist steps for percent
  const checklistSteps = 12;
  const progressPercent = Math.min(100, Math.round((completedSteps.length / checklistSteps) * 100));

  // City-appropriate tips fallback logic
  const cityTips = tipsByCity[selectedCity] || tipsByCity.Default;

  // Packing Tips Carousel logic (auto-rotate every 6s unless hovered)
  useEffect(() => {
    if (carouselPaused) return;
    const id = setInterval(() => {
      setTipIndex(ix => (ix + 1) % cityTips.length);
    }, 6000);
    return () => clearInterval(id);
  }, [carouselPaused, cityTips.length]);

  // Celebrate with confetti and toast
  const allStepsCompleted = completedSteps.length >= checklistSteps;

  // Celebrate when all steps are just now completed
  useEffect(() => {
    if (allStepsCompleted && !isCompleted && !justCompleted) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        zIndex: 10001,
      });
      toast({
        title: 'Congratulations!',
        description: 'You completed all packing steps. 🎉',
        variant: 'default',
      });
      setJustCompleted(true);
    }
    if (!allStepsCompleted) {
      setJustCompleted(false);
    }
  }, [allStepsCompleted, isCompleted, toast, justCompleted]);

  // Make cards and checklists easier to scroll on mobile
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-700">Progress</span>
          <Progress className="flex-1 h-3 rounded bg-gray-100" value={progressPercent} />
          <span className="text-xs font-semibold tabular-nums text-blue-600 w-10 text-right">{progressPercent}%</span>
        </div>
      </div>

      {/* Packing Tips Carousel */}
      <div
        className="mb-3 select-none cursor-pointer transition-all"
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
        tabIndex={0}
        aria-label="Packing Tip"
      >
        <Card className="bg-yellow-50 flex items-center px-3 py-2 border-yellow-200 animate-fade-in">
          <CircleDot className="h-6 w-6 text-yellow-400 mr-2" />
          <span className="text-yellow-800 text-[15px] font-medium">{cityTips[tipIndex]}</span>
        </Card>
      </div>

      {/* Back/Title/Header with City Image/Icon */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        
        <div className="text-center mb-8">
          <PageTitle>
            🎒 Packing Assistant
          </PageTitle>
          <p className="text-base text-gray-600 font-calibri">
            Food, clothes, and cultural preparation
          </p>
          {isCompleted && (
            <div className="mt-4 bg-green-100 p-3 rounded-lg">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-800 font-medium">Module Completed! You earned a key 🗝️</span>
              </div>
            </div>
          )}
        </div>

        {/* City Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Select Your City:</span>
          </div>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Choose a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Make this section horizontally scrollable for mobile */}
      <div className="overflow-x-auto flex flex-col gap-6">
        {renderCityInfo()}
      </div>

      {/* Optional Tips / FAQs Accordion */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg text-gray-700 mb-3">Optional Tips & FAQs</h3>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {(faqs[selectedCity] || [
            {
              q: "What voltage adapters do I need?",
              a: "France uses plug types C and E (230V). Bring a universal adapter."
            },
            {
              q: "Where to buy affordable winter gear?",
              a: "Check Decathlon, Monoprix, or second-hand stores."
            }
          ]).map(({ q, a }, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {allStepsCompleted && !isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Great Progress!
            </h3>
            <p className="text-green-700 mb-4">
              You've completed enough steps in this module.
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Module & Earn Key 🗝️
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Pack light - you can buy most things in France</li>
            <li>• Bring a universal adapter for your electronics</li>
            <li>• Consider shipping some items ahead to reduce luggage weight</li>
            <li>• Download offline translation apps before traveling</li>
            <li>• Join French student groups on social media for tips</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        Progress: {completedSteps.length} steps completed
      </div>
    </div>
  );
};
