import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Award, 
  BookOpen, 
  Globe, 
  TrendingUp, 
  Share2, 
  Check, 
  Download, 
  Edit3, 
  Info,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { PosterTemplate } from '../types';
import CampaignPoster from './CampaignPoster';

interface DashboardProps {
  highContrast: boolean;
  textSizeLevel: number; // 0 = standard, 1 = large, 2 = extra-large
}

const SDG_STATISTICS = [
  {
    id: 'stat-1',
    percentage: '1%',
    label: 'Poorest Youth Completion',
    description: 'Only 1% of the poorest youth complete tertiary education in low-income countries, compared to 80% in high-income nations.',
    source: 'UNESCO Global Education Monitoring Report',
    icon: Users,
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'stat-2',
    percentage: '9%',
    label: 'Enrollment in Sub-Saharan Africa',
    description: 'The gross tertiary enrollment ratio is just 9% in Sub-Saharan Africa, in stark contrast to the global average of 38% and 77% in high-income regions.',
    source: 'World Bank Education Indicators',
    icon: Globe,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'stat-3',
    percentage: '3x',
    label: 'Financial Barrier Multiple',
    description: 'Technical and vocational training tuition costs frequently average up to 3 times the annual helper-wage household income in developing regions.',
    source: 'SDG Target 4.3 Global Advocacy Brief',
    icon: TrendingUp,
    color: 'from-teal-500 to-emerald-500',
  },
];

const ADVOCACY_POSTERS: PosterTemplate[] = [
  {
    id: 'poster-1',
    title: 'Bridge to Equal Ed',
    subtitle: 'SDG TARGET 4.3 ADVOCACY',
    slogan: 'Skill Is Universal. Access Is Not.',
    sdgGoal: 'SDG 4: Quality Education',
    accentColor: 'blue',
    message: 'Technical and college training must be affordable for every human being, regardless of background, geography, or economic standing.',
    bullets: [
      'Accessible AI translation guides',
      'Low-bandwidth offline data storage',
      'Cost-free technical skill manuals'
    ]
  },
  {
    id: 'poster-2',
    title: 'Dignity in Vocational Skills',
    subtitle: 'VOCATIONAL & TECHNICAL EMPOWERMENT',
    slogan: 'Train Today, Lead Tomorrow.',
    sdgGoal: 'SDG 8: Decent Work & SDG 4.3',
    accentColor: 'teal',
    message: 'Technical certificates lay the bedrock for thriving communities. We advocate for direct subsidy of local vocational learning systems.',
    bullets: [
      'Open-access mechanics curriculum',
      'Free software blueprint archives',
      'Peer-to-peer mentoring directories'
    ]
  },
  {
    id: 'poster-3',
    title: 'AI for Radical Inclusion',
    subtitle: 'COGNITIVE & COGNITIONAL ASSISTANCE',
    slogan: 'Smart Systems for Simplified Explanations.',
    sdgGoal: 'SDG 10: Reduced Inequalities',
    accentColor: 'amber',
    message: 'Artificial intelligence can translate, simplify, and break open complex academic barriers for students speaking minority dialects or facing learning difficulty.',
    bullets: [
      'Real-time plain-language adapters',
      'Multi-dialect voice synthesis support',
      'Optimized lightweight prompt paths'
    ]
  }
];

const PRESET_MESSAGES = [
  "Education is a fundamental human right, not a privilege.",
  "Equal vocational opportunities lead to a thriving local economy.",
  "AI for education must remain lightweight, fast, and accessible to everyone.",
  "Supporting offline-first resources for the remote regions of the world.",
  "Empowering local apprentices will define future development.",
];

export default function DashboardView({ highContrast, textSizeLevel }: DashboardProps) {
  // Local state for campaign counter
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    const saved = localStorage.getItem('bridge_equal_ed_visitors');
    return saved ? parseInt(saved, 10) : 68; // Initial mock counter
  });

  const [hasLogged, setHasLogged] = useState<boolean>(() => {
    return localStorage.getItem('bridge_equal_ed_has_logged') === 'true';
  });

  // Recent advocates scroll list
  const [recentAdvocates, setRecentAdvocates] = useState<Array<{ name: string; message: string; time: string }>>(() => {
    const saved = localStorage.getItem('bridge_equal_ed_advocates');
    if (saved) return JSON.parse(saved);
    return [
      { name: 'Dr. Jane Smith', message: "No student should be locked out of engineering because of textbook costs.", time: '2 mins ago' },
      { name: 'Amara Diop', message: "Data-saver features unlock learning on slow mobile networks in Senegal.", time: '1 hour ago' },
      { name: 'Jose Martinez', message: "AI translations help me study mechanical blueprints in my native language.", time: '3 hours ago' },
      { name: 'Wei Deng', message: "Vocational schools deserve equal dignity and funding.", time: '5 hours ago' }
    ];
  });

  // New advocate entry inputs
  const [advocateName, setAdvocateName] = useState('');
  const [advocateMessage, setAdvocateMessage] = useState('');
  const [showPledgeForm, setShowPledgeForm] = useState(false);

  // Digital poster showcase state
  const [selectedPosterId, setSelectedPosterId] = useState(ADVOCACY_POSTERS[0].id);
  const [customSlogan, setCustomSlogan] = useState('');
  const [isPosterCopied, setIsPosterCopied] = useState(false);

  const selectedPoster = ADVOCACY_POSTERS.find(p => p.id === selectedPosterId) || ADVOCACY_POSTERS[0];

  // Side-effect to sync counts
  useEffect(() => {
    localStorage.setItem('bridge_equal_ed_visitors', visitorCount.toString());
  }, [visitorCount]);

  useEffect(() => {
    localStorage.setItem('bridge_equal_ed_advocates', JSON.stringify(recentAdvocates));
  }, [recentAdvocates]);

  const handleLogVisit = () => {
    if (!hasLogged) {
      setVisitorCount(prev => prev + 1);
      setHasLogged(true);
      localStorage.setItem('bridge_equal_ed_has_logged', 'true');
      
      // Auto-populate a pledge message
      const randomMsg = PRESET_MESSAGES[Math.floor(Math.random() * PRESET_MESSAGES.length)];
      const newAdvocate = {
        name: 'Honored Visitor ' + (visitorCount + 1),
        message: randomMsg,
        time: 'Just now'
      };
      setRecentAdvocates(prev => [newAdvocate, ...prev]);
    }
  };

  const submitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!advocateName.trim()) return;

    const newAdvocate = {
      name: advocateName.trim(),
      message: advocateMessage.trim() || "Standing up for affordable, high-quality technical education worldwide.",
      time: 'Just now'
    };

    setRecentAdvocates(prev => [newAdvocate, ...prev]);
    setVisitorCount(prev => prev + 1);
    setAdvocateName('');
    setAdvocateMessage('');
    setShowPledgeForm(false);
    setHasLogged(true);
    localStorage.setItem('bridge_equal_ed_has_logged', 'true');
  };

  // UI sizing utilities
  const getTextSizeClass = (base: string, modifier: number = 0) => {
    const levels = [
      ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'],
      ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl'],
      ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl'],
    ];
    const sizeMap: Record<string, number> = {
      'text-xs': 0, 'text-sm': 1, 'text-base': 2, 'text-lg': 3, 'text-xl': 4,
      'text-2xl': 5, 'text-3xl': 6, 'text-4xl': 7, 'text-5xl': 8, 'text-6xl': 9
    };
    const index = sizeMap[base];
    if (index === undefined) return base;
    const adjustedIndex = Math.min(levels[textSizeLevel].length - 1, Math.max(0, index + modifier));
    return levels[textSizeLevel][adjustedIndex];
  };

  const handleSharePoster = () => {
    setIsPosterCopied(true);
    setTimeout(() => setIsPosterCopied(false), 2500);
  };

  const targetGoal = 100;
  const progressPercent = Math.min(100, (visitorCount / targetGoal) * 100);

  // Brand and theme accent helper
  const getPosterColors = (col: string) => {
    switch (col) {
      case 'teal':
        return {
          bg: 'bg-teal-50 dark:bg-teal-950/20',
          border: 'border-teal-500',
          badge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
          glow: 'shadow-teal-100 dark:shadow-teal-950/10',
          text: 'text-teal-600 dark:text-teal-400',
          pillBg: 'bg-teal-600',
        };
      case 'amber':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/20',
          border: 'border-amber-500',
          badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
          glow: 'shadow-amber-100 dark:shadow-amber-950/10',
          text: 'text-amber-600 dark:text-amber-400',
          pillBg: 'bg-amber-500',
        };
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/20',
          border: 'border-blue-500',
          badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
          glow: 'shadow-blue-100 dark:shadow-blue-950/10',
          text: 'text-blue-600 dark:text-blue-400',
          pillBg: 'bg-blue-600',
        };
    }
  };

  const colSet = getPosterColors(selectedPoster.accentColor);

  return (
    <div className="space-y-12">
      {/* Awareness Hub Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-radial from-brand-900 via-slate-900 to-black text-white p-8 md:p-12 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-accent-teal opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono tracking-wider text-accent-highlight uppercase">
            <Sparkles className="w-3.5 h-3.5 text-accent-highlight animate-pulse" />
            UN Sustainable Development Goal 4.3
          </div>
          
          <h1 className={`font-display font-bold leading-tight tracking-tight ${getTextSizeClass('text-4xl', 1)}`}>
            Education Is a Bridge, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-amber-300">
              Not a Border
            </span>
          </h1>
          
          <p className={`text-slate-300 max-w-2xl font-light leading-relaxed ${getTextSizeClass('text-base')}`}>
            UN SDG Target 4.3 demands that all girls and boys have equal access to affordable, premium technical, vocational, and university qualifications by 2030. Explore how intelligent, lightweight technology can bypass infrastructural limitations to support local learners.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <a href="#stats-section" className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-medium text-sm transition-all duration-200 border border-slate-700 inline-flex items-center gap-2">
              Explore Education Reality
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <button 
              onClick={handleLogVisit}
              disabled={hasLogged}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg cursor-pointer ${
                hasLogged 
                ? 'bg-slate-800 text-emerald-400 border border-emerald-900/30' 
                : 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/20 hover:scale-105 active:scale-95'
              }`}
            >
              {hasLogged ? '✓ Visit Recorded & Logged' : 'Log My Advocacy Visit'}
            </button>
          </div>
        </div>
      </div>

      {/* Official Interactive Campaign Poster Section */}
      <section className="space-y-6">
        <div className="text-center md:text-left max-w-2xl">
          <h2 className={`font-display font-black text-slate-900 dark:text-white ${getTextSizeClass('text-2xl', 1)}`}>
            SDG 4.3 Policy Advocacy Poster
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light mt-1 text-sm">
            High-fidelity interactive replica of the official <strong className="text-[#c51a2d] dark:text-rose-400">Equal Access, Brighter Futures</strong> poster advising key barriers and action plans.
          </p>
        </div>
        <CampaignPoster highContrast={highContrast} textSizeLevel={textSizeLevel} />
      </section>

      {/* Campaign Progress Counter Component */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Progress Tracker */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                  Advocacy Campaign Counter
                </span>
                <h2 className={`font-display font-extrabold text-slate-900 dark:text-white leading-none ${getTextSizeClass('text-3xl')}`}>
                  {visitorCount} <span className="text-slate-400 font-light text-xl">/ {targetGoal}+ Advocates</span>
                </h2>
              </div>
              <div className="text-right">
                <span className={`font-mono font-bold text-brand-600 dark:text-brand-400 ${getTextSizeClass('text-lg')}`}>
                  {Math.round(progressPercent)}%
                </span>
                <span className="text-xs text-slate-400 block">Goal Progress</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-brand-600 via-teal-500 to-amber-400 relative"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-pulse"></div>
              </motion.div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs">
              Every log represents a real visitor learning about tertiary educational gaps. Once we hit our target of <strong>100 active advocates</strong>, we will submit this synthesized localized telemetry showcase mock brief to SDG regional educators.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowPledgeForm(!showPledgeForm)}
                className="px-4 py-2 rounded-lg bg-brand-50 dark:bg-brand-950/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-semibold tracking-wide transition-all uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Write Custom Pledge
              </button>
              
              {!hasLogged && (
                <button
                  onClick={handleLogVisit}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold tracking-wide transition-all uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  Quick Learn Validation
                </button>
              )}
            </div>

            {/* Slide Down Pledge Form */}
            <AnimatePresence>
              {showPledgeForm && (
                <motion.form 
                  action="#"
                  onSubmit={submitPledge}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80"
                >
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Submit Your Commitment to Equal Education
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="advocate-name" className="block text-xs text-slate-500 mb-1">Your Name / Title</label>
                      <input
                        id="advocate-name"
                        type="text"
                        value={advocateName}
                        onChange={(e) => setAdvocateName(e.target.value)}
                        placeholder="e.g. Apprentice Sarah, Educator Ken"
                        className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:ring-1 focus:ring-brand-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="preset-message-select" className="block text-xs text-slate-500 mb-1">Select Preset Message (Optional)</label>
                      <select
                        id="preset-message-select"
                        onChange={(e) => setAdvocateMessage(e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:ring-1 focus:ring-brand-500 outline-none"
                      >
                        <option value="">-- Choose or write your own --</option>
                        {PRESET_MESSAGES.map((msg, i) => (
                          <option key={i} value={msg}>{msg.slice(0, 45)}...</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="custom-message" className="block text-xs text-slate-500 mb-1">Your Custom Pledge</label>
                    <textarea
                      id="custom-message"
                      value={advocateMessage}
                      onChange={(e) => setAdvocateMessage(e.target.value)}
                      placeholder="e.g. We must fund community tech hubs!"
                      rows={2}
                      className="w-full px-3 py-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-100 text-xs focus:ring-1 focus:ring-brand-500 outline-none"
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-2 text-xs">
                    <button 
                      type="button" 
                      onClick={() => setShowPledgeForm(false)} 
                      className="px-3 py-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-1.5 rounded bg-brand-600 hover:bg-brand-700 text-white font-medium cursor-pointer"
                    >
                      Record Advocacy Pledge
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Recent Pledges Feed */}
          <div className="lg:col-span-5 h-[280px] flex flex-col bg-slate-50/50 dark:bg-slate-950/20 p-4 md:p-5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block mb-3 inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Advocacy Activity
            </span>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
              {recentAdvocates.map((advocate, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm text-xs space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{advocate.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{advocate.time}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-light italic">
                    "{advocate.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Hub */}
      <section id="stats-section" className="space-y-6">
        <div className="text-center md:text-left max-w-2xl">
          <h2 className={`font-display font-extrabold text-slate-900 dark:text-white ${getTextSizeClass('text-2xl', 1)}`}>
            Global Gaps In Technical & Vocational Access
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light mt-1 text-sm">
            Sustainable Development Goal SDG Target 4.3 outlines severe global indicators showing high cost and lack of vocational frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SDG_STATISTICS.map((item) => {
            const IconComponent = item.icon;
            
            // Custom card configurations for the Vibrant Palette
            const isStat1 = item.id === 'stat-1';
            const isStat2 = item.id === 'stat-2';
            const isStat3 = item.id === 'stat-3';
            
            let cardClasses = "";
            let textClasses = "";
            let descriptionClasses = "";
            let sourceClasses = "";
            let iconContainerClasses = "";
            
            if (highContrast) {
              cardClasses = "bg-black border-2 border-yellow-400 text-yellow-400";
              textClasses = "text-yellow-400";
              descriptionClasses = "text-white";
              sourceClasses = "text-yellow-300 border-yellow-400/30";
              iconContainerClasses = "bg-yellow-400/20 text-yellow-400 border border-yellow-400/40";
            } else if (isStat1) {
              cardClasses = "bg-indigo-600 text-white shadow-xl shadow-indigo-600/15 border-none";
              textClasses = "text-white";
              descriptionClasses = "text-indigo-100";
              sourceClasses = "text-indigo-200 border-indigo-500/40";
              iconContainerClasses = "bg-indigo-700/60 text-indigo-100";
            } else if (isStat2) {
              cardClasses = "bg-emerald-600 text-white shadow-xl shadow-emerald-600/15 border-none";
              textClasses = "text-white";
              descriptionClasses = "text-emerald-50";
              sourceClasses = "text-emerald-100 border-emerald-500/40";
              iconContainerClasses = "bg-emerald-700/60 text-emerald-100";
            } else { // stat-3
              cardClasses = "bg-amber-400 text-indigo-950 shadow-xl shadow-amber-400/15 border-none";
              textClasses = "text-indigo-950";
              descriptionClasses = "text-indigo-900";
              sourceClasses = "text-indigo-800/80 border-amber-500/30";
              iconContainerClasses = "bg-amber-300 text-amber-900";
            }

            return (
              <div 
                key={item.id} 
                className={`group relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${cardClasses}`}
              >
                {!highContrast && <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>}
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${iconContainerClasses}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`font-display font-black leading-none ${textClasses} ${getTextSizeClass('text-4xl', 2)}`}>
                    {item.percentage}
                  </span>
                </div>
                
                <h3 className={`font-display font-bold mb-2 leading-snug ${textClasses} ${getTextSizeClass('text-base')}`}>
                  {item.label}
                </h3>
                
                <p className={`text-xs font-light leading-relaxed mb-4 ${descriptionClasses}`}>
                  {item.description}
                </p>
                
                <div className={`pt-3 border-t flex items-center gap-1 text-[10px] font-mono ${sourceClasses}`}>
                  <Info className="w-3 h-3 opacity-70" />
                  <span>Source: {item.source}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Digital Poster Advocacy Customizer / Showcase */}
      <section className="bg-slate-100 dark:bg-slate-950/60 p-6 md:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Showcase Control Selector Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-600 dark:text-brand-400 font-bold">
                ADVOCACY GRAPHICS
              </span>
              <h2 className={`font-display font-extrabold text-slate-900 dark:text-white leading-tight mt-1 ${getTextSizeClass('text-2xl', 1)}`}>
                Flyer Showcase & Digital Poster Customizer
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 font-light">
                Educators can customize and preview campaign posters for local notice boards. Toggle templates and edit slogans to fit regional languages and context.
              </p>
            </div>

            {/* Template Selector Card Array */}
            <div className="space-y-3">
              {ADVOCACY_POSTERS.map((poster) => (
                <button
                  key={poster.id}
                  onClick={() => {
                    setSelectedPosterId(poster.id);
                    setCustomSlogan('');
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedPosterId === poster.id 
                    ? 'bg-white dark:bg-slate-900 border-brand-500 shadow-md ring-2 ring-brand-500/10' 
                    : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/40 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 block uppercase">
                      {poster.subtitle}
                    </span>
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      {poster.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${selectedPosterId === poster.id ? 'translate-x-1 text-brand-500' : ''}`} />
                </button>
              ))}
            </div>

            {/* Interactive Customizer Tool */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 inline-flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-slate-500" />
                Customize Poster Slogan
              </span>
              <input
                id="custom-poster-slogan"
                type="text"
                placeholder={selectedPoster.slogan}
                value={customSlogan}
                onChange={(e) => setCustomSlogan(e.target.value)}
                maxLength={60}
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-150 focus:ring-1 focus:ring-brand-500 focus:bg-white outline-none font-medium"
              />
              <span className="text-[10px] text-slate-400 block font-light">
                Updates slogan in real-time on the digital showcase mock billboard poster to the right.
              </span>
            </div>
          </div>

          {/* Interactive Billboard Rendering */}
          <div className="lg:col-span-7 flex justify-center">
            <div className={`relative w-full max-w-sm rounded-2xl overflow-hidden border-4 border-slate-950 shadow-2xl bg-white dark:bg-slate-900 flex flex-col justify-between p-6 transition-all duration-300 ${colSet.glow}`}>
              
              {/* Outer metal post simulation block for billboard realism */}
              <div className="absolute top-2 right-2 flex gap-1 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-700"></span>
              </div>

              {/* Poster Layout Heading Area */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800/85 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-[9px] font-mono font-black text-slate-500 dark:text-slate-400">
                    {selectedPoster.sdgGoal}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping"></span>
                    <span className="text-[8px] font-sans font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">ADV-FLYER</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className={`text-[10px] font-mono tracking-wider uppercase font-bold ${colSet.text}`}>
                    {selectedPoster.subtitle}
                  </span>
                  <h3 className={`font-display font-black tracking-tight text-slate-900 dark:text-white leading-tight ${getTextSizeClass('text-2xl', 1)}`}>
                    {selectedPoster.title}
                  </h3>
                </div>
              </div>

              {/* Immersive Center Slogan / Large Call to Action */}
              <div className={`my-6 p-4 rounded-xl border flex flex-col justify-center min-h-[110px] transition-colors duration-300 ${colSet.bg} ${colSet.border}`}>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 font-bold block mb-1">
                  Active Slogan
                </span>
                <p className="font-display font-extrabold text-slate-950 dark:text-white text-lg tracking-tight leading-snug">
                  "{customSlogan ? customSlogan : selectedPoster.slogan}"
                </p>
                <div className="mt-3.5 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 text-[11px] text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  {selectedPoster.message}
                </div>
              </div>

              {/* Bullets Footer section */}
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 block">KEY ADVOCACY INITIATIVES</span>
                  <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-700 dark:text-slate-300">
                    {selectedPoster.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${colSet.pillBg}`}></span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/40 p-2 rounded-xl">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded bg-brand-600 flex items-center justify-center text-[10px] text-white font-mono font-bold">4</div>
                    <span className="text-[10px] font-bold text-slate-800 dark:text-slate-100">Bridge SDG Info</span>
                  </div>
                  
                  <button
                    onClick={handleSharePoster}
                    className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-white font-mono tracking-wide font-bold transition-all flex items-center gap-1 uppercase cursor-pointer"
                  >
                    {isPosterCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400 font-bold" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3" />
                        Get Poster Link
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
