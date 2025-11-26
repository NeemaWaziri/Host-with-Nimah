import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Message, RecipeData } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import RecipeCard from './RecipeCard';

// --- Recipe Parsing Logic ---

interface ParsedRecipeResult {
  isRecipe: boolean;
  preText?: string;
  data?: RecipeData;
}

const parseRecipe = (text: string): ParsedRecipeResult => {
  const recipeStart = text.indexOf('# Recipe:');
  
  if (recipeStart === -1) {
    return { isRecipe: false };
  }

  const preText = text.substring(0, recipeStart).trim();
  const recipeText = text.substring(recipeStart);

  const titleMatch = recipeText.match(/# Recipe:\s*(.+)/);
  const descriptionMatch = recipeText.match(/## Description\s*([\s\S]*?)(?=## Prep Info|$)/);
  const prepInfoMatch = recipeText.match(/## Prep Info\s*([\s\S]*?)(?=## Ingredients|$)/);
  const ingredientsMatch = recipeText.match(/## Ingredients\s*([\s\S]*?)(?=## Instructions|$)/);
  const instructionsMatch = recipeText.match(/## Instructions\s*([\s\S]*?)(?=## Plating|$)/);
  const platingMatch = recipeText.match(/## Plating\s*([\s\S]*?)$/);

  const data: RecipeData = {
    title: titleMatch ? titleMatch[1].trim() : 'Chef\'s Selection',
    description: descriptionMatch ? descriptionMatch[1].trim() : '',
    prepInfo: prepInfoMatch 
      ? prepInfoMatch[1].trim().split('\n').filter(l => l.trim().startsWith('*')).map(l => l.replace(/^\*\s*/, ''))
      : [],
    ingredients: ingredientsMatch 
      ? ingredientsMatch[1].trim().split('\n').filter(l => l.trim().startsWith('*')).map(l => l.replace(/^\*\s*/, ''))
      : [],
    instructions: instructionsMatch 
      ? instructionsMatch[1].trim().split('\n').filter(l => /^\d+\./.test(l.trim())).map(l => l.replace(/^\d+\.\s*/, ''))
      : [],
    plating: platingMatch ? platingMatch[1].trim() : ''
  };

  return { isRecipe: true, preText, data };
};

// --- Main Component ---

const AIChef: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "Jambo, darling! I am Nimah's virtual culinary muse. Whether you crave the spices of Zanzibar or modern hosting tips, I'm here. Ask me for a recipe (like a classic Pilau) or advice for your next soirée.",
      timestamp: Date.now()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input, messages);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to render message content nicely
  const renderMessageText = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="font-semibold text-nimah-red dark:text-nimah-rose">{part}</strong> : part
    );
  };

  const MessageBubble: React.FC<{ msg: Message }> = ({ msg }) => {
    const isModel = msg.role === 'model';
    const parsed: ParsedRecipeResult = isModel ? parseRecipe(msg.content) : { isRecipe: false, preText: msg.content };

    return (
      <div className={`flex ${!isModel ? 'justify-end' : 'justify-start'}`}>
        <div className={`flex gap-3 max-w-[90%] md:max-w-[85%] ${!isModel ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`p-5 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap shadow-sm ${
            !isModel 
              ? 'bg-nimah-olive text-white rounded-tr-none' 
              : 'bg-white dark:bg-nimah-black border border-nimah-rose/20 text-nimah-black dark:text-nimah-cream rounded-tl-none w-full'
          }`}>
            {/* Render Introduction Text */}
            {parsed.preText && (
                <div className="mb-2">
                    {renderMessageText(parsed.preText)}
                </div>
            )}
            
            {/* Render Recipe Card if valid */}
            {parsed.isRecipe && parsed.data && (
                <RecipeCard data={parsed.data} className="mt-4" />
            )}
            
            {/* Fallback for standard model messages that aren't recipes */}
            {!parsed.isRecipe && isModel && (
                 <div>{renderMessageText(msg.content)}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="ai-chef" className="py-32 bg-nimah-paper dark:bg-nimah-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Side */}
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-5xl md:text-6xl text-nimah-black dark:text-nimah-cream mb-8 leading-tight">
              Your Personal <br />
              <span className="italic text-nimah-rose">Culinary Muse</span>
            </h2>
            <p className="font-sans text-lg text-nimah-olive dark:text-nimah-cream/80 mb-10 leading-relaxed font-light">
              Not sure what to serve for your next soirée? Wondering which wine pairs with sea bass? 
              Or perhaps you need a quick, aesthetic brunch idea. My AI assistant is trained on 
              my personal style and Tanzanian heritage to guide you.
            </p>
            <div className="hidden lg:block relative group bg-nimah-rose/10 rounded-sm">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-nimah-rose/20 dark:bg-white/5 animate-pulse rounded-sm z-10" />
                )}
                <div className="absolute inset-0 bg-nimah-red opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-sm z-20"></div>
                <img 
                    src="https://images.unsplash.com/photo-1547496502-ffa222d79634?q=80&w=1000&auto=format&fit=crop" 
                    alt="Aesthetics of cooking" 
                    onLoad={() => setImageLoaded(true)}
                    className={`rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 object-cover h-[500px] w-full ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
          </div>

          {/* Chat Interface */}
          <div className="order-1 lg:order-2 h-[700px] flex flex-col glass-panel rounded-t-[40px] rounded-b-[40px] shadow-2xl overflow-hidden relative border-nimah-rose/30">
             <div className="bg-nimah-cream/50 dark:bg-nimah-black/50 p-6 border-b border-nimah-rose/10 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-nimah-red flex items-center justify-center text-nimah-cream shadow-md">
                        <Sparkles size={18} />
                    </div>
                    <div>
                        <span className="font-serif text-nimah-black dark:text-nimah-cream font-semibold block text-lg">
                            Ask Nimah
                        </span>
                        <span className="text-xs font-sans uppercase tracking-wider text-nimah-olive dark:text-nimah-rose flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Online
                        </span>
                    </div>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white/40 dark:bg-black/20 scroll-smooth">
                {messages.map((msg) => (
                   <MessageBubble key={msg.id} msg={msg} />
                ))}
                {isLoading && (
                   <div className="flex justify-start">
                       <div className="bg-white dark:bg-nimah-black p-4 rounded-2xl rounded-tl-none shadow-sm border border-nimah-rose/20 flex items-center gap-3">
                           <Loader2 className="animate-spin text-nimah-rose" size={20} />
                           <span className="text-sm text-nimah-olive dark:text-nimah-cream/60 italic">Consulting the cookbook...</span>
                       </div>
                   </div> 
                )}
                <div ref={messagesEndRef} />
             </div>

             <div className="p-6 bg-white dark:bg-nimah-black border-t border-nimah-rose/10">
                <div className="flex items-center gap-2 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask about Tanzanian spices or hosting tips..."
                        className="w-full bg-nimah-paper dark:bg-white/5 text-nimah-black dark:text-nimah-cream rounded-full py-4 px-6 pr-14 focus:outline-none focus:ring-1 focus:ring-nimah-rose transition-all font-sans placeholder:text-nimah-olive/50 dark:placeholder:text-nimah-cream/30 border border-transparent focus:border-nimah-rose/30"
                        disabled={isLoading}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 p-3 bg-nimah-red text-nimah-cream rounded-full hover:bg-nimah-rose transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        <Send size={18} />
                    </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIChef;
