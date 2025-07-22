
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bus, Sparkles, Trophy, Users, Calendar } from 'lucide-react';

interface LocalInsight {
  id: string;
  type: string;
  title: string;
  description: string;
}

interface InsightsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cityName: string;
  localInsights: LocalInsight[];
  transport: string;
  famousPlaces: string;
  sportsFacilities: string;
  studentLife: string;
}

export const InsightsDialog = ({
  open,
  onOpenChange,
  cityName,
  localInsights,
  transport,
  famousPlaces,
  sportsFacilities,
  studentLife
}: InsightsDialogProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'transport': return <Bus className="h-5 w-5" />;
      case 'places': return <MapPin className="h-5 w-5" />;
      case 'sports': return <Trophy className="h-5 w-5" />;
      case 'student': return <Users className="h-5 w-5" />;
      case 'events': return <Calendar className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transport': return 'bg-blue-100 text-blue-800 dark:bg-soft-violet/20 dark:text-soft-violet';
      case 'places': return 'bg-green-100 text-green-800 dark:bg-emerald-green/20 dark:text-emerald-green';
      case 'sports': return 'bg-orange-100 text-orange-800 dark:bg-amber-500/20 dark:text-amber-300';
      case 'student': return 'bg-purple-100 text-purple-800 dark:bg-light-lavender/20 dark:text-light-lavender';
      case 'events': return 'bg-pink-100 text-pink-800 dark:bg-coral-red/20 dark:text-coral-red';
      default: return 'bg-gray-100 text-gray-800 dark:bg-charcoal-gray dark:text-pure-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white dark:bg-charcoal-gray">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-soft-violet">
            <Sparkles className="h-6 w-6 text-purple-600 dark:text-soft-violet" />
            Complete Local Guide for {cityName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transport && (
              <div className="bg-blue-50 dark:bg-charcoal-gray p-4 rounded-lg border dark:border-slate-gray">
                <div className="flex items-center gap-2 mb-3">
                  <Bus className="h-5 w-5 text-blue-600 dark:text-soft-violet" />
                  <h3 className="font-semibold text-blue-900 dark:text-soft-violet">Transportation</h3>
                </div>
                <p className="text-blue-800 dark:text-pure-white text-sm">{transport}</p>
              </div>
            )}
            
            {famousPlaces && (
              <div className="bg-green-50 dark:bg-charcoal-gray p-4 rounded-lg border dark:border-slate-gray">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-green-600 dark:text-soft-violet" />
                  <h3 className="font-semibold text-green-900 dark:text-soft-violet">Famous Places</h3>
                </div>
                <p className="text-green-800 dark:text-pure-white text-sm">{famousPlaces}</p>
              </div>
            )}
            
            {sportsFacilities && (
              <div className="bg-orange-50 dark:bg-charcoal-gray p-4 rounded-lg border dark:border-slate-gray">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="h-5 w-5 text-orange-600 dark:text-soft-violet" />
                  <h3 className="font-semibold text-orange-900 dark:text-soft-violet">Sports & Recreation</h3>
                </div>
                <p className="text-orange-800 dark:text-pure-white text-sm">{sportsFacilities}</p>
              </div>
            )}
            
            {studentLife && (
              <div className="bg-purple-50 dark:bg-charcoal-gray p-4 rounded-lg border dark:border-slate-gray">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-purple-600 dark:text-soft-violet" />
                  <h3 className="font-semibold text-purple-900 dark:text-soft-violet">Student Life</h3>
                </div>
                <p className="text-purple-800 dark:text-pure-white text-sm">{studentLife}</p>
              </div>
            )}
          </div>
          
          {/* Detailed Local Insights */}
          {localInsights && localInsights.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-soft-violet">Additional Local Insights</h3>
              <div className="space-y-4">
                {localInsights.map((insight) => (
                  <div key={insight.id} className="border border-gray-200 dark:border-slate-gray rounded-lg p-4 bg-white dark:bg-charcoal-gray">
                    <div className="flex items-start gap-3">
                      <div className="text-gray-600 dark:text-soft-violet mt-1">
                        {getIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-soft-violet">{insight.title}</h4>
                          <Badge className={getTypeColor(insight.type)}>
                            {insight.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-pure-white text-sm">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
