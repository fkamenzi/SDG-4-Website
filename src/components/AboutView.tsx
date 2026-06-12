import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  Award, 
  Compass, 
  Activity, 
  Globe, 
  Sparkle,
  CheckCircle,
  ExternalLink,
  Milestone
} from 'lucide-react';

interface AboutViewProps {
  highContrast: boolean;
  textSizeLevel: number;
}

export default function AboutView({ highContrast, textSizeLevel }: AboutViewProps) {
  
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
    <div className="space-y-12">
      
      {/* Dynamic Intro Bento Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left main intro section */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wide">
              <Milestone className="w-3.5 h-3.5" />
              Information System Purpose Brief
            </div>
            
            <h2 className={`font-display font-extrabold text-slate-900 dark:text-white leading-tight ${getTextSizeClass('text-2xl', 1)}`}>
              Bridging Gaps in Technical & Vocational Learning
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-light">
              <strong>Bridge to Equal Ed</strong> was built to highlight and conquer structural blockages to Sustainable Development Goal SDG Target 4.3. High textbook costs, academic complexity, and heavy high-bandwidth internet layouts locked out billions of willing learners. These digital prototypes demonstrate three pillars representing smarter learning tools:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-150 block inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-indigo-600"></span>
                1. Raise Awareness
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Utilize highly communicative stats meters and custom billboard poster templates so anyone can advocate locally.
              </p>
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-150 block inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-amber-500"></span>
                2. Demonstrate Inclusive AI
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Simplify mechanical and technical jargon into clear, multi-dialect Plain Language dynamically.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-150 block inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-emerald-500"></span>
                3. Smarter Access
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Reconfigure user interfaces for deep Data-Saving (text-only grids) to include learners on narrow mobile coverage.
              </p>
            </div>
          </div>
        </div>

        {/* Right smaller SDG banner card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-indigo-900 to-slate-950 text-white p-6 md:p-8 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-lg">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-wider text-accent-highlight uppercase font-black block">
              UNITED NATIONS TARGET 4.3
            </span>
            <div className="w-10 h-10 rounded bg-indigo-700/60 flex items-center justify-center font-display font-black text-lg">
              4
            </div>
            <h3 className="font-display font-extrabold text-base tracking-tight text-white leading-snug">
              "Equal Access to Affordable Technical, Vocational & Higher Education"
            </h3>
            <p className="text-indigo-200 text-xs font-light leading-relaxed">
              Ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education, including university by the year 2030.
            </p>
          </div>

          <div className="pt-4 border-t border-indigo-950 flex justify-between items-center text-[10px] text-indigo-300">
            <span>Global Indicators: 4.3.1</span>
            <a 
              href="https://sdgs.un.org/goals/goal4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent-highlight cursor-pointer flex items-center gap-1"
            >
              Learn More
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Milestone Checkpoints of SDG 4.3 */}
      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h3 className={`font-display font-extrabold text-slate-900 dark:text-white leading-tight ${getTextSizeClass('text-xl')}`}>
            Critical Milestones toward the 2030 Vision
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-light mt-1">
            Global metrics tracking universal accessibility to quality tertiary education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-slate-400 dark:text-slate-500 block">Checkpoint 1</span>
                <span className="font-bold text-xs text-slate-900 dark:text-slate-150 block">Zero-Cost Basic Technical Syllabus Distribution</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light">
                  Establishing clear government protocols to license essential engineering and vocational guidebooks under Creative Commons so no student is forced to buy expensive foreign manuals.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-slate-400 dark:text-slate-500 block">Checkpoint 2</span>
                <span className="font-bold text-xs text-slate-900 dark:text-slate-150 block">High-Priority Technical Scholarship Subsidies</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light">
                  Directing regional micro-grants specifically targeting youth from low-wage households, doubling vocational enrollments inside marginalized manufacturing zones.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 shrink-0">
                <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-slate-400 dark:text-slate-500 block">Checkpoint 3 (In-Progress)</span>
                <span className="font-bold text-xs text-slate-900 dark:text-slate-150 block">Cognitive & Plain Language Localisation Systems</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light">
                  Building deep accessible AI filters that allow local apprentices to read high-level manufacturing standards using regional dialects or simplified verbal workflows without tuition barriers.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 shrink-0">
                <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-slate-400 dark:text-slate-500 block">Checkpoint 4 (In-Progress)</span>
                <span className="font-bold text-xs text-slate-900 dark:text-slate-150 block">Low-Bandwidth Mobile Portal Standards</span>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light">
                  Instructing designers to bypass heavy script execution and large image asset dependencies so e-syllabus materials can load instantly under basic cell reception speeds.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call To Action Block */}
      <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <span className="font-bold text-xs text-slate-800 dark:text-slate-150 block">Become an Education Advocate</span>
          <p className="text-slate-600 dark:text-slate-400 text-xs font-light max-w-xl">
             Share this showcase, download open book files to local tablets, or write educational campaigns using the custom flyer billboard widget in our dashboard view.
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>Created with care for equal education</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-bounce" />
        </div>
      </div>

    </div>
  );
}
