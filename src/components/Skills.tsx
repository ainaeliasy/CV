import React from 'react';
import { Award } from 'lucide-react';

interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: '1',
    category: 'Backend & Frameworks',
    skills: ['Laravel', 'Symfony', 'PHP', 'Node.js', 'CodeIgniter'],
  },
  {
    id: '2',
    category: 'Frontend',
    skills: ['Vue.js', 'React', 'Livewire', 'Alpine.js', 'Tailwind CSS', 'jQuery', 'Bootstrap'],
  },
  {
    id: '3',
    category: 'Bases de données & Stockage',
    skills: ['MySQL', 'PostgreSQL', 'AWS S3', 'BunnyCDN'],
  },
  {
    id: '4',
    category: 'DevOps & Outils',
    skills: ['Docker', 'Git', 'GitHub', 'GitLab', 'CI/CD', 'GitHub Actions'],
  },
  {
    id: '5',
    category: 'Gestion de projet',
    skills: ['AGILE', 'Scrum', 'Jira', 'Notion', 'UML'],
  },
  {
    id: '6',
    category: 'IA & Outils Modernes',
    skills: ['Claude AI', 'GitHub Copilot', 'Cursor IDE', 'Antigravity', 'Intégration IA', 'Python (ML)'],
  },
  {
    id: '7',
    category: 'Low Code / No Code',
    skills: ['Bubble', 'FlutterFlow', 'Webflow', 'Firebase Studio', 'Nowa'],
  },
  {
    id: '8',
    category: 'Autres',
    skills: ['API REST', 'Stripe API', 'Linux'],
  },
];

export function Skills() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
          <Award className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl text-slate-800">Compétences</h2>
      </div>
      
      <div className="space-y-6">
        {skillCategories.map((category) => (
          <div key={category.id} className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm text-blue-700 mb-3">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-white text-slate-700 px-3 py-1.5 rounded-lg text-sm border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}