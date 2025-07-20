
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";

interface SuggestionsPageProps {
  onBack: () => void;
}

export function SuggestionsPage({ onBack }: SuggestionsPageProps) {
  return (
    <div className="max-w-3xl mx-auto py-6 px-2 bg-background min-h-screen">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-6 flex items-center text-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Checklist
      </Button>
      <PageTitle>
        💡 Suggestions & Upcoming Features
      </PageTitle>
      <div className="space-y-4">
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">1. FAQ Page</h2>
            <p className="text-muted-foreground">A frequently asked questions page to address common concerns or questions about studying in France.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">2. Events Calendar</h2>
            <p className="text-muted-foreground">A page listing upcoming webinars, workshops, or community events relevant to new students.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">3. Resource Library</h2>
            <p className="text-muted-foreground">A repository of guides and downloadable resources (like document checklists, budgeting templates, or visa guides).</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">4. Forum/Community Board</h2>
            <p className="text-muted-foreground">Let users discuss topics, share tips, or seek advice from peers.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">5. Scholarships & Grants</h2>
            <p className="text-muted-foreground">List available scholarships, grants, or financial aid opportunities for international students.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">6. Job/Internship Board</h2>
            <p className="text-muted-foreground">Display opportunities for part-time jobs, internships, or volunteering in France.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">7. Success Stories</h2>
            <p className="text-muted-foreground">Showcase alumni journeys and testimonials to inspire new students.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">8. Emergency Help</h2>
            <p className="text-muted-foreground">Important contacts and steps in case of emergencies (embassy info, medical help, etc.).</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">9. Cultural Tips</h2>
            <p className="text-muted-foreground">Information and videos about adapting to French culture, etiquette, or language quirks.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">10. Settings/Personalization</h2>
            <p className="text-muted-foreground">Let users set notification preferences, customize their dashboard, or edit their profile.</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-2 text-card-foreground">11. Workshops & Webinars with Professors</h2>
            <p className="text-muted-foreground">
              Facilitate planning and participation in workshops or webinars with professors to help students understand academic and research opportunities.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 text-center text-xs text-muted-foreground">More suggestions? Share your ideas!</div>
    </div>
  );
}
