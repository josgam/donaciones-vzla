'use client';
import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import DonationModal from '@/components/DonationModal';
import { initialProjects } from '@/lib/mockData';
import { Heart, Sparkles } from 'lucide-react';

export default function ProyectosIndexPage() {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-[#F0B90B]/10 border border-[#F0B90B]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F0B90B] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Metas Oficiales Verificadas</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Todas las Metas y Proyectos</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Apoya directamente a emprendedores y causas en Venezuela mediante Binance Pay (ID: 37999878).
        </p>
      </div>

      {/* Filtro de Categorías */}
      <div className="flex bg-[#181A20] p-1 rounded-xl border border-[#2B313A] w-fit mb-8">
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

      <DonationModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDonationComplete={handleDonationComplete}
      />
    </div>
  );
}
