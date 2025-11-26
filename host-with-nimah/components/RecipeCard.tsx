import React, { useState } from 'react';
import { ChefHat, Clock, Users, Copy, Check, Utensils, Sparkles } from 'lucide-react';
import { RecipeData } from '../types';

interface RecipeCardProps {
  data: RecipeData;
  className?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ data, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `
${data.title}
${data.description}

Ingredients:
${data.ingredients.join('\n')}

Instructions:
${data.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n')}

Plating:
${data.plating}
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-nimah-paper dark:bg-white/5 border border-nimah-rose/20 rounded-xl overflow-hidden shadow-xl animate-fade-in-up flex flex-col h-full ${className}`}>
      {/* Optional Header Image */}
      {data.image && (
        <div className="h-48 w-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-nimah-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"/>
            <img src={data.image} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      )}

      {/* Header */}
      <div className="bg-nimah-rose/10 p-5 border-b border-nimah-rose/10 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ChefHat size={18} className="text-nimah-red dark:text-nimah-rose" />
            <span className="text-xs font-sans uppercase tracking-widest text-nimah-olive dark:text-nimah-cream/70">From the Kitchen of Nimah</span>
          </div>
          <h3 className="font-serif text-2xl text-nimah-black dark:text-nimah-cream leading-tight">{data.title}</h3>
        </div>
        <button 
          onClick={handleCopy}
          className="p-2 hover:bg-nimah-rose/20 rounded-full transition-colors text-nimah-olive dark:text-nimah-cream/60 flex-shrink-0"
          title="Copy Recipe"
        >
          {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
        </button>
      </div>

      <div className="p-6 space-y-6 flex-grow flex flex-col">
        {/* Description & Prep */}
        <div className="space-y-4">
          <p className="text-sm italic text-nimah-black/70 dark:text-nimah-cream/70 leading-relaxed font-serif">
            "{data.description}"
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-sans font-bold uppercase tracking-wider text-nimah-olive dark:text-nimah-rose">
            {data.prepInfo.map((info, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-nimah-black/5 dark:bg-white/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                {idx === 0 ? <Clock size={14} /> : idx === 1 ? <Utensils size={14} /> : <Users size={14} />}
                {info.replace(/.*:\s*/, '')}
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-nimah-rose/20 w-full" />

        {/* Ingredients */}
        <div>
          <h4 className="font-serif text-lg text-nimah-black dark:text-nimah-cream mb-3">Ingredients</h4>
          <ul className="space-y-2">
            {data.ingredients.slice(0, 8).map((ing, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-nimah-black/80 dark:text-nimah-cream/90">
                <div className="mt-1 min-w-[16px] h-4 rounded-full border border-nimah-rose/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-nimah-rose/20"></div>
                </div>
                <span>{ing}</span>
              </li>
            ))}
            {data.ingredients.length > 8 && (
                <li className="text-xs italic text-nimah-olive dark:text-nimah-rose pl-7">...and more</li>
            )}
          </ul>
        </div>

         <div className="h-px bg-nimah-rose/20 w-full" />

        {/* Instructions */}
        <div className="flex-grow">
          <h4 className="font-serif text-lg text-nimah-black dark:text-nimah-cream mb-3">Method</h4>
          <div className="space-y-4">
            {data.instructions.slice(0, 3).map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-nimah-red/10 text-nimah-red dark:text-nimah-rose flex items-center justify-center text-xs font-bold font-sans">
                  {i + 1}
                </span>
                <p className="text-sm text-nimah-black/80 dark:text-nimah-cream/90 leading-relaxed pt-0.5 line-clamp-3">{step}</p>
              </div>
            ))}
            {data.instructions.length > 3 && (
                 <p className="text-xs italic text-nimah-olive dark:text-nimah-rose pl-10">See full recipe for details...</p>
            )}
          </div>
        </div>

        {/* Plating */}
        {data.plating && (
          <div className="bg-nimah-cream/30 dark:bg-nimah-olive/20 p-4 rounded-lg border border-nimah-cream/50 dark:border-nimah-olive/30 mt-auto">
            <h4 className="font-serif text-nimah-black dark:text-nimah-cream mb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-nimah-red" />
              Plating & Pairing
            </h4>
            <p className="text-sm text-nimah-black/80 dark:text-nimah-cream/80 italic line-clamp-3">
              {data.plating}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
