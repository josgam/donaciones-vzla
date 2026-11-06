'use client';
import { useState } from 'react';
import { Copy, Check, Heart, ShieldCheck, QrCode } from 'lucide-react';

export default function DonationModal({ project, isOpen, onClose, onDonationComplete }) {
  const [amount, setAmount] = useState('10');
  const [copied, setCopied] = useState(false);
  const [txId, setTxId] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorLocation, setDonorLocation] = useState('');
  const [step, setStep] = useState(1);

  if (!isOpen || !project) return null;

  const BINANCE_PAY_ID = '37999878';
  const numericAmount = parseFloat(amount) || 0;
  const platformFee = (numericAmount * 0.05).toFixed(2);
  const creatorAmount = (numericAmount * 0.95).toFixed(2);

  const copyPayId = () => {
    navigator.clipboard.writeText(BINANCE_PAY_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    if (!txId.trim()) {
      alert('Por favor ingresa el ID de transacción u orden de Binance Pay.');
      return;
    }
    if (onDonationComplete) {
      onDonationComplete(project.id, numericAmount);
    }
    alert('¡Donación registrada con éxito! En breve aparecerá en la meta.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#181A20] text-white rounded-2xl w-full max-w-md p-6 border border-[#2B313A] shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#2B313A]"
        >
          ✕
        </button>

        {step === 1 ? (
          <div>
            <div className="flex items-center gap-2 text-[#F0B90B] mb-2 font-semibold text-xs tracking-wide">
              <Heart className="w-4 h-4 fill-current" />
              <span>APORTE SOLIDARIO CON BINANCE PAY</span>
            </div>
            <h3 className="text-lg font-bold mb-1 leading-snug">{project.title}</h3>
            <p className="text-xs text-gray-400 mb-4">Para: <strong className="text-gray-200">{project.creator_name}</strong> ({project.creator_location})</p>

            {/* Selector de Montos Rápidos */}
            <label className="block text-xs font-semibold text-gray-300 mb-2">1. Selecciona o ingresa el monto (USDT):</label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {['5', '10', '25', '50'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    amount === val 
                      ? 'bg-[#F0B90B] text-black border-[#F0B90B] shadow-md shadow-[#F0B90B]/20' 
                      : 'bg-[#0B0E11] text-gray-200 border-[#2B313A] hover:border-gray-500'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Otro monto en USDT"
              className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-4 py-2.5 text-sm text-white mb-4 focus:outline-none focus:border-[#F0B90B]"
            />

            {/* Desglose Transparente */}
            <div className="bg-[#0B0E11] p-3 rounded-xl border border-[#2B313A] text-xs text-gray-300 space-y-1.5 mb-4">
              <div className="flex justify-between">
                <span>Llega a la meta (95% neto):</span>
                <span className="text-green-400 font-bold">${creatorAmount} USDT</span>
              </div>
              <div className="flex justify-between text-gray-400 text-[11px]">
                <span>Comisión operativa de la plataforma (5%):</span>
                <span>${platformFee} USDT</span>
              </div>
            </div>

            {/* Binance Pay ID */}
            <div className="bg-[#2B313A]/50 p-4 rounded-xl border border-[#F0B90B]/40 mb-5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-300 font-semibold">2. Envía a este Binance Pay ID:</span>
                <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold">0% Fee Red</span>
              </div>
              <div className="flex items-center justify-between bg-[#0B0E11] px-3.5 py-2.5 rounded-xl border border-[#2B313A] mt-2">
                <span className="text-[#F0B90B] font-mono text-xl font-black tracking-wider">{BINANCE_PAY_ID}</span>
                <button
                  type="button"
                  onClick={copyPayId}
                  className="flex items-center gap-1.5 text-xs bg-[#2B313A] hover:bg-[#3b434f] text-white px-3 py-1.5 rounded-lg font-semibold transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? '¡Copiado!' : 'Copiar ID'}
                </button>
              </div>
              <span className="text-[11px] text-gray-400 block mt-2">
                Abre tu app de Binance → Enviar → Binance Pay → Pega <strong>{BINANCE_PAY_ID}</strong>.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-[#F0B90B] hover:bg-[#FCD535] text-black font-extrabold py-3 rounded-xl transition text-sm shadow-lg shadow-[#F0B90B]/20"
            >
              Ya envié el pago → Registrar Comprobante
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-green-400 mb-2 font-semibold text-xs tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              <span>PASO 2: VERIFICACIÓN RÁPIDA</span>
            </div>
            <h3 className="text-lg font-bold mb-1">Registra tu Aporte</h3>
            <p className="text-xs text-gray-400 mb-4">Ingresa el ID de la transacción para acreditar tu donación a la meta de inmediato.</p>

            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Tu Nombre o Alias (opcional):</label>
                <input
                  type="text"
                  placeholder="Ej: Sofía M. o Anónimo"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Ubicación / País donde estás:</label>
                <input
                  type="text"
                  placeholder="Ej: Madrid, España o Caracas"
                  value={donorLocation}
                  onChange={(e) => setDonorLocation(e.target.value)}
                  className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F0B90B]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">ID de Orden / Transacción Binance Pay (*):</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 284918274019"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  className="w-full bg-[#0B0E11] border border-[#2B313A] rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#F0B90B]"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">Lo encuentras en el detalle de la transferencia en Binance.</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 bg-[#2B313A] hover:bg-[#383f4a] text-gray-300 py-3 rounded-xl text-xs font-semibold"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="w-2/3 bg-green-500 hover:bg-green-600 text-black py-3 rounded-xl text-xs font-bold transition shadow-lg shadow-green-500/20"
              >
                Confirmar Donación
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
