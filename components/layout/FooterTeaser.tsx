export default function FooterTeaser() {
  return (
    <section className="relative py-20 border-t border-forest/10 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Content */}
        <div className="space-y-6 z-10">
          <span className="text-lime font-bold tracking-widest uppercase text-sm">Академия</span>
          <h2 className="text-4xl md:text-5xl font-bold text-forest leading-tight">
            Как подготовить <br />идеальный макет?
          </h2>
          <p className="text-forest/60 max-w-md">
            Разбираем тонкости препресса: от вылетов и цветовых профилей до выбора плотности бумаги.
          </p>
          <button className="text-forest border-b border-forest/30 pb-1 hover:border-lime hover:text-lime transition-all duration-300">
            Читать гайд →
          </button>
        </div>

        {/* Visualization */}
        <div className="relative h-64 md:h-80 w-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
          <div className="relative w-64 h-40 bg-white shadow-tactile transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500 ease-out">
             {/* Bleed Lines */}
             <div className="absolute inset-[-10px] border border-dashed border-red-400 opacity-50"></div>
             <div className="absolute -top-6 left-0 text-[10px] text-red-400 font-mono">Bleed (2mm)</div>
             
             {/* Trim Line */}
             <div className="absolute inset-0 border border-forest opacity-20"></div>

             {/* Safe Zone */}
             <div className="absolute inset-[10px] border border-dashed border-lime opacity-80"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-forest/20 font-bold text-2xl uppercase">
               Logo Area
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
