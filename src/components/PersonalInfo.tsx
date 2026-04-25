import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export function PersonalInfo() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white p-10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl"></div>
      
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl flex-shrink-0">
          <img
            src="/profile-photo.jpg"
            alt="Emmanuëlson Eliasy Rakotomalalaniaina"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl mb-3 tracking-tight">Emmanuëlson Eliasy Rakotomalalaniaina</h1>
          <p className="text-xl text-blue-200 mb-6">Ingénieur Logiciel Full-Stack & Data | Laravel • Vue.js • Python (ML & Web Scraping)</p>
          
          <div className="flex flex-wrap gap-5 justify-center md:justify-start text-sm">
            <a href="mailto:ainaeliasy1227@gmail.com" className="flex items-center gap-2 hover:text-blue-200 transition-colors bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Mail className="w-4 h-4" />
              <span>ainaeliasy1227@gmail.com</span>
            </a>
            <a href="tel:+261342200446" className="flex items-center gap-2 hover:text-blue-200 transition-colors bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Phone className="w-4 h-4" />
              <span>+261 34 22 00 446</span>
            </a>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <MapPin className="w-4 h-4" />
              <span>Fianarantsoa, Madagascar</span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center md:justify-start mt-5">
            <a href="https://www.linkedin.com/in/aina-rakotomalala-69070117a" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/ainaeliasy" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="relative mt-8 pt-8 border-t border-white/20">
        <h3 className="text-lg mb-3 text-blue-200">À Propos</h3>
        <p className="text-slate-100 leading-relaxed">
          Ingénieur Logiciel passionné avec une double expertise : le développement Web Full-Stack (Laravel, Vue.js, écosystème TALL) 
          et la Data/Intelligence Artificielle (Python, Web Scraping à grande échelle, Machine Learning). J'ai conçu et mené à 
          bien des projets allant d'applications SaaS et e-commerce jusqu'à des infrastructures d'extraction de données complexes 
          et résilientes. Autonome et rigoureux, je m'épanouis dans la conception d'architectures robustes (RabbitMQ, Cloud) 
          pour des clients internationaux.
        </p>
      </div>
    </div>
  );
}