import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Info, Plus, Download, Save, MapPin, Filter, ShoppingBag, Shirt, Utensils, Plug, Home, Droplet } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useToast } from '@/hooks/use-toast';
import clothingData from '@/data/clothing.json';
import foodData from '@/data/food.json';
import kitchenData from '@/data/kitchen.json';
import electronicsData from '@/data/electronics.json';
import accommodationData from '@/data/accommodation.json';
import toiletriesData from '@/data/toiletries.json';
import confetti from 'canvas-confetti';


interface PackingItem {
  id: string;
  name: string;
  category: string;
  source: 'Pack from India' | 'Buy in France' | 'Optional';
  note?: string;
  isChecked: boolean;
  isUserAdded?: boolean;
  tooltip?: string;
  storeSuggestions?: string[];
  studentTip?: string;
  storeInfo?: string;
  priceRange?: string;
}

interface PackingAssistancePageProps {
  onBack: () => void;
}

export const PreArrival2Page = ({ onBack }: PackingAssistancePageProps) => {
  const [selectedLocation, setSelectedLocation] = useState('Rouen');
  const [selectedCategory, setSelectedCategory] = useState('clothing');
  const [packingItems, setPackingItems] = useState<PackingItem[]>([]);
  const [justCompleted, setJustCompleted] = useState(false);
  const [hidePacked, setHidePacked] = useState(false);
  const [newItem, setNewItem] = useState<Omit<PackingItem, 'id' | 'isChecked' | 'category'>>({
    name: '',
    source: 'Pack from India',
  });
  const { toast: uiToast } = useToast();

  const generateInitialItems = (): PackingItem[] => {
  const items: PackingItem[] = [];

  // CLOTHING
  if (clothingData?.items) {
    if (clothingData.items.mustBring) {
      clothingData.items.mustBring.forEach((item, index) => {
        items.push({
          id: `clothing-mustbring-${index}`,
          name: item.name,
          category: 'clothing',
          source: 'Pack from India',
          note: item.tooltip,
          isChecked: false,
          tooltip: item.tooltip,
          storeSuggestions: item.storeSuggestions,
          studentTip: item.studentTip
        });
      });
    }
    if (clothingData.items.optional) {
      clothingData.items.optional.forEach((item, index) => {
        items.push({
          id: `clothing-optional-${index}`,
          name: item.name,
          category: 'clothing',
          source: 'Optional',
          note: item.tooltip,
          isChecked: false,
          tooltip: item.tooltip,
          storeSuggestions: item.storeSuggestions,
          studentTip: item.studentTip
        });
      });
    }
    if (clothingData.items.buyInFrance) {
      clothingData.items.buyInFrance.forEach((item, index) => {
        items.push({
          id: `clothing-buyinfrance-${index}`,
          name: item.name,
          category: 'clothing',
          source: 'Buy in France',
          note: item.tooltip,
          isChecked: false,
          tooltip: item.tooltip,
          storeSuggestions: item.storeSuggestions,
          studentTip: item.studentTip
        });
      });
    }
  }

  // FOOD
  if (foodData?.items) {
    if (foodData.items.mustBring) {
      foodData.items.mustBring.forEach((item, index) => {
        items.push({
          id: `food-mustbring-${index}`,
          name: item.name,
          category: 'food',
          source: 'Pack from India',
          note: item.tooltip,
          isChecked: false,
          tooltip: item.tooltip,
          storeSuggestions: item.storeSuggestions,
          studentTip: item.studentTip
        });
      });
    }
    if (foodData.items.optional) {
      foodData.items.optional.forEach((item, index) => {
        items.push({
          id: `food-optional-${index}`,
          name: item.name,
          category: 'food',
          source: 'Optional',
          note: item.tooltip,
          isChecked: false,
          tooltip: item.tooltip,
          storeSuggestions: item.storeSuggestions,
          studentTip: item.studentTip
        });
      });
    }
    if (foodData.items.buyInFrance) {
      foodData.items.buyInFrance.forEach((item, index) => {
        items.push({
          id: `food-buyinfrance-${index}`,
          name: item.name,
          category: 'food',
          source: 'Buy in France',
          note: item.tooltip,
          isChecked: false,
          tooltip: item.tooltip,
          storeSuggestions: item.storeSuggestions,
          studentTip: item.studentTip
        });
      });
    }
  }

  // KITCHEN
  if (kitchenData?.items) {
    if (kitchenData.items.mustBring) {
      kitchenData.items.mustBring.forEach((item, index) => {
        const source: PackingItem['source'] = 
          item.tag === 'Pack from India' ? 'Pack from India' :
          item.tag === 'Buy in France' ? 'Buy in France' : 'Optional';
        
        items.push({
          id: `kitchen-mustbring-${index}`,
          name: item.name,
          category: 'kitchen',
          source,
          note: item.tooltip,
          isChecked: false,
          tooltip: item.tooltip,
          storeSuggestions: item.storeSuggestions,
          studentTip: item.studentTip
        });
      });
    }
    if (kitchenData.items.optional) {
      kitchenData.items.optional.forEach((item, index) => {
        const source: PackingItem['source'] = 
          item.tag === 'Pack from India' ? 'Pack from India' :
          item.tag === 'Buy in France' ? 'Buy in France' : 'Optional';
        
        items.push({
          id: `kitchen-optional-${index}`,
          name: item.name,
          category: 'kitchen',
          source,
          note: item.tooltip,
          isChecked: false,
          tooltip: item.tooltip,
          storeSuggestions: item.storeSuggestions,
          studentTip: item.studentTip
        });
      });
    }
    if (kitchenData.items.buyInFrance) {
      kitchenData.items.buyInFrance.forEach((item, index) => {
        const source: PackingItem['source'] = 
          item.tag === 'Pack from India' ? 'Pack from India' :
          item.tag === 'Buy in France' ? 'Buy in France' : 'Optional';
        
        items.push({
          id: `kitchen-buyinfrance-${index}`,
          name: item.name,
          category: 'kitchen',
          source,
          note: item.tooltip,
          isChecked: false,
          tooltip: item.tooltip,
          storeSuggestions: item.storeSuggestions,
          studentTip: item.studentTip
        });
      });
    }
  }

  // ELECTRONICS
  if (Array.isArray(electronicsData)) {
    electronicsData.forEach((item, index) => {
      const storeSuggestions = item.storeSuggestions?.map(s => `${s.store} (${s.approxPrice})`);
      const source: PackingItem['source'] =
        item.recommendation === 'must-bring'
          ? 'Pack from India'
          : item.recommendation === 'optional'
          ? 'Optional'
          : 'Buy in France';

      items.push({
        id: `electronics-${index}`,
        name: item.item,
        category: 'electronics',
        source,
        note: '',
        isChecked: false,
        tooltip: item.studentTips,
        storeSuggestions,
        studentTip: item.studentTips
      });
    });
  }

  // ACCOMMODATION
  if (Array.isArray(accommodationData)) {
    accommodationData.forEach((item, index) => {
      const storeSuggestions = item.storeSuggestions?.map(s => `${s.store} (${s.approxPrice})`);
      const source: PackingItem['source'] =
        item.recommendation === 'must-bring'
          ? 'Pack from India'
          : item.recommendation === 'buy-there'
          ? 'Buy in France'
          : 'Optional';

      items.push({
        id: `accommodation-${index}`,
        name: item.item,
        category: 'accommodation',
        source,
        note: '',
        isChecked: false,
        tooltip: item.studentTips,
        storeSuggestions,
        studentTip: item.studentTips
      });
    });
  }

  // TOILETRIES
  if (Array.isArray(toiletriesData)) {
    toiletriesData.forEach((item, index) => {
      const storeSuggestions = item.storeSuggestions?.map(s =>
        `${s.store}${s.approxPrice ? ` (${s.approxPrice})` : ''}`
      );
      const source: PackingItem['source'] =
        item.recommendation === 'must-bring'
          ? 'Pack from India'
          : item.recommendation === 'buy-there'
          ? 'Buy in France'
          : 'Optional';

      items.push({
        id: `toiletries-${index}`,
        name: item.item,
        category: 'toiletries',
        source,
        note: item.studentTips,
        isChecked: false,
        tooltip: item.studentTips,
        storeSuggestions,
        studentTip: item.studentTips
      });
    });
  }

  return items;
};


  const initialPackingItems = generateInitialItems();

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('packingItems');
    if (savedItems) {
      setPackingItems(JSON.parse(savedItems));
    } else {
      setPackingItems(initialPackingItems);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (packingItems.length > 0) {
      localStorage.setItem('packingItems', JSON.stringify(packingItems));
    }
  }, [packingItems]);

  // Calculate progress
  const totalItems = packingItems.length;
  const checkedItems = packingItems.filter(item => item.isChecked).length;
  const progressPercentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  // Celebrate with confetti when progress reaches 100%
  useEffect(() => {
    if (progressPercentage >= 100 && !justCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setJustCompleted(true);
    }
  }, [progressPercentage, justCompleted]);

  const handleItemCheck = (id: string, checked: boolean) => {
    setPackingItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isChecked: checked } : item
      )
    );
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      toast('Please enter an item name');
      return;
    }

    const newItemComplete: PackingItem = {
      id: Date.now().toString(),
      name: newItem.name,
      category: selectedCategory,
      source: newItem.source,
      note: newItem.note,
      isChecked: false,
      isUserAdded: true
    };

    setPackingItems(prev => [...prev, newItemComplete]);
    setNewItem({
      name: '',
      source: 'Pack from India',
      note: ''
    });

    uiToast({
      title: "Item Added",
      description: `${newItem.name} has been added to your packing list.`
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(packingItems, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `packing-list-${selectedLocation}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    uiToast({
      title: "List Exported",
      description: "Your packing list has been exported as JSON."
    });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your packing list? This will remove all your customizations.')) {
      setPackingItems(initialPackingItems);
      uiToast({
        title: "List Reset",
        description: "Your packing list has been reset to default items."
      });
    }
  };

  // Filter items by current category and hide packed if needed
  const filteredItems = packingItems.filter(item => {
    if (item.category !== selectedCategory) return false;
    if (hidePacked && item.isChecked) return false;
    return true;
  });

  // Category icons mapping
  const categoryIcons = {
    clothing: <Shirt className="h-5 w-5" />,
    food: <Utensils className="h-5 w-5" />,
    kitchen: <Utensils className="h-5 w-5" />,
    electronics: <Plug className="h-5 w-5" />,
    accommodation: <Home className="h-5 w-5" />,
    toiletries: <Droplet className="h-5 w-5" />
  };

  // Source badge colors
  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'Pack from India':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Buy in France':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Optional':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎒 Packing Assistance
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your luggage smartly. Know what to bring, what to skip, and what to buy locally.
          </p>
        </div>
      </div>

      {/* Progress Tracker */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Your Packing Progress</h3>
            <span className="text-sm font-medium text-blue-600">{checkedItems} of {totalItems} items</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Not Started</span>
            <span>In Progress</span>
            <span>Complete</span>
          </div>
        </CardContent>
      </Card>

      {/* Location Selector */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Location:</span>
        </div>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Choose a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Rouen">Rouen</SelectItem>
            <SelectItem value="Paris" disabled>Paris (Coming Soon)</SelectItem>
            <SelectItem value="Lyon" disabled>Lyon (Coming Soon)</SelectItem>
            <SelectItem value="Lille" disabled>Lille (Coming Soon)</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
          <Info className="h-3 w-3 mr-1" />
          More cities will be added soon. Currently optimized for students in Rouen.
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="clothing" className="flex items-center gap-1 text-xs md:text-sm">
            <Shirt className="h-4 w-4" />
            <span className="hidden md:inline">Clothing</span>
          </TabsTrigger>
          <TabsTrigger value="food" className="flex items-center gap-1">
            <Utensils className="h-4 w-4" />
            <span className="hidden md:inline">Food</span>
          </TabsTrigger>
          <TabsTrigger value="kitchen" className="flex items-center gap-1">
            <Utensils className="h-4 w-4" />
            <span className="hidden md:inline">Kitchen</span>
          </TabsTrigger>
          <TabsTrigger value="electronics" className="flex items-center gap-1">
            <Plug className="h-4 w-4" />
            <span className="hidden md:inline">Electronics</span>
          </TabsTrigger>
          <TabsTrigger value="accommodation" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Accommodation</span>
          </TabsTrigger>
          <TabsTrigger value="toiletries" className="flex items-center gap-1">
            <Droplet className="h-4 w-4" />
            <span className="hidden md:inline">Toiletries</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Items List */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {categoryIcons[selectedCategory as keyof typeof categoryIcons]}
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Items
          </h2> 
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Checkbox
            id="hide-packed" 
            checked={hidePacked}
            onCheckedChange={(checked) => setHidePacked(!!checked)}
          />
          <label 
            htmlFor="hide-packed" 
            className="ml-2 text-sm text-gray-700 cursor-pointer"
          >
            Hide packed items
          </label>
        </div>

        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 py-4">
                {hidePacked 
                  ? "All items in this category are packed! 🎉" 
                  : "No items in this category. Add some below!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} className={`transition-all duration-200 ${item.isChecked ? 'bg-gray-50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id={`item-${item.id}`}
                    checked={item.isChecked}
                    onCheckedChange={(checked) => handleItemCheck(item.id, checked === true)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Label 
                        htmlFor={`item-${item.id}`}
                        className={`font-medium text-gray-900 ${item.isChecked ? 'line-through text-gray-500' : ''}`}
                      >
                        {item.name}
                      </Label>
                      <Badge className={`${getSourceBadgeColor(item.source)} text-xs`}>
                        {item.source} 
                      </Badge>
                      {item.isUserAdded && (
                        <Badge variant="outline" className="text-xs">
                          User Added
                        </Badge>
                      )}
                    </div>
                    {(item.note || item.tooltip) && ( 
                      <p className="text-sm text-gray-600 mb-1">
                        {item.note || item.tooltip}
                      </p>
                    )}

                    {item.storeSuggestions && item.storeSuggestions.length > 0 && (
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        <span>{item.storeSuggestions.join(', ')}</span>
                      </div>
                    )}
                    {item.studentTip && ( 
                      <div className="bg-blue-50 p-2 rounded-md text-xs text-blue-700 mt-1">
                        <span className="font-medium">Student Tip:</span> {item.studentTip}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add New Item */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Your Own Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"> 
            <div>
              <Label htmlFor="item-name" className="mb-2 block">Item Name</Label>
              <Input 
                id="item-name"
                placeholder="e.g., Raincoat"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
            </div> 
            <div>
              <Label htmlFor="item-source" className="mb-2 block">Source</Label>
              <Select 
                value={newItem.source} 
                onValueChange={(value) => setNewItem({...newItem, source: value as PackingItem['source']})}
              >
                <SelectTrigger id="item-source">
                  <SelectValue placeholder="Where to get it?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pack from India">Pack from India</SelectItem>
                  <SelectItem value="Buy in France">Buy in France</SelectItem>
                  <SelectItem value="Optional">Optional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-4"> 
            <Label htmlFor="item-note" className="mb-2 block">Note (Optional)</Label>
            <Textarea 
              id="item-note"
              placeholder="Add any notes or reminders about this item..."
              value={newItem.note || ''}
              onChange={(e) => setNewItem({...newItem, note: e.target.value})}
            />
          </div>
          <Button onClick={handleAddItem} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Packing Tips</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Pack light - you can buy most things in France</li>
            <li>• Bring a universal adapter for your electronics</li>
            <li>• Consider shipping some items ahead to reduce luggage weight</li>
            <li>• Download offline translation apps before traveling</li>
            <li>• Join French student groups on social media for tips</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500 mb-8">
        Progress: {checkedItems} of {totalItems} items packed
      </div>
    </div>
  );
};

// Keep the legacy export for backward compatibility
export const PackingAssistancePage = PreArrival2Page;
