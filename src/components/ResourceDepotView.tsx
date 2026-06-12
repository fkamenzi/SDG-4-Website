import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Download, 
  Wifi, 
  WifiOff, 
  Info, 
  FileText, 
  Tag, 
  Compass, 
  Flame, 
  Check, 
  Cpu,
  MonitorCheck,
  Zap,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { ResourceItem } from '../types';

const RESOURCE_DATABASE: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Open-Source Math & Algebra Guide',
    subject: 'Higher Education Foundation',
    description: 'A comprehensive, peer-reviewed algebra and calculus syllabus tailored specifically for self-paced remote apprenticeships and engineering admissions.',
    simplifiedDescription: 'A simplified math book with practice questions, covering arithmetic up to basic calculus, specifically made for quick self-study.',
    category: 'Higher Education',
    fileSize: '4.8 MB',
    downloadCount: 341,
    tags: ['Mathematics', 'Syllabus', 'Calculus'],
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=70'
  },
  {
    id: 'res-2',
    title: 'Vocational Engineering Basics',
    subject: 'Technical Blueprinting',
    description: 'Practical introduction to architectural geometry, plumbing metrics, circuit schemas, and mechanical leverage systems. Structured with easy-to-follow worksheets.',
    simplifiedDescription: 'An easy guide to reading blueprints, basic water pipes, simple electrical lines, and tool rules.',
    category: 'Vocational',
    fileSize: '8.2 MB',
    downloadCount: 520,
    tags: ['Geometry', 'Mechanics', 'Plumbing'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=70'
  },
  {
    id: 'res-3',
    title: 'Solar Inverter Installation Manual',
    subject: 'Renewable Power Systems',
    description: 'Detailed mechanical and safety checklist for setting up solar arrays, battery backup circuits, and multi-tap load converters in off-grid situations.',
    simplifiedDescription: 'Step-by-step instructions on wiring solar panels and battery storage boxes safely in remote areas.',
    category: 'Technical',
    fileSize: '3.1 MB',
    downloadCount: 289,
    tags: ['Solar Systems', 'Safety', 'Off-grid'],
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=70'
  },
  {
    id: 'res-4',
    title: 'Cognitive Science & Fast Learning',
    subject: 'Cognitive Study Strategies',
    description: 'Scientific principles of spaced-repetition, proactive memory recall, active outlining, and stress-reduction protocols for non-traditional students.',
    simplifiedDescription: 'Easy mind exercises and simple study templates to help you memorize technical topics quicker and with less stress.',
    category: 'Higher Education',
    fileSize: '1.9 MB',
    downloadCount: 198,
    tags: ['Cognitive Study', 'Pedagogy', 'Mindset'],
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=70'
  },
  {
    id: 'res-5',
    title: 'Metal Fabrication & SMAW Welds',
    subject: 'Physical Building Trades',
    description: 'Comprehensive workbook introducing joint geometry, electrode numbering sequences, gas flow measurements, and protective posture guidelines for apprentices.',
    simplifiedDescription: 'Hands-on safety rules, simple welding charts, and core tips for merging different metals together.',
    category: 'Vocational',
    fileSize: '6.4 MB',
    downloadCount: 412,
    tags: ['Welding', 'Safety', 'Industrial'],
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70'
  },
  {
    id: 'res-6',
    title: 'Guide to Equal Technical Aid Funding',
    subject: 'Educational Advocacy',
    description: 'Policy manual explaining simple application frameworks, regional tuition grants, and non-profit micro-scholarships for technical certification applicants.',
    simplifiedDescription: 'A list of free grants, scholarships, and tips on how to apply for free technical school tuition.',
    category: 'Socio-Economic',
    fileSize: '1.2 MB',
    downloadCount: 154,
    tags: ['Scholarships', 'Grants', 'Socio-Economic'],
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=70'
  }
];

interface ResourceDepotProps {
  highContrast: boolean;
  textSizeLevel: number;
}

export default function ResourceDepotView({ highContrast, textSizeLevel }: ResourceDepotProps) {
  // Database counts in state so users can "simulate download" and increment counts
  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem('bridge_equal_ed_resources_db');
    return saved ? JSON.parse(saved) : RESOURCE_DATABASE;
  });

  // State
  const [dataSaver, setDataSaver] = useState<boolean>(() => {
    return localStorage.getItem('bridge_equal_ed_datasaver') === 'true';
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<ResourceItem | null>(null);

  useEffect(() => {
    localStorage.setItem('bridge_equal_ed_resources_db', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('bridge_equal_ed_datasaver', dataSaver.toString());
  }, [dataSaver]);

  // Handle Download simulation
  const startDownload = (id: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    setDownloadProgress(0);

    const speed = dataSaver ? 15 : 5; // dataSaver uses text-only rendering, so faster simulated loads!
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadedIds(current => [...current, id]);
          // Increment actual state count
          setResources(oldRes => oldRes.map(item => {
            if (item.id === id) {
              return { ...item, downloadCount: item.downloadCount + 1 };
            }
            return item;
          }));
          setTimeout(() => {
            setDownloadingId(null);
          }, 800);
          return 100;
        }
        return prev + speed;
      });
    }, 100);
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeCategory === 'All') return matchesSearch;
    return res.category === activeCategory && matchesSearch;
  });

  const categories = ['All', 'Technical', 'Vocational', 'Higher Education', 'Socio-Economic'];

  // Text resize modifier
  const getTextSizeClass = (base: string, modifier: number = 0) => {
    const levels = [
      ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'],
      ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'],
      ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'],
    ];
    const sizeMap: Record<string, number> = {
      'text-xs': 0, 'text-sm': 1, 'text-base': 2, 'text-lg': 3, 'text-xl': 4,
      'text-2xl': 5
    };
    const index = sizeMap[base];
    if (index === undefined) return base;
    const adjustedIndex = Math.min(levels[textSizeLevel].length - 1, Math.max(0, index + modifier));
    return levels[textSizeLevel][adjustedIndex];
  };

  return (
    <div className="space-y-8">
      
      {/* Upper Control Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
        
        {/* Banner with Data Saver Switch */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-brand-600 dark:text-brand-400">
              AFFORDABLE ACADEMIC BLUEPRINTS
            </span>
            <h2 className={`font-display font-extrabold text-slate-900 dark:text-white leading-tight ${getTextSizeClass('text-2xl')}`}>
              Resource Depot
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-light">
              Open-access curriculum cards designed for local offline storage or high-latency mobile connectivity.
            </p>
          </div>

          {/* BRUTAL DATA-SAVER BUTTON */}
          <button
            onClick={() => setDataSaver(prev => !prev)}
            className={`px-5 py-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
              dataSaver
              ? 'bg-slate-950 text-emerald-400 border-emerald-500 font-mono font-bold text-xs shadow-md shadow-emerald-950/20'
              : 'bg-emerald-50 text-emerald-800 border-emerald-500/30 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 font-bold text-xs'
            }`}
          >
            {dataSaver ? (
              <WifiOff className="w-5 h-5 text-emerald-400 animate-pulse" />
            ) : (
              <Wifi className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            )}
            <div className="text-left text-xs leading-none">
              <span className="block font-bold">
                {dataSaver ? 'DATA-SAVER ON: LIGHTWEIGHT TEXT' : 'Data-Saver Off'}
              </span>
              <span className="text-[9px] font-normal block opacity-80 mt-0.5">
                {dataSaver ? 'Images hidden • 95% data saved • Plain Text Active' : 'Show full images & deep styles'}
              </span>
            </div>
          </button>
        </div>

        {/* Categories and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-150 dark:border-slate-800/80">
          
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="resource-search"
              type="text"
              placeholder="Search syllabus books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

        </div>

      </div>

      {/* Latency and telemetry simulation banner under low-bandwidth */}
      <AnimatePresence>
        {dataSaver && (
          <motion.div 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-3 bg-emerald-950/10 border border-emerald-500/30 p-4 rounded-xl text-[11px] text-emerald-800 dark:text-emerald-400 font-mono"
          >
            <Zap className="w-4 h-4 text-emerald-500 animate-bounce shrink-0" />
            <div className="leading-normal">
              <strong>Simulating Low Bandwidth Constraints (2G Networks)</strong>. Estimated resource payload size decreased from <strong>22.5 MB to 184 KB</strong> (99.2% Bandwidth Saved). Perfect for students accessing technical curricula on limited micro-tariffs in low-income regions.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resource Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item) => {
          const isDownloaded = downloadedIds.includes(item.id);
          const isDownloadingCurr = downloadingId === item.id;
          
          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-200 border ${
                dataSaver 
                ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-300 dark:border-slate-800 text-slate-950' 
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-800 hover:shadow-md'
              }`}
            >
              {/* Image banner: ONLY rendered when data saver is toggled off */}
              {!dataSaver && (
                <div className="h-40 bg-slate-100 dark:bg-slate-950 relative overflow-hidden shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-550 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-brand-600/90 text-white text-[9px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              )}

              {/* Card Body content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  {/* Category label block (rendered as text for data-saver mode too) */}
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-extrabold text-brand-600 dark:text-brand-400">
                      {item.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      File Size: {dataSaver ? '24 KB (Text)' : item.fileSize}
                    </span>
                  </div>

                  <h3 className={`font-display font-extrabold text-slate-900 dark:text-white leading-tight ${getTextSizeClass('text-sm', 1)}`}>
                    {item.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs font-light leading-relaxed">
                    {dataSaver ? item.simplifiedDescription : item.description}
                  </p>
                </div>

                {/* Tags section */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-[9px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Performance stats & Download simulations */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-950/20 p-2.5 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-400">
                    Downloads: <span className="font-bold text-slate-800 dark:text-slate-200">{item.downloadCount}</span>
                  </div>

                  {isDownloadingCurr ? (
                    <div className="w-28 space-y-1">
                      <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-500 rounded-full transition-all duration-100" 
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] font-mono text-brand-500 block text-right">{downloadProgress}% Load</span>
                    </div>
                  ) : isDownloaded ? (
                    <button
                      onClick={() => setSelectedBook(item)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-bold tracking-wide transition-all uppercase flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      Read Text Now
                    </button>
                  ) : (
                    <button
                      onClick={() => startDownload(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-[10px] font-bold tracking-wide transition-all uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Simulate Load
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal simulator mimicking an offline e-ink/plain text ebook reader */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono uppercase bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded font-bold">
                  Syllabus Reader (Offline Simulation)
                </span>
                <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white leading-tight mt-1">
                  {selectedBook.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedBook(null)}
                className="p-1 px-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-200 text-xs font-mono border rounded hover:border-slate-300 cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>

            {/* Offline text viewport simulation */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 font-serif text-slate-800 dark:text-slate-200 text-sm leading-relaxed select-text space-y-4">
              <div className="p-4 bg-amber-50/50 dark:bg-amber-950/10 border-l-4 border-amber-500 rounded text-xs font-sans font-light italic mb-6">
                Offline Reader Active: Plain accessible typography with optimized line spacing has been applied to reduce visual load and energy consumption.
              </div>

              <h4 className="font-sans font-bold text-base border-b pb-1">CHAPTER 1: Fundamental Groundwork</h4>
              <p>
                To secure equal training pathways, individuals must approach technical topics as highly structured systems. In practical workspaces (such as mechanical repair, electronic diagnostics, or engineering geometry), rules remain constant across industrial scopes.
              </p>
              
              <p className="font-sans font-bold text-base border-b pb-1 pt-4">1.1 Core Safety Guidelines & Apparatus Principles</p>
              <p>
                Always verify equipment ground resistance. When dealing with physical metal joints, structural stability depends heavily on consistent temperatures and appropriate safety shields. Ensure that localized fume outlets are fully functioning to preserve clean breathing environments.
              </p>

              <blockquote className="p-4 bg-slate-50 dark:bg-slate-900 rounded font-mono text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Syllabus Citation Metric:<br />
                UN Target 4.3 Policy Guide - Certified Open Curriculum.<br />
                Checksum verified. Ready for local classroom printing blocks.
              </blockquote>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-mono text-[10px]">
                File saved: Local Storage Partition Cache
              </span>
              <button 
                onClick={() => setSelectedBook(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold cursor-pointer"
              >
                Done Reading
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
