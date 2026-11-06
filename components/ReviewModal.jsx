'use client';
import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, onAddReview }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('donante');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment) {
      alert('Por favor ingresa tu nombre y tu experiencia.');
      return;
    }
    
    onAddReview({
      id: `r_${Date.now()}`,
      user_name: name,
      user_role: role,
      location: location || 'Venezuela',
      rating,
      comment,
      created_at: 'Hace un momento'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#181A20] text-white rounded-2xl w-full max-w-md p-6 border border-[#2B313A] shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
        <div className="flex items-center gap-2 text-[#F0B90B] mb-2 font-semibold text-xs">
          <MessageSquare className="w-4 h-4" />
          <span>EXPERIENCIAS DE LA COMUNIDAD</span>
        </div>
        <h3 className="text-xl font-bold mb-1">Deja tu Opinión</h3>
        <p className="text-xs text-gray-400 mb-4">Tu testimonio genera la confianza que otros venezolanos necesitan para apoyarse.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-300 block mb-1 font-semibold">Calificación General:</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition hover:scale-110 p-1"
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'fill-[#F0B90B] text-[#F0B90B]' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1 font-semibold">¿Cuál fue tu rol?:</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRole('donante')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  role === 'donante' ? 'bg-[#F0B90B] text-black border-[#F0B90B]' : 'bg-[#0B0E11] text-gray-300 border-[#2B313A]'
                }`}
              >
                ❤️ Donante
              </button>
              <button
                type="button"
                onClick={() => setRole('creador')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  role === 'creador' ? 'bg-[#F0B90B] text-black border-[#F0B90B]' : 'bg-[#0B0E11] text-gray-300 border-[#2B313A]'
                }`}
              >
                🚀 Creador de Meta
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1 font-semibold">Tu Nombre o Alias:</label>
            <input
              type="text"
              required
              placeholder="Ej: Daniel Morales"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1 font-semibold">Tu Ciudad o País:</label>
            <input
              type="text"
              placeholder="Ej: Valencia / Bogotá, Colombia"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1 font-semibold">Tu Experiencia:</label>
            <textarea
              required
              rows={3}
              placeholder="Cuéntanos cómo fue tu experiencia usando Binance Pay para enviar o recibir fondos..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold py-3 rounded-xl transition text-xs shadow-lg shadow-[#F0B90B]/20"
          >
            Publicar Opinión
          </button>
        </form>
      </div>
    </div>
  );
}
