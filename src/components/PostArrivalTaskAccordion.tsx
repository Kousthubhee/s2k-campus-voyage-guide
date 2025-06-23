
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ReminderButton } from "@/components/ReminderButton";
import { Info } from "lucide-react";

interface Step {
  id: string;
  description: string;
}
interface Task {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  timeline: string;
  priority: "urgent" | "high";
  steps: Step[];
  documents: string[];
  faqs: { q: string; a: string }[];
  links: { label: string; url: string }[];
  glossary?: { term: string; explanation: string }[];
}

interface Props {
  tasks: Task[];
  completedSteps: string[];
  setCompletedSteps: (steps: string[]) => void;
  reminders: { [id: string]: string };
  setReminders: (obj: { [id: string]: string }) => void;
}

const GlossaryPopover = ({
  term,
  explanation,
}: {
  term: string;
  explanation: string;
}) => (
  <span className="relative group cursor-help underline decoration-dotted">
    {term}
    <span className="hidden group-hover:block absolute z-10 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg text-xs text-gray-900 px-3 py-1 rounded whitespace-pre w-60 mt-2">
      {explanation}
    </span>
  </span>
);

export const PostArrivalTaskAccordion = ({
  tasks,
  completedSteps,
  setCompletedSteps,
  reminders,
  setReminders,
}: Props) => {
  const handleStep = (taskId: string) => {
    if (!completedSteps.includes(taskId)) {
      setCompletedSteps([...completedSteps, taskId]);
    }
  };
  const getStatus = (taskId: string) => {
    return completedSteps.includes(taskId) ? "Completed" : "Not started";
  };

  return (
    <Accordion type="multiple" className="w-full">
      {tasks.map((task) => (
        <AccordionItem key={task.id} value={task.id}>
          <AccordionTrigger>
            <div className="flex items-center">
              <span className="mr-3 text-xl">{task.icon}</span>
              <span className="font-semibold mr-2">{task.title}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ml-2 ${
                  task.priority === "urgent"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {task.priority.toUpperCase()}
              </span>
              <span
                className={`ml-2 text-xs px-2 rounded-full ${
                  getStatus(task.id) === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {getStatus(task.id)}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between flex-wrap gap-2 mb-2">
                <span className="text-xs text-gray-600 font-medium">
                  Timeline: <span className="font-bold">{task.timeline}</span>
                </span>
                <ReminderButton
                  date={reminders[task.id]}
                  onSet={(dt) => setReminders({ ...reminders, [task.id]: dt })}
                />
                {getStatus(task.id) !== "Completed" && (
                  <Button
                    size="sm"
                    onClick={() => handleStep(task.id)}
                    className="ml-auto"
                  >
                    Mark Complete
                  </Button>
                )}
                {getStatus(task.id) === "Completed" && (
                  <span className="text-green-600 text-sm font-medium ml-auto">
                    Completed
                  </span>
                )}
              </div>
              <div className="mt-2 mb-4">
                <span className="font-semibold">Description: </span>
                <span>{task.description}</span>
              </div>
              {/* Mini-steps */}
              <div className="mb-3">
                <span className="font-semibold block mb-1">
                  Step-by-step guide:
                </span>
                <ol className="list-decimal ml-5 text-sm space-y-1">
                  {task.steps.map((s, i) => (
                    <li key={s.id}>
                      <span>
                        {s.description}
                        {task.glossary &&
                          task.glossary.find((t) =>
                            s.description.includes(t.term)
                          ) &&
                          task.glossary
                            .filter((t) => s.description.includes(t.term))
                            .map((t) => (
                              <span key={t.term} className="ml-1">
                                <GlossaryPopover
                                  term={t.term}
                                  explanation={t.explanation}
                                />
                              </span>
                            ))}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* Required docs */}
              <div className="mb-3">
                <span className="font-semibold block mb-1">
                  Documents needed:
                </span>
                <ul className="list-disc ml-5 text-xs mb-1">
                  {task.documents.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>
              {/* Links */}
              <div className="mb-3">
                <span className="font-semibold block mb-1">Helpful links:</span>
                <ul className="ml-3">
                  {task.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline flex items-center"
                      >
                        <Info className="h-4 w-4 mr-1 inline" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* FAQ */}
              {task.faqs.length > 0 && (
                <div className="mt-3">
                  <Accordion type="single" className="w-full">
                    {task.faqs.map((faq, i) => (
                      <AccordionItem
                        key={faq.q}
                        value={"faq" + task.id + i.toString()}
                      >
                        <AccordionTrigger className="!text-xs font-semibold">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
