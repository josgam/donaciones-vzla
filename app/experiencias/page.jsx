'use client';
import { useState } from 'react';
import { initialReviews } from '@/lib/mockData';
import ReviewModal from '@/components/ReviewModal';
import { Star, MessageSquarePlus, ShieldCheck, Heart } from 'lucide-react';

export default function ExperienciasPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [filterRole, setFilterRole] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = filterRole === 'todos'
    ? reviews
    : reviews.filter(r => r.user_role === filterRole);

  const handleAddReview = (newRev) => {
    setReviews([newRev, ...reviews]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 bg-[#F0B90B]/10 text-[#F0B90B] px-3 py-1 rounded-full text-xs font-bold mb-3">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>4.9 / 5 estrellas · Comunidad Confiable</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Experiencias y Calificaciones</h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mb-6">
          Conoce lo que dicen las personas que han recibido apoyo y los donantes que aportan a proyectos venezolanos.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition shadow-lg shadow-[#F0B90B]/20 active:scale-95"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Dejar mi Calificación</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="flex justify-center gap-2 mb-8">
        {[
          { id: 'todos', label: 'Todos' },
          { id: 'creador', label: '🚀 Creadores de Metas' },
          { id: 'donante', label: '❤️ Donantes' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterRole(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
              filterRole === tab.id
                ? 'bg-[#F0B90B] text-black border-[#F0B90B]'
                : 'bg-[#181A20] text-gray-300 border-[#2B313A] hover:border-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid de Reseñas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((rev) => (
          <div key={rev.id} className="bg-[#181A20] p-6 rounded-2xl border border-[#2B313A] flex flex-col justify-between shadow-md">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-sm text-white">{rev.user_name}</h3>
                  <span className="text-[11px] text-gray-400">{rev.location}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  rev.user_role === 'creador' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {rev.user_role === 'creador' ? '🚀 Creador de Meta' : '❤️ Donante'}
                </span>
              </div>

              <div className="flex gap-1 text-[#F0B90B] mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-xs text-gray-300 italic leading-relaxed mb-4">"{rev.comment}"</p>
            </div>

            <div className="text-[10px] text-gray-500 border-t border-[#2B313A]/60 pt-2 flex justify-between">
              <span>Publicado {rev.created_at}</span>
              <span className="text-green-400 font-semibold">✓ Verificado</span>
            </div>
          </div>
        ))}
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </div>
  );
}
