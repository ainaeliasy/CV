import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Calendar, Briefcase, GraduationCap, Award, Languages } from 'lucide-react';
import { PersonalInfo } from './components/PersonalInfo';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Languages as LanguagesSection } from './components/Languages';
import { DownloadPDFButton } from './components/DownloadPDFButton';

export default function App() {
  return (
    <>
      <DownloadPDFButton />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
          {/* En-tête avec informations personnelles */}
          <PersonalInfo />

          <div className="grid md:grid-cols-3 gap-10 p-10">
            {/* Colonne de gauche */}
            <div className="md:col-span-1 space-y-8">
              <Skills />
              <LanguagesSection />
            </div>

            {/* Colonne de droite */}
            <div className="md:col-span-2 space-y-10">
              <Experience />
              <Education />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
