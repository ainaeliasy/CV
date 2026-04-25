import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: '0',
    title: 'Machine Learning Engineer & Spécialiste Web Scraping',
    company: 'New Energy',
    period: 'Jan 2024 - Présent',
    location: 'Remote',
    description: [
      'Conception et entraînement de modèles de Machine Learning pour le traitement et l\'analyse automatisée de données',
      'Développement de pipelines complexes d\'extraction de données à grande échelle (Web Scraping)',
      'Implémentation d\'architectures backend distribuées orientées messages et création d\'API résilientes',
    ],
  },
  {
    id: '1',
    title: 'Développeur Laravel Freelance',
    company: 'Geekworkers Mada',
    period: 'Oct 2023 - Présent',
    location: 'Antananarivo / Epalinges, Suisse',
    description: [
      'Optimisation des performances de l\'architecture Laravel, améliorant significativement les temps de chargement et l\'efficacité de la base de données',
      'Intégration de plusieurs services d\'IA pour automatiser les workflows métier et améliorer l\'expérience utilisateur',
      'Conception et maintenance de modules SaaS avec facturation Stripe et capacités multi-tenant',
      'Mise en place de pipelines de tests automatisés (unitaires, fonctionnels et d\'intégration)',
      'Construction de pipelines CI/CD pour des mises à jour fluides et une réduction des risques de déploiement',
      'Stack technique: Laravel 8+, PHP 8, MySQL, API REST, Vue.js, Docker, GitHub Actions, Stripe API, intégrations IA',
    ],
  },
  {
    id: '2',
    title: 'Consultant Laravel TALL à temps partiel (Consultant CTO)',
    company: 'Happy Technologies - Mindstream',
    period: 'Oct 2022 - Jan 2024',
    location: 'Paris, France',
    description: [
      'Direction du redéveloppement d\'Urbidesk – marketplace d\'espaces de travail collaboratifs',
      'Développement de Neolife – plateforme immobilière dédiée aux solutions de logement pour seniors',
      'Refonte complète de l\'architecture Laravel + TALL stack pour assurer l\'évolutivité et la maintenabilité',
      'Direction technique et gestion de projet alignée avec les objectifs business',
      'Contribution aux projets de machine learning : pipelines de labellisation de données et entraînement de modèles',
      'Stack technique: Laravel 9+, TALL stack (Tailwind CSS, Alpine.js, Livewire), MySQL, API REST, Python (ML), AWS',
    ],
  },
  {
    id: '3',
    title: 'Développeur Symfony/Vue.js',
    company: 'Manao Logiciels (CDR Group France)',
    period: 'Avr 2022 - Oct 2023',
    location: 'Fianarantsoa, Madagascar',
    description: [
      'Développement de nouvelles fonctionnalités pour Repair Soft v2, plateforme SaaS de gestion des réparations de véhicules pour compagnies d\'assurance',
      'Travail en environnement Agile/Scrum avec gestion des user stories et tickets techniques',
      'Participation aux stand-ups quotidiens et revues d\'équipe avec le client français',
      'Gestion de l\'intégration avec des API tierces pour les certifications système',
      'Certification en Intelligence Artificielle et Machine Learning (FMFP Madagascar)',
      'Stack technique: Symfony 5+, Vue.js 3, API REST, PostgreSQL, Git, Agile (Scrum)',
    ],
  },
  {
    id: '4',
    title: 'Développeur PHP',
    company: 'Manao Logiciels',
    period: 'Mar 2021 - Août 2021',
    location: 'Fianarantsoa, Madagascar',
    description: [
      'Développement de solutions logicielles RH et paie : Paie Madagascar, Intermittents Madagascar, Présences Madagascar, Paie France',
      'Participation à toutes les étapes du cycle de développement, de la spécification au déploiement',
      'Support technique et résolution de problèmes critiques en production',
      'Supervision et mentorat de deux stagiaires juniors embauchés par l\'entreprise',
      'Stack technique: PHP, MySQL, jQuery, Bootstrap, Git',
    ],
  },
  {
    id: '5',
    title: 'Développeur Logiciel & Concepteur de Systèmes (Freelance)',
    company: 'Aika Echographie - Gare FCE',
    period: 'Mar 2020 - Août 2020',
    location: 'Fianarantsoa, Madagascar',
    description: [
      'Refonte et développement d\'un système d\'information médical pour une clinique d\'échographie privée',
      'Développement de la gestion des patients, planification des rendez-vous et suivi des examens',
      'Livraison d\'une application sécurisée et conviviale pour digitaliser les processus cliniques',
      'Stack technique: PHP, MySQL, HTML/CSS, JavaScript, Bootstrap',
    ],
  },
  {
    id: '6',
    title: 'Développeur Logiciel & Concepteur de Systèmes',
    company: 'Église Luthérienne Masombahoaka',
    period: 'Août 2019 - Fév 2020',
    location: 'Fianarantsoa, Madagascar',
    description: [
      'Conception et développement d\'un logiciel de gestion budgétaire et comptable pour l\'équipe administrative',
      'Création et maintenance du site intranet interne pour centraliser les données de l\'église',
      'Formation post-déploiement et maintenance assurées',
      'Stack technique: PHP, MySQL, HTML/CSS, JavaScript',
    ],
  },
  {
    id: '7',
    title: 'Développeur Logiciel & Concepteur de Systèmes',
    company: 'Centre Informatique Régional Haute Matsiatra',
    period: 'Sep 2017 - Déc 2017',
    location: 'Fianarantsoa, Madagascar',
    description: [
      'Conception et développement d\'une application de planification et gestion budgétaire avec Laravel',
      'Garantie de l\'intégrité des données, performances et utilisabilité pour les utilisateurs finaux',
      'Stack technique: PHP, Laravel, MySQL',
    ],
  },
  {
    id: '8',
    title: 'Développeur Logiciel & Concepteur de Systèmes',
    company: 'PRMP - Ministère de l\'Économie et des Finances',
    period: 'Sep 2016 - Nov 2017',
    location: 'Fianarantsoa, Madagascar',
    description: [
      'Conception et implémentation d\'un logiciel de gestion des marchés publics',
      'Développement d\'un système robuste et sécurisé pour gérer les processus et documentation d\'approvisionnement',
      'Conformité aux réglementations et standards gouvernementaux',
      'Stack technique: PHP, CodeIgniter, MySQL',
    ],
  },
];

export function Experience() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl text-slate-800">Expérience Professionnelle</h2>
      </div>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative border-l-4 border-gradient-to-b from-blue-600 to-indigo-600 pl-6 pb-8 last:pb-0 group">
            <div className="absolute -left-[13px] top-0 w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full border-4 border-white shadow-md group-hover:scale-125 transition-transform"></div>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-xl text-slate-800 mb-1">{exp.title}</h3>
                  <p className="text-blue-700">{exp.company}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{exp.period}</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {exp.location}
              </p>
              <ul className="space-y-2">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="text-slate-700 text-sm flex gap-3">
                    <span className="text-blue-600 mt-1 flex-shrink-0">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}