'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, UserPlus, ShieldCheck, ArrowRight } from 'lucide-react';

export default function RegistroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'creador', // creador o donante
    location: '',
    binance_pay_id: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      alert('¡Registro exitoso! Bienvenido a ImpulsoVzla.');
      router.push('/panel');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-[#181A20] p-7 sm:p-8 rounded-3xl border border-[#2B313A] shadow-2xl">
        <div className="inline-flex items-center gap-1.5 bg-[#F0B90B]/10 text-[#F0B90B] px-3 py-1 rounded-full text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Comunidad Oficial</span>
        </div>

        <h1 className="text-2xl font-black text-white mb-1">Crea tu Cuenta</h1>
        <p className="text-xs text-gray-400 mb-6">
          Regístrate para crear metas, recibir donaciones por Binance Pay o apoyar proyectos venezolanos.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-2.5 rounded-xl text-xs mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">¿Cómo deseas participar?</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'creador' })}
                className={`py-2 rounded-xl text-xs font-bold border transition ${
                  formData.role === 'creador'
                    ? 'bg-[#F0B90B] text-black border-[#F0B90B]'
                    : 'bg-[#0B0E11] text-gray-300 border-[#2B313A]'
                }`}
              >
                🚀 Emprendedor / Creador
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'donante' })}
                className={`py-2 rounded-xl text-xs font-bold border transition ${
                  formData.role === 'donante'
                    ? 'bg-[#F0B90B] text-black border-[#F0B90B]'
                    : 'bg-[#0B0E11] text-gray-300 border-[#2B313A]'
                }`}
              >
                ❤️ Donante Solidario
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Nombre Completo (*):</label>
            <input
              type="text"
              required
              placeholder="Ej: Daniel Morales"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Correo Electrónico (*):</label>
            <input
              type="email"
              required
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Contraseña (*):</label>
              <input
                type="password"
                required
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Confirmar (*):</label>
              <input
                type="password"
                required
                placeholder="Repite contraseña"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Ciudad / País (*):</label>
              <input
                type="text"
                required
                placeholder="Ej: Valencia / Madrid"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">WhatsApp / Teléfono:</label>
              <input
                type="text"
                placeholder="Ej: 04141234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Tu Binance Pay ID {formData.role === 'creador' ? '(* para retiros)' : '(opcional)'}:
            </label>
            <input
              type="text"
              required={formData.role === 'creador'}
              placeholder="Ej: 54910284"
              value={formData.binance_pay_id}
              onChange={(e) => setFormData({ ...formData, binance_pay_id: e.target.value })}
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#F0B90B]"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              Aquí transferiremos tus fondos cuando retires de tus metas.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold py-3.5 rounded-xl transition text-xs shadow-lg shadow-[#F0B90B]/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta Gratis'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-[#F0B90B] font-bold hover:underline">
            Inicia Sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
