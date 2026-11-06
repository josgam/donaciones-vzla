'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { initialProjects } from '@/lib/mockData';
import { 
  User, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  PlusCircle, 
  ShieldCheck, 
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';

export default function PanelUsuarioPage() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">
        Cargando tu panel de control...
      </div>
    );
  }

  // Filtrar o simular metas del creador
  const userProjects = initialProjects.slice(0, 2);
  const totalRaised = userProjects.reduce((acc, p) => acc + p.current_amount, 0);
  const platformFee = totalRaised * 0.05;
  const netAvailable = totalRaised * 0.95;

  const handleWithdrawRequest = () => {
    if (!user.binance_pay_id) {
      alert('Debes tener un Binance Pay ID configurado en tu perfil para retirar.');
      return;
    }
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      alert(`¡Solicitud de retiro enviada! Se transferirán $${netAvailable.toFixed(2)} USDT netos a tu Binance Pay ID (${user.binance_pay_id}) en un plazo máximo de 2 a 4 horas hábiles.`);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Cabecera del Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#181A20] p-6 rounded-3xl border border-[#2B313A]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F0B90B] flex items-center justify-center text-black font-black text-xl shadow-lg shadow-[#F0B90B]/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{user.name}</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                ✓ Verificado
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {user.email} · {user.location} · Rol: <strong className="text-gray-200 capitalize">{user.role}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/crear"
            className="flex items-center gap-1.5 bg-[#F0B90B] hover:bg-[#FCD535] text-black px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-[#F0B90B]/10"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Nueva Meta</span>
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="px-3 py-2 bg-[#2B313A] hover:bg-[#383f4a] text-gray-300 rounded-xl text-xs font-semibold transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Tarjetas de Saldo y Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#181A20] p-5 rounded-2xl border border-[#2B313A]">
          <span className="text-xs text-gray-400 block mb-1">Total Recaudado en Metas:</span>
          <span className="text-2xl font-black text-white">${totalRaised.toFixed(2)} USDT</span>
          <span className="text-[11px] text-gray-500 block mt-1">Acumulado bruto</span>
        </div>

        <div className="bg-[#181A20] p-5 rounded-2xl border border-[#2B313A]">
          <span className="text-xs text-gray-400 block mb-1">Comisión Plataforma (5%):</span>
          <span className="text-2xl font-black text-amber-500">${platformFee.toFixed(2)} USDT</span>
          <span className="text-[11px] text-gray-500 block mt-1">Tarifa de mantenimiento</span>
        </div>

        <div className="bg-gradient-to-br from-[#181A20] to-[#252014] p-5 rounded-2xl border border-[#F0B90B]/40 relative overflow-hidden">
          <span className="text-xs text-[#F0B90B] font-bold block mb-1">Neto Disponible para Retiro (95%):</span>
          <span className="text-2xl font-black text-green-400">${netAvailable.toFixed(2)} USDT</span>
          <button
            onClick={handleWithdrawRequest}
            disabled={withdrawing}
            className="mt-3 w-full bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold py-2 rounded-xl text-xs transition shadow-md shadow-[#F0B90B]/20 active:scale-95 disabled:opacity-50"
          >
            {withdrawing ? 'Procesando...' : 'Solicitar Retiro a Binance Pay'}
          </button>
        </div>
      </div>

      {/* Datos de Cobro en Binance Pay */}
      <div className="bg-[#181A20] p-6 rounded-2xl border border-[#2B313A] mb-8">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-[#F0B90B]" />
          <span>Configuración de Cobro en Binance Pay</span>
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Tus fondos serán acreditados sin intermediarios en tu cuenta de Binance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0B0E11] p-3.5 rounded-xl border border-[#2B313A]">
            <span className="text-[11px] text-gray-400 block">Tu Binance Pay ID Asociado:</span>
            <span className="text-base font-mono font-bold text-white mt-1 block">
              {user.binance_pay_id || 'No configurado'}
            </span>
          </div>
          <div className="bg-[#0B0E11] p-3.5 rounded-xl border border-[#2B313A]">
            <span className="text-[11px] text-gray-400 block">Binance Pay ID de la Plataforma (Recaudador):</span>
            <span className="text-base font-mono font-bold text-[#F0B90B] mt-1 block">
              37999878
            </span>
          </div>
        </div>
      </div>

      {/* Mis Metas Creadas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white">Mis Proyectos y Metas Activas</h3>
          <Link href="/crear" className="text-xs text-[#F0B90B] font-bold hover:underline">
            + Crear otra meta
          </Link>
        </div>

        <div className="space-y-3">
          {userProjects.map((p) => {
            const percent = Math.min(100, Math.round((p.current_amount / p.target_amount) * 100));
            return (
              <div key={p.id} className="bg-[#181A20] p-4 rounded-2xl border border-[#2B313A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={p.image_url} alt={p.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-white">{p.title}</h4>
                    <span className="text-xs text-gray-400">
                      ${p.current_amount} de ${p.target_amount} USDT ({percent}%)
                    </span>
                    <div className="w-36 bg-[#0B0E11] h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div className="bg-[#F0B90B] h-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/proyectos/${p.id}`}
                    className="px-3 py-1.5 bg-[#2B313A] hover:bg-[#383f4a] text-gray-200 rounded-lg text-xs font-semibold"
                  >
                    Ver Pública
                  </Link>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/proyectos/${p.id}`);
                      alert('Enlace copiado para compartir en tus redes.');
                    }}
                    className="px-3 py-1.5 bg-[#F0B90B]/10 text-[#F0B90B] hover:bg-[#F0B90B]/20 rounded-lg text-xs font-bold"
                  >
                    Compartir Link
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
