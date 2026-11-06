'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Heart, PlusCircle, MessageSquare, LogIn, User, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#181A20]/95 backdrop-blur-md border-b border-[#2B313A]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#F0B90B] flex items-center justify-center font-black text-black text-xl shadow-lg shadow-[#F0B90B]/20 group-hover:scale-105 transition">
            IV
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white block leading-tight">
              Impulso<span className="text-[#F0B90B]">Vzla</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium">Metas & Donaciones</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link 
            href="/experiencias" 
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-[#F0B90B] px-3 py-2 rounded-lg transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Experiencias</span>
          </Link>

          <Link
            href="/crear"
            className="flex items-center gap-1.5 bg-[#2B313A] hover:bg-[#383f4a] text-gray-200 font-bold text-xs px-3.5 py-2 rounded-xl transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#F0B90B]" />
            <span>Crear Meta</span>
          </Link>

          {user ? (
            <Link
              href="/panel"
              className="flex items-center gap-1.5 bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold text-xs px-3.5 py-2 rounded-xl transition shadow-md shadow-[#F0B90B]/20"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Mi Panel ({user.name.split(' ')[0]})</span>
            </Link>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="flex items-center gap-1 text-xs font-semibold text-gray-300 hover:text-white px-2.5 py-2 rounded-lg transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Entrar</span>
              </Link>
              <Link
                href="/registro"
                className="flex items-center gap-1 bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold text-xs px-3.5 py-2 rounded-xl transition shadow-md shadow-[#F0B90B]/20"
              >
                <span>Registro</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
