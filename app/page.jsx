'use client';
import { useState } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import DonationModal from '@/components/DonationModal';
import { initialProjects, initialReviews } from '@/lib/mockData';
import { Sparkles, Heart, Star, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const [projects, setProjects] = useState(initialProjects);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = activeCategory === 'todos'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleOpenDonate = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDonationComplete = (projectId, amount) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, current_amount: p.current_amount + amount };
      }
      return p;
    }));
  };

  const totalRaised = projects.reduce((acc, p) => acc + p.current_amount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-10 sm:py-14 border-b border-[#2B313A] relative">
        <div className="inline-flex items-center gap-2 bg-[#F0B90B]/10 border border-[#F0B90B]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F0B90B] mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Binance Pay Oficial ID: 37999878 · 0% Costo de Red</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight mb-4">
          Impulsa metas y causas venezolanas <span className="text-[#F0B90B]">sin fronteras</span>
        </h1>

        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          La plataforma más simple para que venezolanos dentro y fuera del país financien emprendimientos reales y causas sociales con total transparencia.
        </p>

        {/* Métricas destacadas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8 text-center">
          <div className="bg-[#181A20] p-4 rounded-2xl border border-[#2B313A]">
            <span className="text-xl sm:text-2xl font-black text-white">${totalRaised}</span>
            <span className="block text-[11px] text-gray-400 mt-1">USDT Recaudados</span>
          </div>
          <div className="bg-[#181A20] p-4 rounded-2xl border border-[#2B313A]">
            <span className="text-xl sm:text-2xl font-black text-[#F0B90B]">{projects.length}</span>
            <span className="block text-[11px] text-gray-400 mt-1">Metas Activas</span>
          </div>
          <div className="bg-[#181A20] p-4 rounded-2xl border border-[#2B313A]">
            <span className="text-xl sm:text-2xl font-black text-green-400">95%</span>
            <span className="block text-[11px] text-gray-400 mt-1">Va al Creador</span>
          </div>
          <div className="bg-[#181A20] p-4 rounded-2xl border border-[#2B313A]">
            <span className="text-xl sm:text-2xl font-black text-white">⭐ 4.9/5</span>
            <span className="block text-[11px] text-gray-400 mt-1">Satisfacción</span>
          </div>
        </div>
      </section>

      {/* Selector de Categorías */}
      <section className="py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Explora Metas y Proyectos</h2>
            <p className="text-xs text-gray-400">Apoya directamente con tu saldo de Binance en segundos.</p>
          </div>

          <div className="flex bg-[#181A20] p-1 rounded-xl border border-[#2B313A] w-fit">
            <button
              onClick={() => setActiveCategory('todos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeCategory === 'todos' ? 'bg-[#F0B90B] text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Todos ({projects.length})
            </button>
            <button
              onClick={() => setActiveCategory('emprendimiento')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeCategory === 'emprendimiento' ? 'bg-[#F0B90B] text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              🚀 Emprendimientos
            </button>
            <button
              onClick={() => setActiveCategory('causa_social')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeCategory === 'causa_social' ? 'bg-[#F0B90B] text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              🤝 Causas Sociales
            </button>
          </div>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onDonateClick={handleOpenDonate} 
            />
          ))}
        </div>
      </section>

      {/* Vista previa de Testimonios y Experiencias */}
      <section className="py-12 border-t border-[#2B313A] mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#F0B90B] text-xs font-bold mb-1">
              <Star className="w-4 h-4 fill-current" />
              <span>TESTIMONIOS REALES</span>
            </div>
            <h2 className="text-xl font-bold text-white">Lo que dice la comunidad</h2>
          </div>
          <Link
            href="/experiencias"
            className="flex items-center gap-1 text-xs font-bold text-[#F0B90B] hover:underline"
          >
            <span>Ver todas las reseñas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialReviews.slice(0, 2).map((rev) => (
            <div key={rev.id} className="bg-[#181A20] p-5 rounded-2xl border border-[#2B313A]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-sm text-white">{rev.user_name}</h4>
                  <span className="text-[11px] text-gray-400">{rev.location}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  rev.user_role === 'creador' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {rev.user_role === 'creador' ? '🚀 Creador' : '❤️ Donante'}
                </span>
              </div>
              <div className="flex gap-1 text-[#F0B90B] mb-2">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Donación */}
      <DonationModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDonationComplete={handleDonationComplete}
      />
    </div>
  );
}
