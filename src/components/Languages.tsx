import React from 'react';
import { Languages as LanguagesIcon } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  level: string;
  proficiency: number;
}

const languages: Language[] = [
  {
    id: '1',
    name: 'Malgache',
    level: 'Maternelle',
    proficiency: 100,
  },
  {
    id: '2',
    name: 'Français',
    level: 'Courant',
    proficiency: 95,
  },
  {
    id: '3',
    name: 'Anglais',
    level: 'Professionnel',
    proficiency: 85,
  },
];

export function Languages() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
          <LanguagesIcon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl text-slate-800">Langues</h2>
      </div>
      
      <div className="space-y-5 bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-xl border border-slate-200">
        {languages.map((lang) => (
          <div key={lang.id}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-800">{lang.name}</span>
              <span className="text-sm text-blue-700 bg-white px-3 py-1 rounded-lg border border-blue-200">{lang.level}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${lang.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}