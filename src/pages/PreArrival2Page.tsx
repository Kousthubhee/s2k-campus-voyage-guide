import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, CirclePlus, CircleHelp, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

export const PackingAssistantRouen = () => {
  const [customItems, setCustomItems] = useState([]);
  const [form, setForm] = useState({ item: '', category: '', reason: '', feedback: false });
  const [completedItems, setCompletedItems] = useState([]);
  const { toast } = useToast();

  const essentialChecklist = [
    { item: 'Garam Masala', reason: 'Cheaper and preferred blend', available: 'Triangle (~€2.50/100g), Amazon (~€5+)', note: 'Triangle has most basics except curry leaves, amla, shallots.' },
    { item: 'Rice Cooker', reason: 'Used daily at home, 220V compatible', available: 'Buy at Darty, Boulanger, or online (Amazon)', note: 'Check wattage and plug compatibility.' },
    { item: 'Blanket', reason: 'Preferred weight and comfort', available: 'Can be bought from IKEA, Carrefour, or Amazon France', note: 'Don’t overpack bulky items, buy locally if possible.' },
  ];

  const handleAddCustomItem = () => {
    if (!form.item || !form.category) return;
    setCustomItems([...customItems, { ...form }]);
    setForm({ item: '', category: '', reason: '', feedback: false });
  };

  const handleCompleteItem = (item) => {
    if (!completedItems.includes(item)) {
      setCompletedItems([...completedItems, item]);
      toast({ title: 'Item marked as packed', description: `${item}` });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Button variant="outline" className="mb-4"><ArrowLeft className="h-4 w-4 mr-2" />Back to Checklist</Button>
      <h1 className="text-2xl font-bold mb-4">🎒 Rouen Packing Assistant</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>✅ Suggested Essentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {essentialChecklist.map(({ item, reason, available, note }, index) => (
            <div key={index} className="border rounded p-3 space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{item}</p>
                {completedItems.includes(item) ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <Button size="sm" onClick={() => handleCompleteItem(item)}>Mark as Packed</Button>
                )}
              </div>
              <p className="text-sm text-gray-600">Why: {reason}</p>
              <p className="text-sm text-blue-700">🛒 Where to buy: {available}</p>
              <p className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded flex items-start"><AlertTriangle className="h-4 w-4 mr-2" />{note}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>➕ Add Custom Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Item Name" value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} />
          <Input placeholder="Category (Clothing, Electronics, etc.)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Textarea placeholder="Why are you packing this?" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.feedback} onChange={(e) => setForm({ ...form, feedback: e.target.checked })} />
            Request Admin Feedback?
          </label>
          <Button onClick={handleAddCustomItem}><CirclePlus className="h-4 w-4 mr-2" />Add Item</Button>
        </CardContent>
      </Card>

      {customItems.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>📝 Your Added Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customItems.map((c, idx) => (
              <div key={idx} className="border p-3 rounded">
                <p className="font-semibold">{c.item}</p>
                <p className="text-sm">Category: {c.category}</p>
                <p className="text-sm">Reason: {c.reason}</p>
                {c.feedback && <p className="text-xs text-red-600 mt-1">📩 Feedback Requested</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">🔁 Tips from Seniors:</h3>
          <ul className="text-sm text-blue-900 list-disc ml-6">
            <li>Triangle store has almost all essentials except curry leaves, amla, shallots.</li>
            <li>Don’t carry open masala packets in bulk—Meghna and Jay reported customs issues.</li>
            <li>Buy appliances with EU plug or carry adapter; avoid immersion rods (voltage issues).</li>
            <li>Check if your rice cooker or grinder supports 220V.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
