import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}

const education: EducationItem[] = [
  {
    id: '1',
    degree: 'Master en Génie Logiciel et Base de données',
    institution: 'École Nationale d\'Informatique',
    period: '2018 - 2021',
    location: 'Tanambao, Fianarantsoa, Madagascar',
  },
  {
    id: '2',
    degree: 'Licence en Génie Logiciel et Base de données',
    institution: 'École Nationale d\'Informatique',
    period: '2015 - 2018',
    location: 'Tanambao, Fianarantsoa, Madagascar',
  },
  {
    id: '3',
    degree: 'Baccalauréat série C (scientifique)',
    institution: 'Collège Saint François Xavier',
    period: '2014 - 2015',
    location: 'Ambatomena, Fianarantsoa, Madagascar',
  },
];

export function Education() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl text-slate-800">Formation</h2>
      </div>
      
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="relative border-l-4 border-gradient-to-b from-blue-600 to-indigo-600 pl-6 group">
            <div className="absolute -left-[13px] top-0 w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full border-4 border-white shadow-md group-hover:scale-125 transition-transform"></div>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-lg text-slate-800 mb-1">{edu.degree}</h3>
                  <p className="text-blue-700">{edu.institution}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{edu.period}</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {edu.location}
              </p>
              {edu.details && (
                <p className="text-sm text-slate-700 mt-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">{edu.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}