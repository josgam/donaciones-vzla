import Link from 'next/link';
import { MapPin, Users, Heart } from 'lucide-react';

export default function ProjectCard({ project, onDonateClick }) {
  const percent = Math.min(100, Math.round((project.current_amount / project.target_amount) * 100));

  return (
    <div className="bg-[#181A20] rounded-2xl border border-[#2B313A] overflow-hidden hover:border-[#F0B90B]/50 transition-all duration-300 flex flex-col group shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-[#2B313A]">
        <img 
          src={project.image_url} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md ${
            project.category === 'emprendimiento' 
              ? 'bg-amber-500 text-black' 
              : 'bg-emerald-500 text-black'
          }`}>
            {project.category === 'emprendimiento' ? '🚀 Emprendimiento' : '🤝 Causa Social'}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#F0B90B]" />
            <span>{project.creator_location}</span>
          </div>

          <h3 className="font-bold text-base text-white mb-2 line-clamp-2 group-hover:text-[#F0B90B] transition">
            {project.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          {/* Progreso */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-white">${project.current_amount} USDT</span>
              <span className="text-gray-400">Meta: ${project.target_amount} USDT</span>
            </div>
            <div className="w-full bg-[#0B0E11] h-2.5 rounded-full overflow-hidden border border-[#2B313A]">
              <div 
                className="bg-gradient-to-r from-[#F0B90B] to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-1.5 text-[11px] text-gray-400">
              <span className="text-[#F0B90B] font-bold">{percent}% completado</span>
              <span>Por {project.creator_name}</span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onDonateClick(project)}
              className="flex-1 bg-[#F0B90B] hover:bg-[#FCD535] text-black font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-[#F0B90B]/10 active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-black" />
              <span>Apoyar</span>
            </button>
            <Link
              href={`/proyectos/${project.id}`}
              className="px-3 bg-[#2B313A] hover:bg-[#383f4a] text-gray-200 py-2.5 rounded-xl text-xs font-semibold transition"
            >
              Ver Detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
