/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart2, 
  Cpu, 
  FolderOpen, 
  BookMarked, 
  Sun, 
  Moon, 
  Eye, 
  Type, 
  Menu, 
  X, 
  Info, 
  Sparkles, 
  Heart,
  HelpCircle,
  Globe2
} from 'lucide-react';

import { ViewType } from './types';
import DashboardView from './components/DashboardView';
import AISandboxView from './components/AISandboxView';
import ResourceDepotView from './components/ResourceDepotView';
import AboutView from './components/AboutView';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    const saved = localStorage.getItem('bridge_equal_ed_view');
    return (saved as ViewType) || 'dashboard';
  });

  // Theme Manager State: 'light' | 'dark' | 'high-contrast'
  const [appTheme, setAppTheme] = useState<'light' | 'dark' | 'contrast'>(() => {
    const saved = localStorage.getItem('bridge_equal_ed_theme');
    return (saved as 'light' | 'dark' | 'contrast') || 'dark'; // Slate dark is the beautiful default
  });

  // Text Size Scale Level: 0 = Standard, 1 = Large, 2 = Extra Large
  const [textSizeLevel, setTextSizeLevel] = useState<number>(() => {
    const saved = localStorage.getItem('bridge_equal_ed_textsize');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('bridge_equal_ed_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('bridge_equal_ed_theme', appTheme);
    // Inject body classes
    const rootEl = document.documentElement;
    rootEl.classList.remove('dark', 'high-contrast-mode');
    if (appTheme === 'dark') {
      rootEl.classList.add('dark');
    } else if (appTheme === 'contrast') {
      rootEl.classList.add('dark', 'high-contrast-mode');
    }
  }, [appTheme]);

  useEffect(() => {
    localStorage.setItem('bridge_equal_ed_textsize', textSizeLevel.toString());
  }, [textSizeLevel]);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Contrast switch label helper
  const rotateTheme = () => {
    if (appTheme === 'light') setAppTheme('dark');
    else if (appTheme === 'dark') setAppTheme('contrast');
    else setAppTheme('light');
  };

  const getThemeIcon = () => {
    switch (appTheme) {
      case 'light': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'contrast': return <Eye className="w-4 h-4 text-yellow-400" />;
      default: return <Moon className="w-4 h-4 text-blue-400" />;
    }
  };

  const getThemeText = () => {
    switch (appTheme) {
      case 'light': return 'Light';
      case 'contrast': return 'High-Contrast';
      default: return 'Slate Dark';
    }
  };

  // Navigation details
  const NAVIGATION_ITEMS = [
    { id: 'dashboard', label: 'Dashboard / Awareness', icon: BarChart2, desc: 'Educational gaps & Advocacy poster sandbox' },
    { id: 'sandbox', label: 'AI Agent Sandbox', icon: Cpu, desc: 'Simplified Plain Language study bot' },
    { id: 'resources', label: 'Resource Depot', icon: FolderOpen, desc: 'Open-access syllabus & Data-saver grids' },
    { id: 'about', label: 'About & Target 4.3', icon: BookMarked, desc: 'Information system goals & Milestones' },
  ];

  // Global Dynamic text sizing modifier
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
    <div className={`min-h-screen transition-colors duration-300 ${
      appTheme === 'contrast'
      ? 'bg-black text-white hover-theme-contrast font-sans selection:bg-yellow-400 selection:text-black'
      : appTheme === 'dark'
        ? 'bg-slate-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white'
        : 'bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white'
    }`}>
      
      {/* Dynamic Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b flex items-center justify-between px-4 md:px-8 py-4 transition-colors duration-300 ${
        appTheme === 'contrast'
        ? 'bg-black border-yellow-400 text-yellow-400'
        : appTheme === 'dark'
          ? 'bg-slate-950/80 border-slate-900 text-white'
          : 'bg-white/80 border-slate-200 text-slate-900'
      }`}>
        
        {/* Brand Logo & Info */}
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl flex items-center justify-center transition-colors ${
            appTheme === 'contrast' 
            ? 'bg-yellow-400 text-black' 
            : 'bg-brand-600 text-white'
          }`}>
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <span className={`font-display font-black tracking-tight leading-none block ${getTextSizeClass('text-base')}`}>
              Bridge to Equal Ed
            </span>
            <span className="text-[10px] font-mono opacity-80 block tracking-wider mt-0.5 uppercase">
              UN SDG Target 4.3 Initiative
            </span>
          </div>
        </div>

        {/* Accessibility & Visual Adjusters Area */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Text Size Scale Cycle */}
          <div className="flex items-center gap-1 bg-slate-100/10 dark:bg-slate-900/40 border border-slate-200/20 px-2 py-1 rounded-lg">
            <Type className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-mono text-slate-400 mr-2">FONT SIZE</span>
            {[0, 1, 2].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setTextSizeLevel(lvl)}
                className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono transition-all cursor-pointer ${
                  textSizeLevel === lvl
                  ? appTheme === 'contrast'
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'bg-brand-600 text-white font-bold'
                  : 'hover:bg-slate-100/20 text-slate-400'
                }`}
              >
                {lvl === 0 ? 'A' : lvl === 1 ? 'A+' : 'A++'}
              </button>
            ))}
          </div>

          {/* Theme Rotation Button */}
          <button
            onClick={rotateTheme}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
              appTheme === 'contrast'
              ? 'border-yellow-400 bg-yellow-400/10 hover:bg-yellow-400 hover:text-black text-yellow-400'
              : 'border-slate-200/20 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-150'
            }`}
          >
            {getThemeIcon()}
            <span>Theme: {getThemeText()}</span>
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={rotateTheme}
            className="p-2 border border-slate-200/20 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs"
            title="Switch Access Contrast"
          >
            {getThemeIcon()}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-slate-200/20 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Main Structural Body layout */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(110vh-80px)]">
        
        {/* Sticky Sidebar Navigation Desktop */}
        <aside className={`hidden lg:block lg:col-span-3 p-6 border-r space-y-8 select-none transition-colors duration-300 ${
          appTheme === 'contrast'
          ? 'border-yellow-400/40 bg-black text-white'
          : 'border-indigo-900 bg-indigo-950 text-indigo-100'
        }`}>
          
          <div className="space-y-1.5">
            <span className={`text-[10px] uppercase font-mono tracking-widest font-bold block ${
              appTheme === 'contrast' ? 'text-yellow-400' : 'text-emerald-400'
            }`}>
              Core Navigation
            </span>
            <p className={`text-[11px] font-light ${
              appTheme === 'contrast' ? 'text-slate-300' : 'text-indigo-350'
            }`}>
              Toggle views to test awareness posters, simplified AI assistant text mode, or network save grids.
            </p>
          </div>

          <nav className="space-y-2">
            {NAVIGATION_ITEMS.map((item) => {
              const NavIcon = item.icon;
              const isSelected = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleViewChange(item.id as ViewType)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 border flex items-start gap-4 cursor-pointer outline-none focus-ring ${
                    isSelected
                    ? appTheme === 'contrast'
                      ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-bold'
                      : 'bg-indigo-800/80 border-indigo-700/80 text-white shadow-lg shadow-indigo-950/20 font-bold'
                    : appTheme === 'contrast'
                      ? 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900'
                      : 'border-transparent text-indigo-300/80 hover:text-white hover:bg-indigo-900/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${
                    isSelected 
                    ? appTheme === 'contrast' ? 'bg-yellow-400 text-black' : 'bg-emerald-400 text-indigo-950 font-bold'
                    : appTheme === 'contrast' ? 'bg-slate-900 text-slate-400' : 'bg-indigo-900/60 text-indigo-300'
                  }`}>
                    <NavIcon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs tracking-wide block flex items-center gap-1.5">
                      {item.label}
                      {isSelected && appTheme !== 'contrast' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      )}
                    </span>
                    <span className={`text-[10px] block font-light leading-snug ${
                      isSelected 
                      ? 'text-white/80' 
                      : appTheme === 'contrast' ? 'text-slate-400' : 'text-indigo-350'
                    }`}>
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Quick-Accessibility Help Widget in Sidebar */}
          <div className={`p-4 rounded-2xl space-y-3 border ${
            appTheme === 'contrast'
            ? 'bg-black border-yellow-400/40 text-yellow-400'
            : 'bg-indigo-900/40 border-indigo-800/80 text-indigo-200'
          }`}>
            <span className={`text-[10px] uppercase font-mono tracking-wider font-extrabold block inline-flex items-center gap-1 ${
              appTheme === 'contrast' ? 'text-yellow-400' : 'text-emerald-400'
            }`}>
              <Eye className="w-3.5 h-3.5" />
              Universal Inclusion
            </span>
            <p className={`text-[11px] leading-normal font-light ${
              appTheme === 'contrast' ? 'text-slate-300' : 'text-indigo-350'
            }`}>
              This sandbox includes high-contrast levels, text amplifiers, simplified chatbot terminology, and 2G connectivity savers. Perfect for universal literacy design patterns.
            </p>
          </div>
        </aside>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`lg:hidden fixed left-0 right-0 top-[77px] p-6 border-b shadow-2xl z-30 flex flex-col gap-6 transition-all ${
                appTheme === 'contrast'
                ? 'bg-black border-yellow-400 text-yellow-400'
                : appTheme === 'dark'
                  ? 'bg-slate-950 border-slate-900'
                  : 'bg-white border-slate-100'
              }`}
            >
              <div className="space-y-3">
                <span className="text-xs uppercase font-mono text-slate-400">SELECT VIEW</span>
                <div className="grid grid-cols-1 gap-2">
                  {NAVIGATION_ITEMS.map((item) => {
                    const NavIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleViewChange(item.id as ViewType)}
                        className={`p-3.5 rounded-xl text-left border flex items-center gap-3 transition-colors ${
                          currentView === item.id
                          ? appTheme === 'contrast'
                            ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-bold'
                            : 'bg-brand-600 border-brand-700 text-white font-bold'
                          : 'bg-slate-50/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 border-transparent'
                        }`}
                      >
                        <NavIcon className="w-4 h-4 shrink-0" />
                        <span className="text-xs">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile text adjust controls */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono text-slate-400 block">Accessibility Configurations</span>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-xl">
                  <span className="text-xs text-slate-500 font-medium">Text Scale level</span>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setTextSizeLevel(lvl)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold border transition-all ${
                          textSizeLevel === lvl
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'bg-white dark:bg-slate-950 text-slate-400'
                        }`}
                      >
                        {lvl === 0 ? 'A' : lvl === 1 ? 'A+' : 'A++'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actionable Sub-View container */}
        <main className={`lg:col-span-9 p-4 md:p-8 space-y-12 transition-all ${
          textSizeLevel === 1 
          ? 'prose-xl' 
          : textSizeLevel === 2 
            ? 'prose-2xl' 
            : 'prose-base'
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {currentView === 'dashboard' && (
                <DashboardView highContrast={appTheme === 'contrast'} textSizeLevel={textSizeLevel} />
              )}
              {currentView === 'sandbox' && (
                <AISandboxView highContrast={appTheme === 'contrast'} textSizeLevel={textSizeLevel} />
              )}
              {currentView === 'resources' && (
                <ResourceDepotView highContrast={appTheme === 'contrast'} textSizeLevel={textSizeLevel} />
              )}
              {currentView === 'about' && (
                <AboutView highContrast={appTheme === 'contrast'} textSizeLevel={textSizeLevel} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

      {/* Footer bar */}
      <footer className={`py-8 px-4 text-center border-t text-xs font-mono tracking-wide transition-colors duration-300 ${
        appTheme === 'contrast'
        ? 'bg-black border-yellow-400/40 text-yellow-400'
        : appTheme === 'dark'
          ? 'bg-slate-950 border-slate-900 text-slate-500'
          : 'bg-white border-slate-100 text-slate-400'
      }`}>
        <p>© 2026 Bridge to Equal Ed. Synthesized SDG Advocacy Sandbox Platform.</p>
        <p className="mt-1 opacity-70">Built with React, Vite & Tailwind CSS v4 | Compliance Goal 4.3 Universal Access.</p>
      </footer>
    </div>
  );
}
