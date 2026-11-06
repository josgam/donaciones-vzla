'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { initialProjects } from '@/lib/mockData';
import DonationModal from '@/components/DonationModal';
import { MapPin, Heart, Share2, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = projects.find(p => p.id === params.id) || projects[0];
  const percent = Math.min(100, Math.round((project.current_amount / project.target_amount) * 100));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `¡Apoya esta meta venezolana en ImpulsoVzla!: ${project.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles para compartir en WhatsApp o Instagram.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Volver a todas las metas</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contenido Principal */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-3xl overflow-hidden border border-[#2B313A] max-h-96 bg-[#2B313A]">
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
              project.category === 'emprendimiento' ? 'bg-amber-500 text-black' : 'bg-emerald-500 text-black'
            }`}>
              {project.category === 'emprendimiento' ? '🚀 Emprendimiento' : '🤝 Causa Social'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-[#F0B90B]" />
              <span>{project.creator_location} · Creado por <strong className="text-gray-200">{project.creator_name}</strong></span>
            </div>
          </div>

          <div className="bg-[#181A20] p-6 rounded-2xl border border-[#2B313A]">
            <h2 className="text-sm font-bold text-white mb-3">Historia y Propósito</h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>

        {/* Barra Lateral de Donación */}
        <div className="space-y-4">
          <div className="bg-[#181A20] p-6 rounded-3xl border border-[#2B313A] shadow-xl sticky top-24">
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-2xl font-black text-white">${project.current_amount}</span>
                <span className="text-xs text-gray-400">Meta: ${project.target_amount} USDT</span>
              </div>
              <div className="w-full bg-[#0B0E11] h-3 rounded-full overflow-hidden border border-[#2B313A]">
                <div 
                  className="bg-gradient-to-r from-[#F0B90B] to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span className="text-[#F0B90B] font-bold">{percent}% Recaudado</span>
                <span>{project.days_left || 10} días restantes</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F0B90B]/20 mb-3 active:scale-95"
            >
              <Heart className="w-4 h-4 fill-black" />
              <span>Donar con Binance Pay</span>
            </button>

            <button
              onClick={handleShare}
              className="w-full bg-[#2B313A] hover:bg-[#383f4a] text-gray-200 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir en WhatsApp</span>
            </button>

            <div className="mt-4 pt-4 border-t border-[#2B313A] text-[11px] text-gray-400 space-y-1">
              <span className="text-green-400 font-bold block">✓ Pago Seguro 0% comisión de red</span>
              <span>Canalizado al Pay ID oficial: <strong className="text-white">37999878</strong></span>
            </div>
          </div>
        </div>
      </div>

      <DonationModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDonationComplete={(id, amt) => {
          setProjects(prev => prev.map(p => p.id === id ? { ...p, current_amount: p.current_amount + amt } : p));
        }}
      />
    </div>
  );
}
