import React, { useState } from "react";
import { Globe, Link as LinkIcon, MessageCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FrenchIntegrationModuleCard from "./french-integration/FrenchIntegrationModuleCard";
import {
  modulesMeta, allTopics, usefulLinks, studentFavorites, newsMediaRecommendations, frenchEvents
} from "./french-integration/fiData";

export const FrenchIntegrationPage = () => {
  const [usefulLinksOpen, setUsefulLinksOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Main state: which module is expanded?
  const [expandedModuleKey, setExpandedModuleKey] = useState<string | null>(null);

  // Helper: back to grid
  const handleBack = () => setExpandedModuleKey(null);

  return (
    <div className="min-h-screen w-full bg-white transition-colors">
      <div className="max-w-5xl mx-auto px-2 md:px-7 py-6 md:py-9">
        {/* Title and Action Buttons */}
        <div className="mb-10 flex flex-col items-center w-full">
          <h1 className="flex items-center gap-3 text-[2.15rem] md:text-4xl font-extrabold text-[#322c6a] mb-2 leading-tight justify-center text-center">
            <Globe className="h-7 w-7 text-indigo-600" />
            <span>French Cultural Integration</span>
          </h1>
          <div
            className="text-gray-600 text-base md:text-lg mb-5 md:mb-7 w-full max-w-[420px] text-center whitespace-nowrap overflow-x-auto md:overflow-visible md:whitespace-normal mx-auto"
            style={{ textOverflow: 'ellipsis' }}
          >
            Interactive and practical guide for thriving in France
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center w-full">
            <Button
              variant="outline"
              onClick={() => setUsefulLinksOpen(true)}
              className="font-semibold text-base"
            >
              <LinkIcon className="h-5 w-5 mr-2" />
              Useful Links & Contacts
            </Button>
            <Button
              variant="outline"
              onClick={() => setFeedbackOpen(true)}
              className="font-semibold text-base"
            >
              <MessageCircle className="h-5 w-5 mr-1" />
              Feedback
            </Button>
          </div>
        </div>
        {/* Module Grid or Expanded View */}
        {!expandedModuleKey ? (
          <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mb-12">
            {modulesMeta.map((mod) => (
              <FrenchIntegrationModuleCard
                key={mod.key}
                icon={mod.icon}
                title={mod.title}
                topicCount={mod.topicCount}
                description={mod.description}
                onClick={() => setExpandedModuleKey(mod.key)}
              />
            ))}
          </div>
        ) : (
          <div className="mb-10 animate-fade-in">
            <Button variant="ghost" size="sm" className="mb-3 flex items-center" onClick={handleBack}>
              <span className="mr-2">
                <span className="inline-block rotate-180"><ArrowRight className="h-4 w-4" /></span>
              </span>
              Back to Modules
            </Button>
            <Card className="mb-4">
              <div className="rounded-t-2xl bg-gradient-to-br from-[#e3f0fe] to-[#f6faff] px-7 pt-8 pb-6 border-b border-[#e6ecf4]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl text-gray-700">
                    {
                      (() => {
                        const Icon = modulesMeta.find(m => m.key === expandedModuleKey)?.icon;
                        // Only render Icon if defined, with Lucide props
                        return Icon ? <Icon className="h-8 w-8 text-gray-700" size={32} /> : null;
                      })()
                    }
                  </span>
                  <span className="font-bold text-xl text-gray-800">{modulesMeta.find(m => m.key === expandedModuleKey)?.title}</span>
                  <span className="ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full border">
                    {modulesMeta.find(m => m.key === expandedModuleKey)?.topicCount} topics
                  </span>
                </div>
                <div className="text-gray-600">
                  {modulesMeta.find(m => m.key === expandedModuleKey)?.description}
                </div>
              </div>
              <CardContent className="pt-7 pb-6 px-7">
                <ol className="space-y-4 mt-1">
                  {(allTopics[expandedModuleKey] || []).map((topic, idx) => (
                    <li key={topic.title} className="border-l-4 pl-4 border-gray-200">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-gray-700">{idx + 1}.</span>
                        <span className="font-semibold text-gray-800">{topic.title}</span>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2 text-gray-800 text-sm">
                        {topic.content}
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Useful Links Dialog */}
        <Dialog open={usefulLinksOpen} onOpenChange={setUsefulLinksOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                <LinkIcon className="mr-2 h-6 w-6 text-indigo-600" />
                Useful Links & Contacts
              </DialogTitle>
            </DialogHeader>
            <ul className="space-y-3 mt-4">
              {usefulLinks.map(l =>
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noopener" className="text-blue-600 hover:underline flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    {l.label}
                  </a>
                </li>
              )}
            </ul>
          </DialogContent>
        </Dialog>
        {/* Feedback Dialog */}
        <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                <MessageCircle className="mr-2 h-6 w-6 text-green-600" />
                Suggest a Topic or Send Feedback
              </DialogTitle>
            </DialogHeader>
            {!feedbackSent ? (
              <div>
                <div className="mb-3 text-gray-700">
                  Which French habit/culture surprised you most? What topic or resource would help you thrive? We value your input!
                </div>
                <Input
                  placeholder="Share your feedback or suggestions here"
                  value={feedbackText}
                  maxLength={200}
                  onChange={e => setFeedbackText(e.target.value)}
                />
                <Button onClick={() => {
                  setFeedbackSent(true);
                  setFeedbackText("");
                  setTimeout(() => {
                    setFeedbackOpen(false);
                    setFeedbackSent(false);
                  }, 1800);
                }} className="mt-4 w-full">
                  Submit Feedback
                </Button>
              </div>
            ) : (
              <div className="py-6 text-center text-green-600 font-medium">
                Thank you for your feedback! 🌟
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
