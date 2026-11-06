'use client';
import Link from 'next/link';
import { Heart, PlusCircle, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Navbar() {
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

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link 
            href="/experiencias" 
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-300 hover:text-[#F0B90B] px-3 py-2 rounded-lg transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Experiencias</span>
          </Link>

          <Link
            href="/crear"
            className="flex items-center gap-1.5 bg-[#F0B90B] hover:bg-[#FCD535] text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition shadow-md shadow-[#F0B90B]/20 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Crear Meta</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
