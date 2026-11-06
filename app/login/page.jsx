'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/panel');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-[#181A20] p-7 sm:p-8 rounded-3xl border border-[#2B313A] shadow-2xl">
        <div className="inline-flex items-center gap-1.5 bg-[#F0B90B]/10 text-[#F0B90B] px-3 py-1 rounded-full text-xs font-bold mb-3">
          <LogIn className="w-3.5 h-3.5" />
          <span>Acceso a la Plataforma</span>
        </div>

        <h1 className="text-2xl font-black text-white mb-1">Iniciar Sesión</h1>
        <p className="text-xs text-gray-400 mb-6">
          Ingresa a tu panel para gestionar tus metas o revisar tus aportes.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-2.5 rounded-xl text-xs mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Correo Electrónico:</label>
            <input
              type="email"
              required
              placeholder="tu-correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Contraseña:</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold py-3.5 rounded-xl transition text-xs shadow-lg shadow-[#F0B90B]/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar a mi Cuenta'}
          </button>
        </form>

        {/* Demo rápido para comodidad */}
        <div className="mt-5 p-3 rounded-xl bg-[#0B0E11] border border-[#2B313A] text-[11px] text-gray-400">
          <span className="font-bold text-gray-300 block mb-1">Cuenta demo para pruebas:</span>
          <span>Email: <strong className="text-white">demo@impulsovzla.com</strong></span>
          <br />
          <span>Contraseña: <strong className="text-white">123456</strong></span>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          ¿No tienes una cuenta aún?{' '}
          <Link href="/registro" className="text-[#F0B90B] font-bold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
