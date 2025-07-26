
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FrenchLearningModule } from '@/components/learning/FrenchLearningModule';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, BookOpen, MessageCircle } from 'lucide-react';

interface LanguagePageProps {
  onBack: () => void;
}

export const LanguagePage = ({ onBack }: LanguagePageProps) => {
  const [selectedTab, setSelectedTab] = useState('french');

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            🗣️ Language Learning
          </h1>
          <p className="text-lg text-muted-foreground">
            Master essential languages for your study abroad journey
          </p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="french">
            🇫🇷 French Essentials
          </TabsTrigger>
          <TabsTrigger value="translator">
            🔄 Quick Translator
          </TabsTrigger>
          <TabsTrigger value="resources">
            📚 Learning Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="french" className="space-y-6 mt-6">
          <FrenchLearningModule />
        </TabsContent>

        <TabsContent value="translator" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Quick Translator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Quick translation tool coming soon! For now, we recommend:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline">Google Translate</Badge>
                  <Badge variant="outline">DeepL</Badge>
                  <Badge variant="outline">Linguee</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recommended Learning Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Duolingo</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Free, gamified language learning with daily streaks
                    </p>
                    <Badge className="bg-green-100 text-green-800">Free</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Babbel</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Conversation-focused lessons for practical use
                    </p>
                    <Badge className="bg-blue-100 text-blue-800">Paid</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Busuu</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      AI-powered lessons with speech recognition
                    </p>
                    <Badge className="bg-purple-100 text-purple-800">Freemium</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">HelloTalk</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Practice with native speakers through chat
                    </p>
                    <Badge className="bg-orange-100 text-orange-800">Free</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Local Language Exchange
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">University Language Exchange</h4>
                    <p className="text-sm text-blue-700">
                      Most French universities offer tandem programs where you can practice with native speakers.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900">Conversation Cafés</h4>
                    <p className="text-sm text-green-700">
                      Look for local "café des langues" or conversation groups in your city.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
