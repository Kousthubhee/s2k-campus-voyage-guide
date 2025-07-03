
import { useState } from "react";
import { User, Bot } from "lucide-react";

export interface BotPersonaSelectorProps {
  persona: string;
  onChangePersona: (val: string) => void;
}

const personas = [
  { key: "student", name: "Student Bot 🤖", desc: "Casual, friendly & peer-like" },
  { key: "advisor", name: "Official Advisor 🎓", desc: "Authoritative, university staff style" },
  { key: "mentor", name: "Mentor 🧑‍🏫", desc: "Supportive, experienced alumni style" },
];

export function BotPersonaSelector({ persona, onChangePersona }: BotPersonaSelectorProps) {
  return (
    <div className="flex gap-2 items-center mb-3">
      <span className="text-sm font-medium mr-2">Bot Style:</span>
      {personas.map((p) => (
        <button
          key={p.key}
          className={`px-3 py-1 rounded text-xs border ${persona === p.key ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
          onClick={() => onChangePersona(p.key)}
          title={p.desc}
          type="button"
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
