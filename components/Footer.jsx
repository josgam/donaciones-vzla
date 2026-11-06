import { Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#181A20] border-t border-[#2B313A] py-10 mt-16 text-gray-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-base text-white">Impulso<span className="text-[#F0B90B]">Vzla</span></span>
            <span className="bg-[#F0B90B]/10 text-[#F0B90B] px-2 py-0.5 rounded text-[10px] font-bold">Binance Pay</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Plataforma comunitaria de financiamiento para apoyar el emprendimiento y las causas solidarias en Venezuela de forma transparente y sin barreras bancarias.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Transparencia y Comisiones</h4>
          <p className="leading-relaxed">
            Todas las recaudaciones se canalizan de forma segura mediante Binance Pay. La plataforma retiene una comisión única de servicio del <strong className="text-white">5%</strong> para costos operativos, garantizando que el <strong className="text-green-400">95% neto</strong> llegue directamente a las manos del creador.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Canal Oficial Binance Pay</h4>
          <div className="bg-[#0B0E11] p-3 rounded-xl border border-[#2B313A]">
            <span className="text-gray-400 block text-[11px]">ID Oficial de Recaudación:</span>
            <span className="text-[#F0B90B] font-mono text-base font-bold">37999878</span>
          </div>
          <p className="mt-3 text-[11px] text-gray-500">Hecho con ❤️ para la comunidad venezolana dentro y fuera del país.</p>
        </div>
      </div>
    </footer>
  );
}
