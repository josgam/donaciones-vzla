'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function CrearMetaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: 'emprendimiento',
    target_amount: '',
    creator_name: '',
    creator_location: '',
    creator_binance_pay_id: '',
    description: '',
    image_url: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.target_amount || !formData.creator_binance_pay_id) {
      alert('Por favor completa los campos requeridos.');
      return;
    }

    alert('¡Meta creada exitosamente! Podrás compartir el enlace directo con tu comunidad.');
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-[#181A20] p-6 sm:p-8 rounded-3xl border border-[#2B313A] shadow-2xl">
        <div className="inline-flex items-center gap-1.5 bg-[#F0B90B]/10 text-[#F0B90B] px-3 py-1 rounded-full text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fácil · Rápido · 95% para tu proyecto</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Crear mi Meta o Proyecto</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-6">
          Publica tu emprendimiento o causa comunitaria y recibe aportes en USDT directamente por Binance Pay.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Título de tu meta (*):</label>
            <input
              type="text"
              required
              placeholder="Ej: Batidora industrial para repostería casera"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Categoría (*):</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F0B90B]"
              >
                <option value="emprendimiento">🚀 Emprendimiento / Meta Personal</option>
                <option value="causa_social">🤝 Causa Social / Comunitaria</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Monto de la Meta en USDT (*):</label>
              <input
                type="number"
                required
                placeholder="Ej: 150"
                value={formData.target_amount}
                onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F0B90B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Tu Nombre o Nombre de Fundación (*):</label>
              <input
                type="text"
                required
                placeholder="Ej: Elena Méndez"
                value={formData.creator_name}
                onChange={(e) => setFormData({ ...formData, creator_name: e.target.value })}
                className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F0B90B]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Ciudad y Estado (*):</label>
              <input
                type="text"
                required
                placeholder="Ej: Barquisimeto, Lara"
                value={formData.creator_location}
                onChange={(e) => setFormData({ ...formData, creator_location: e.target.value })}
                className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F0B90B]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Tu Binance Pay ID personal para recibir tus fondos (*):
            </label>
            <input
              type="text"
              required
              placeholder="Ej: 54910284"
              value={formData.creator_binance_pay_id}
              onChange={(e) => setFormData({ ...formData, creator_binance_pay_id: e.target.value })}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#F0B90B]"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">
              Aquí te transferiremos el 95% de todo lo recaudado de tu meta sin complicaciones.
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">URL de una foto de tu proyecto (opcional):</label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Cuéntanos tu historia y para qué usarás los fondos (*):</label>
            <textarea
              required
              rows={4}
              placeholder="Explica de forma clara y honesta cuál es tu meta, cómo impactará tu vida o la de tu comunidad..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <div className="bg-[#0B0E11] p-4 rounded-2xl border border-[#2B313A] text-xs text-gray-400 space-y-1">
            <span className="font-bold text-white block mb-1">Transparencia de la plataforma:</span>
            <p>• La plataforma cobra una comisión única del 5% al momento del retiro para costos operativos.</p>
            <p>• Recibirás el 95% íntegro directo en tu Binance Pay ID indicado arriba.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold py-3.5 rounded-xl transition shadow-xl shadow-[#F0B90B]/20 text-sm"
          >
            Publicar Meta Ahora
          </button>
        </form>
      </div>
    </div>
  );
}
