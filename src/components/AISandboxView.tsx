import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  ToggleLeft, 
  ToggleRight, 
  Info,
  User,
  Check,
  Cpu,
  BookOpen,
  Languages,
  ArrowRight,
  Sparkle
} from 'lucide-react';
import { ChatMessage } from '../types';

interface AISandboxProps {
  highContrast: boolean;
  textSizeLevel: number;
}

const QUICK_START_PROMPTS = [
  {
    id: 'prompt-1',
    label: 'Simplify a Technical Topic',
    icon: BookOpen,
    prompt: 'Can you explain how AC-to-DC electricity converters work for a beginner vocational student?',
    responseOriginal: 'Alternating Current (AC) is converted to Direct Current (DC) using an apparatus known as a rectifier. A basic bridge rectifier leverages four semiconductor diodes configured in a closed-loop tetrahedral format. These diodes exhibit unidirectional conductivity, routing the negative phase of the AC sinusoidal waveform back through the positive load side. The subsequent unsmoothed pulsating DC signal requires capacitor mitigation, where RC filter nodes smooth the peak-to-peak ripples into a constant, stable voltage suitable for integrated circuits and downstream electronics resistance.',
    responseSimplified: 'An AC-to-DC plug adapter changes wall outlets (which push electricity back-and-forth) into a one-way flow needed for tools & phones. It uses "diodes", which act like one-way gates. When power tries to wobble backwards, the gates guide it forward instead. Then, an electrical sponge called a "capacitor" soaks up any bumps, creating a smooth, steady current that won\'t damage delicate devices.'
  },
  {
    id: 'prompt-2',
    label: 'Vocational Skills Guidance',
    icon: Cpu,
    prompt: 'What are the main entry requirements and safety skills needed for high-demand welding apprenticeships?',
    responseOriginal: 'Candidate onboarding into metal fabrication and alloy welding curricula requires robust comprehension of ambient workplace safety regulations. High-demand structural welding apprenticeships necessitate proficiency in Shielded Metal Arc Welding (SMAW) or Gas Tungsten Arc Welding (GTAW). Master-level skills focus heavily on multi-pass root welds, plate fit-up tolerances, and meticulous gas shield regulation. To pass international certification standards, apprentices must master industrial hazards mitigation, including localized fume extraction, infrared optical filtration (shade 10-13 helmets), and fire prevention zones.',
    responseSimplified: 'To get an entry-level welding job, you need basic hands-on training and a focus on keeping yourself safe. Real-world welding apprenticeships teach you how to melt and join metal plates together. Key safety rules include: wearing a dark welding shield helmet (shade 10-13) to protect your eyes from the bright blue flash, working near a suction fan so you do not breathe in bad smoke, and keeping flammable spray far away from sparks.'
  },
  {
    id: 'prompt-3',
    label: 'Language Translation Assistant',
    icon: Languages,
    prompt: 'Translate and simplify this safety rule: "Mandatory compliance with high-visibility PPE vests is required in work zones."',
    responseOriginal: 'Strict adherence to workplace protocol dictates that all registered laborers, sub-contractors, and visitors are legally required to put on high-visibility Class II or Class III reflective apparel immediately upon entry into active heavy machinery transport perimeters to avoid hazardous collisions.',
    responseSimplified: 'Spanish: "Usa chaleco reflectivo". Everyone entering the workspace must wear a bright yellow or orange reflective safety vest. This simple brightly colored vest prevents accidents by making sure vehicle drivers can see you clearly in any weather.'
  }
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'assistant',
    originalText: 'Greetings! I am the Bridge AI Study Assistant. My goal is to break down barriers to university and vocational training. Ask me any technical topic or vocational skill! Toggle the "Accessibility View" switch at the top to see how I translate complex ideas into Plain Language for learners.',
    simplifiedText: 'Hi! I am your AI assistant. I help make vocational and college skills easy to understand. Click the "Simplify Mode" switch at the top to see complex things written in simple, clear words.',
    timestamp: '15:20'
  }
];

export default function AISandboxView({ highContrast, textSizeLevel }: AISandboxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('bridge_equal_ed_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  
  const [inputText, setInputText] = useState('');
  const [simplifiedMode, setSimplifiedMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('bridge_equal_ed_messages', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      originalText: textToSend,
      simplifiedText: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and customized responses based on questions
    setTimeout(() => {
      let originalResp = 'I have received your query. To support affordable, equal education, I am happy to analyze this. Technical curricula require simplifying terms: all machines work on basic mechanical advantages like levers, screws, and wheels. Let’s collaborate to unlock this resource!';
      let simplifiedResp = 'I hear you! I am ready to help. To make studying equal and affordable, remember that even high-tech machines use basic steps: pushing, pulling, and simple parts. We can learn this together!';

      // Match prompts
      const lower = textToSend.toLowerCase();
      if (lower.includes('electricity') || lower.includes('converter') || lower.includes('ac-to-dc') || lower.includes('technical')) {
        originalResp = QUICK_START_PROMPTS[0].responseOriginal;
        simplifiedResp = QUICK_START_PROMPTS[0].responseSimplified;
      } else if (lower.includes('weld') || lower.includes('apprentice') || lower.includes('safety') || lower.includes('vocational')) {
        originalResp = QUICK_START_PROMPTS[1].responseOriginal;
        simplifiedResp = QUICK_START_PROMPTS[1].responseSimplified;
      } else if (lower.includes('translate') || lower.includes('compliance') || lower.includes('ppe') || lower.includes('vest')) {
        originalResp = QUICK_START_PROMPTS[2].responseOriginal;
        simplifiedResp = QUICK_START_PROMPTS[2].responseSimplified;
      } else {
        // generic responses matching technical/vocational themes
        originalResp = `Regarding "${textToSend}": Tertiary educational pedagogy indicates that comprehension of highly intricate parameters succeeds when parsed incrementally. Academic frameworks emphasize structural decomposition of variables, meaning we isolate independent nodes of study to eliminate cognitive fatigue during apprenticeships.`;
        simplifiedResp = `Regarding "${textToSend}": To learn complex subjects fast, breaking them down into small, single steps prevents feeling overwhelmed. We inspect one card or concept at a time. This keeps technical training approachable for anyone starting out!`;
      }

      const assistantMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        originalText: originalResp,
        simplifiedText: simplifiedResp,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm("Do you want to clear your current conversation simulation?")) {
      setMessages(INITIAL_MESSAGES);
    }
  };

  // Text resize modifier
  const getTextSizeClass = (base: string, modifier: number = 0) => {
    const levels = [
      ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'],
      ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'],
      ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'],
    ];
    const sizeMap: Record<string, number> = {
      'text-xs': 0, 'text-sm': 1, 'text-base': 2, 'text-lg': 3, 'text-xl': 4,
      'text-2xl': 5, 'text-3xl': 6
    };
    const index = sizeMap[base];
    if (index === undefined) return base;
    const adjustedIndex = Math.min(levels[textSizeLevel].length - 1, Math.max(0, index + modifier));
    return levels[textSizeLevel][adjustedIndex];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Informative Sidebar / Left Column */}
      <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
        <div className="space-y-4">
          <div className="p-3 bg-brand-500/10 dark:bg-brand-500/5 rounded-xl border border-brand-500/20 text-brand-600 dark:text-brand-400 inline-flex">
            <Cpu className="w-5 h-5 text-brand-500" />
          </div>
          
          <h2 className={`font-display font-bold text-slate-900 dark:text-white ${getTextSizeClass('text-xl')}`}>
            AI Agent Sandbox
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light">
            Cognitive accessibility is key to equal education. Learners with diverse language backgrounds or intellectual neurodiversities often struggle with academic heavy jargon.
          </p>

          <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl space-y-2 text-xs border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-200 block inline-flex items-center gap-1.5 uppercase font-mono text-[9px]">
              <Info className="w-3.5 h-3.5 text-brand-500" />
              How It Works
            </span>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              We process text at two levels: <strong>Standard Academic</strong> level and <strong>Simplified Plain Language</strong>. Flip the high-visibility header toggle to watch the AI assistant adapt instantly.
            </p>
          </div>
        </div>

        {/* Quick-Starts Area */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-400 dark:text-slate-500 block mb-2">
            Click to Simulate Prompts
          </span>
          
          {QUICK_START_PROMPTS.map((item) => {
            const PromptIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSend(item.prompt)}
                disabled={isTyping}
                className="w-full p-3 bg-slate-50 hover:bg-brand-50 dark:bg-slate-950/20 dark:hover:bg-brand-950/20 text-left rounded-xl border border-slate-100 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-900/40 transition-all duration-200 flex items-start gap-3 cursor-pointer group"
              >
                <div className="p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-brand-500 transition-colors shrink-0">
                  <PromptIcon className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200 block">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block line-clamp-1">
                    {item.prompt}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Sandbox Interactive Area */}
      <div className="lg:col-span-8 flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 min-h-[480px]">
        {/* Chat Header Control and Simulator Toggle */}
        <div className={`p-4 border-b rounded-t-2xl flex flex-wrap justify-between items-center gap-3 transition-colors ${
          highContrast 
          ? 'bg-black border-yellow-400 text-yellow-400' 
          : 'bg-indigo-950 border-indigo-900 text-white'
        }`}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                highContrast ? 'bg-yellow-400' : 'bg-emerald-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                highContrast ? 'bg-yellow-400' : 'bg-emerald-500'
              }`}></span>
            </span>
            <div>
              <span className={`font-extrabold text-xs block leading-none ${
                highContrast ? 'text-yellow-400' : 'text-white'
              }`}>
                AI STUDY COMPANION
              </span>
              <span className={`text-[9px] font-mono block mt-0.5 lowercase ${
                highContrast ? 'text-yellow-350' : 'text-indigo-200'
              }`}>
                latency: 18ms (simulated offline backup)
              </span>
            </div>
          </div>

          {/* SIMULATED MODE INTERACTIVE TOGGLE */}
          <button
            onClick={() => setSimplifiedMode(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
              highContrast
              ? 'bg-black border-yellow-400 text-yellow-400 font-bold'
              : simplifiedMode 
                ? 'bg-amber-400 border-amber-300 text-indigo-950 font-bold ring-2 ring-amber-400/20 shadow-md' 
                : 'bg-indigo-900/40 border-indigo-800 text-indigo-100 hover:bg-indigo-900/80'
            }`}
          >
            <span className="text-xs uppercase font-mono tracking-wide">
              {simplifiedMode ? 'Simplified / Translated Active' : 'Normal Academic Language'}
            </span>
            {simplifiedMode ? (
              <ToggleRight className="w-5 h-5 text-indigo-950" />
            ) : (
              <ToggleLeft className="w-5 h-5 text-indigo-300" />
            )}
          </button>
        </div>

        {/* Chat Stream History */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[380px] scrollbar-thin bg-slate-100/20 dark:bg-slate-950/20"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            
            return (
              <div 
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto' : 'mr-auto'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/10 dark:bg-indigo-600/5 text-brand-600 dark:text-brand-400 border border-brand-500/10 flex items-center justify-center shrink-0">
                    <Sparkle className="w-4 h-4 text-brand-500" />
                  </div>
                )}
                
                <div className={`space-y-1 ${isUser ? 'text-right' : 'text-left'}`}>
                  <div className="text-[10px] text-slate-400 font-mono tracking-wider">
                    {isUser ? 'You' : 'Inclusive Study AI'} • {msg.timestamp}
                  </div>
                  
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 relative border select-text ${
                    isUser 
                    ? 'bg-brand-600 border-brand-700 text-white rounded-tr-none shadow-sm shadow-brand-500/10' 
                    : simplifiedMode 
                      ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/40 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm'
                  }`}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={simplifiedMode ? 'simplified' : 'original'}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.15 }}
                      >
                        {simplifiedMode && !isUser ? (
                          <div className="space-y-2">
                            <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider text-amber-800 dark:text-amber-400 uppercase">
                              Plain Language Mode
                            </span>
                            <p>{msg.simplifiedText}</p>
                          </div>
                        ) : (
                          <p>{msg.originalText}</p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 border border-teal-500/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-teal-600" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4 animate-spin text-brand-500" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 font-mono">
                  Inclusive Study AI is translating...
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-150 dark:border-slate-800 flex items-center gap-1 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 rounded-b-2xl">
          <form 
            action="#" 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
            className="flex gap-2"
          >
            <input
              id="ai-prompt-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (e.g., 'explain electric resistance' or 'welding helmet rules')..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs focus:ring-1 focus:ring-brand-500 outline-none"
              disabled={isTyping}
              required
            />
            
            <button
              type="button"
              onClick={handleReset}
              title="Reset conversation"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 hover:border-red-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={isTyping || !inputText.trim()}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 rounded-xl transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-brand-500 font-bold text-xs cursor-pointer shadow-sm shadow-brand-500/10 hover:scale-[1.02]"
            >
              Send
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-light px-1">
            <span>Powered by Client-Side Pedagogy Templates</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Multi-Layer Translation Active
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
