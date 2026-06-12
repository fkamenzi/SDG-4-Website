import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Settings, 
  MapPin, 
  HelpCircle, 
  Users, 
  GraduationCap, 
  DollarSign, 
  Globe, 
  Sparkles,
  TrendingUp, 
  CheckCircle, 
  Info, 
  ArrowRight,
  Eye,
  Volume2,
  Wrench,
  Search,
  Check,
  Scale
} from 'lucide-react';

interface CampaignPosterProps {
  highContrast: boolean;
  textSizeLevel: number;
}

export default function CampaignPoster({ highContrast, textSizeLevel }: CampaignPosterProps) {
  // Support state for simplifying the vocabulary of the poster in real-time
  const [usePlainLanguage, setUsePlainLanguage] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [spokenSection, setSpokenSection] = useState<string | null>(null);

  // Helper for text sizing levels
  const getPosterTextLevel = (base: string, modifier: number = 0) => {
    const levels = [
      ['text-[10px]', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'],
      ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'],
      ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl'],
    ];
    const sizeMap: Record<string, number> = {
      'text-[10px]': 0, 'text-xs': 1, 'text-sm': 2, 'text-base': 3, 'text-lg': 4,
      'text-xl': 5, 'text-[#1e3a8a] text-2xl': 6, 'text-3xl': 7, 'text-4xl': 8, 'text-5xl': 9
    };
    const index = sizeMap[base] ?? 3;
    const adjustedIndex = Math.min(levels[textSizeLevel].length - 1, Math.max(0, index + modifier));
    return levels[textSizeLevel][adjustedIndex];
  };

  // Simplified terminology mapping for learners or people with cognitive diversity
  const t = (originalText: string, simpleText: string) => {
    return usePlainLanguage ? simpleText : originalText;
  };

  // Text-to-speech support representation
  const handleSpeak = (textToSpeak: string, sectionId: string) => {
    if ('speechSynthesis' in window) {
      if (spokenSection === sectionId) {
        window.speechSynthesis.cancel();
        setSpokenSection(null);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onend = () => setSpokenSection(null);
        window.speechSynthesis.speak(utterance);
        setSpokenSection(sectionId);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Controls Bar for the Poster */}
      <div className={`p-4 rounded-2xl flex flex-wrap justify-between items-center gap-4 border transition-colors ${
        highContrast 
        ? 'bg-black border-yellow-400 text-yellow-400' 
        : 'bg-indigo-950 border-indigo-900 text-white shadow-md'
      }`} id="poster-controls-bar">
        <div className="flex items-center gap-2.5">
          <Eye className={`w-5 h-5 ${highContrast ? 'text-yellow-400' : 'text-emerald-400'}`} />
          <div>
            <span className="font-display font-bold text-xs uppercase block tracking-wider leading-none">
              Interactive SDG Poster Assistant
            </span>
            <span className={`text-[10px] block mt-1 font-light ${highContrast ? 'text-yellow-350' : 'text-indigo-200'}`}>
              Customize rendering settings for simplified terminology, high contrast, and screen readers.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Simple Terminology Switcher */}
          <button
            onClick={() => setUsePlainLanguage(prev => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-150 border cursor-pointer inline-flex items-center gap-1.5 ${
              usePlainLanguage
              ? highContrast
                ? 'bg-yellow-400 text-black border-yellow-400'
                : 'bg-amber-400 border-amber-300 text-indigo-950 shadow'
              : highContrast
                ? 'bg-black text-yellow-450 border-yellow-400/50 hover:bg-yellow-400/10'
                : 'bg-indigo-900/40 border-indigo-800 text-indigo-100 hover:bg-indigo-905'
            }`}
            title="Translates complex academic jargon into clear, plain words"
          >
            {usePlainLanguage ? '✓ Plain Words On' : 'Simplify Jargon'}
          </button>

          {/* Quick instructions indicator */}
          <span className={`text-[10px] font-mono py-1.5 px-2.5 rounded-lg border flex items-center gap-1 bg-black/20 ${
            highContrast ? 'border-yellow-400/40 text-yellow-350' : 'border-indigo-800/80 text-indigo-300'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Hover sections to zoom / read aloud
          </span>
        </div>
      </div>

      {/* Main Poster Layout Container (Formatted to match portrait printed layout) */}
      <div 
        className={`w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all border-4 ${
          highContrast 
          ? 'bg-black border-yellow-400 text-yellow-400 shadow-yellow-400/5' 
          : 'bg-white border-slate-900 text-slate-900 shadow-slate-900/30'
        }`}
        id="sdg-poster-board"
      >
        {/* POSTER SECTION 1: HEADER BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b-4 border-slate-950">
          {/* Left Red Block */}
          <div className="md:col-span-3 bg-[#c51a2d] p-6 text-white flex flex-col justify-between min-h-[140px] items-center text-center">
            <div className="flex items-center gap-2 md:flex-col md:gap-1.5">
              <span className="font-display font-black text-4xl block leading-none">4</span>
              <span className="font-sans font-bold text-xs uppercase tracking-wider block">
                Quality Education
              </span>
            </div>
            
            {/* White SVG Icon representing book + pen pencil concept */}
            <div className="my-2 p-3.5 border-2 border-white rounded-xl bg-white/10 hidden md:block">
              <BookOpen className="w-10 h-10 text-white" />
            </div>

            <div className="font-mono text-sm tracking-widest font-black bg-black/25 px-3 py-1 rounded">
              SDG 4.3
            </div>
          </div>

          {/* Right Text Block */}
          <div className="md:col-span-9 p-6 md:p-8 flex flex-col justify-center bg-white text-[#1e1b4b] space-y-2">
            <h1 className="font-display font-black text-3xl md:text-5xl leading-none tracking-tight text-[#111827]">
              EQUAL ACCESS,
              <br />
              <span className="text-[#c51a2d]">BRIGHTER FUTURES</span>
            </h1>
            
            <p className="font-display font-bold text-[#475569] text-sm md:text-lg leading-snug">
              {t(
                "Quality Technical, Vocational and Tertiary Education for All Women and Men by 2030",
                "Fair opportunities for everyone to get affordable high-quality vocational certificates and university degrees by 2030"
              )}
            </p>

            <span className="font-sans text-xs md:text-sm text-[#475569] block font-light">
              讓每一個人都有負擔得起且優質的技職與高等教育機會
            </span>
          </div>
        </div>

        {/* POSTER SECTION 2: PHOTOS ROW & TARGET 4.3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-slate-950">
          {/* Illustrated/Simulated Students Row (5 columns conceptually) */}
          <div className="md:col-span-7 bg-[#f8fafc] grid grid-cols-5 p-2 gap-2 border-r-2 border-slate-950">
            {/* Person 1 (Wrench Operator/Technician) */}
            <div className="bg-slate-200 rounded-xl p-2 flex flex-col justify-between items-center text-center aspect-[3/4] relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-all"></div>
              <Wrench className="w-8 h-8 text-indigo-950 mt-4" />
              <span className="text-[9px] font-bold uppercase tracking-tight text-indigo-950 leading-tight">
                Vocational Training
              </span>
            </div>

            {/* Person 2 (Engineer working on electricity) */}
            <div className="bg-slate-200 rounded-xl p-2 flex flex-col justify-between items-center text-center aspect-[3/4] relative overflow-hidden group">
              <div className="absolute inset-0 bg-yellow-900/5 group-hover:bg-transparent transition-all"></div>
              <Settings className="w-8 h-8 text-indigo-950 mt-4 animate-spin-slow" />
              <span className="text-[9px] font-bold uppercase tracking-tight text-indigo-950 leading-tight">
                Industry Apprentice
              </span>
            </div>

            {/* Person 3 (Student studying with laptop) */}
            <div className="bg-slate-200 rounded-xl p-2 flex flex-col justify-between items-center text-center aspect-[3/4] relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-900/5 group-hover:bg-transparent transition-all"></div>
              <BookOpen className="w-8 h-8 text-indigo-950 mt-4" />
              <span className="text-[9px] font-bold uppercase tracking-tight text-indigo-950 leading-tight">
                Tech Studies
              </span>
            </div>

            {/* Person 4 (Lab researcher with gear) */}
            <div className="bg-slate-200 rounded-xl p-2 flex flex-col justify-between items-center text-center aspect-[3/4] relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-900/5 group-hover:bg-transparent transition-all"></div>
              <Sparkles className="w-8 h-8 text-indigo-950 mt-4" />
              <span className="text-[9px] font-bold uppercase tracking-tight text-indigo-950 leading-tight">
                Scientific Lab
              </span>
            </div>

            {/* Person 5 (Graduate / Scholar student layout) */}
            <div className="bg-slate-200 rounded-xl p-2 flex flex-col justify-between items-center text-center aspect-[3/4] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#c51a2d]/5 group-hover:bg-transparent transition-all"></div>
              <GraduationCap className="w-8 h-8 text-indigo-950 mt-4" />
              <span className="text-[9px] font-bold uppercase tracking-tight text-indigo-950 leading-tight">
                University Path
              </span>
            </div>
          </div>

          {/* SDG Color Circle Wheel & Description Box */}
          <div className="md:col-span-5 bg-[#002f6c] p-6 text-white flex flex-col justify-center space-y-3 relative">
            <div className="flex items-center gap-3">
              {/* Spinning Colorful UN SDG Sector Pattern */}
              <div className="w-12 h-12 rounded-full border-2 border-white relative overflow-hidden shrink-0 flex items-center justify-center bg-radial from-white/20 to-transparent">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-rainbow"></div>
                <Globe className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              
              <div>
                <span className="font-mono text-xs text-amber-300 font-black tracking-widest block uppercase">
                  Target 4.3
                </span>
                <span className="font-display font-black text-lg block leading-none">
                  Universal Education Access
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-100 leading-relaxed font-light">
              {t(
                "By 2030, ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education, including university.",
                "By 2030, make sure all adult women and men can easily afford and access great technical schools, vocational workshops, and university courses."
              )}
            </p>
          </div>
        </div>

        {/* POSTER SECTION 3: THE THREE MAIN ADVOCACY COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-950">
          
          {/* Column 1: ISSUE INTRODUCTION */}
          <div 
            onMouseEnter={() => setHighlightedSection('issue')}
            onMouseLeave={() => setHighlightedSection(null)}
            className={`p-6 transition-all duration-300 relative ${
              highlightedSection === 'issue' 
                ? 'bg-emerald-50/70 dark:bg-emerald-950/20 scale-[1.01] z-10 shadow-lg' 
                : 'bg-[#f4fcf7] text-slate-900'
            }`}
            id="poster-panel-issue"
          >
            {/* Top Green Accent bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#10b981]"></div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex py-1 px-2.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono tracking-widest uppercase font-extrabold border border-emerald-300/40">
                1. Issue Introduction
              </span>
              <button 
                onClick={() => handleSpeak(
                  "Education is a powerful driver of sustainable development. Millions still lack equal access. Globally, 250 million youth are out of school.", 
                  'issue'
                )}
                className="p-1 rounded-full hover:bg-emerald-200 text-emerald-800 cursor-pointer"
                title="Speak text aloud"
              >
                <Volume2 className={`w-4 h-4 ${spokenSection === 'issue' ? 'animate-bounce text-emerald-600' : ''}`} />
              </button>
            </div>

            <h3 className="font-display font-extrabold text-emerald-900 text-sm uppercase tracking-wide mb-3">
              (Why It Matters)
            </h3>

            <p className="text-xs font-light leading-relaxed mb-4 text-emerald-950">
              {t(
                "Education is a powerful driver of sustainable development. However, millions of people still lack equal access to affordable and quality technical, vocational and tertiary education.",
                "Good education changes lives and strengthens society. But millions of students are still locked out of technical colleges and universities because of costs and obstacles."
              )}
            </p>

            <ul className="space-y-3 mb-4">
              <li className="flex gap-2 text-xs font-light leading-relaxed text-emerald-900">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0 mt-1.5"></span>
                <span>
                  <strong>Globally:</strong> {t("250 million youth are out of school, and 103 million lack basic literacy skills. (UNESCO, 2023)", "About 250 million young people do not go to school at all, and 103 million cannot read or write.")}
                </span>
              </li>
              <li className="flex gap-2 text-xs font-light leading-relaxed text-emerald-900">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0 mt-1.5"></span>
                <span>
                  <strong>In Taiwan:</strong> {t("Students from low-income or rural families face barriers such as high tuition, limited resources, and unequal opportunities.", "Students in countryside villages or from disadvantaged homes struggle with high tuition prices, poor school tools, and fewer chances.")}
                </span>
              </li>
            </ul>

            <div className="p-3 bg-white rounded-xl border border-emerald-200/50 text-[#0f5132] font-semibold text-xs leading-relaxed tracking-tight shadow-sm mt-4">
              {t(
                "Ensuring inclusive and equitable education (SDG 4.3) is essential for social justice, economic growth, and a sustainable future.",
                "Fair school systems are necessary for giving everyone equal treatment, creating strong local jobs, and building a peaceful society."
              )}
            </div>
          </div>

          {/* Column 2: PROBLEM DISCOVERY */}
          <div 
            onMouseEnter={() => setHighlightedSection('problem')}
            onMouseLeave={() => setHighlightedSection(null)}
            className={`p-6 transition-all duration-300 relative ${
              highlightedSection === 'problem' 
                ? 'bg-amber-50/70 dark:bg-amber-955/20 scale-[1.01] z-10 shadow-lg' 
                : 'bg-[#fffcf4] text-slate-900'
            }`}
            id="poster-panel-problem"
          >
            {/* Top Orange Accent bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#f59e0b]"></div>

            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex py-1 px-2.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono tracking-widest uppercase font-extrabold border border-amber-305/40">
                2. Problem Discovery
              </span>
              <button 
                onClick={() => handleSpeak(
                  "Despite progress, people encounter economic barriers, geographic inequality, gender gap, information gap, and learning quality gap.", 
                  'problem'
                )}
                className="p-1 rounded-full hover:bg-amber-200 text-amber-800 cursor-pointer"
                title="Speak text aloud"
              >
                <Volume2 className={`w-4 h-4 ${spokenSection === 'problem' ? 'animate-bounce text-amber-600' : ''}`} />
              </button>
            </div>

            <h3 className="font-display font-extrabold text-amber-900 text-sm uppercase tracking-wide mb-3">
              (What We Observed)
            </h3>

            <p className="text-xs font-light leading-relaxed mb-4 text-emerald-950">
              {t(
                "Despite progress, many people still encounter significant barriers to accessing quality education.",
                "Even though schools are getting better, people in remote sectors still run into enormous real-world roadblocks."
              )}
            </p>

            <div className="space-y-3.5">
              {/* Barrier 1 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-sm">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-xs text-amber-900">Economic Barriers</span>
                </div>
                <p className="text-[11px] font-light text-slate-700 leading-normal pl-7">
                  {t("High tuition and living costs prevent many from continuing their education.", "Expensive fees and living costs force families to drop out after primary school.")}
                </p>
              </div>

              {/* Barrier 2 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-sm">
                    <MapPin className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-xs text-amber-900 font-sans">Geographic Inequality</span>
                </div>
                <p className="text-[11px] font-light text-slate-700 leading-normal pl-7">
                  {t("Rural and remote areas lack quality schools and training resources.", "Remote fields or mountain villages do not have local trade centers or modern teachers.")}
                </p>
              </div>

              {/* Barrier 3 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-sm">
                    <Scale className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-xs text-amber-900">Gender Gap</span>
                </div>
                <p className="text-[11px] font-light text-slate-700 leading-normal pl-7">
                  {t("Women and girls face stereotypes, safety concerns, and less support in STEM fields.", "Social expectations, safety risks, and low encouragement keep women out of tech courses.")}
                </p>
              </div>

              {/* Barrier 4 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-sm">
                    <HelpCircle className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-xs text-amber-900 font-sans">Information Gap</span>
                </div>
                <p className="text-[11px] font-light text-slate-700 leading-normal pl-7">
                  {t("Lack of information and guidance leads to missed opportunities.", "Students do not know about active scholarships or local apprenticeships because of no guidance counseling.")}
                </p>
              </div>

              {/* Barrier 5 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-sm">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-xs text-amber-900">Learning Quality Gap</span>
                </div>
                <p className="text-[11px] font-light text-slate-700 leading-normal pl-7">
                  {t("Unequal teaching and outdated curricula limit students' future readiness.", "Low-quality teaching styles and old textbooks prepare students for jobs that no longer exist.")}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: CREATIVE SOLUTIONS */}
          <div 
            onMouseEnter={() => setHighlightedSection('solution')}
            onMouseLeave={() => setHighlightedSection(null)}
            className={`p-6 transition-all duration-300 relative ${
              highlightedSection === 'solution' 
                ? 'bg-blue-50/70 dark:bg-blue-956/20 scale-[1.01] z-10 shadow-lg' 
                : 'bg-[#f4f7fc] text-slate-900'
            }`}
            id="poster-panel-solution"
          >
            {/* Top Blue Accent bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>

            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex py-1 px-2.5 rounded bg-blue-100 text-blue-800 text-[10px] font-mono tracking-widest uppercase font-extrabold border border-blue-305/40">
                3. Creative Solutions
              </span>
              <button 
                onClick={() => handleSpeak(
                  "We propose a five step solution. Affordable education, expand infrastructure, empower women, career guidance, and quality improvement.", 
                  'solution'
                )}
                className="p-1 rounded-full hover:bg-blue-200 text-blue-800 cursor-pointer"
                title="Speak text aloud"
              >
                <Volume2 className={`w-4 h-4 ${spokenSection === 'solution' ? 'animate-bounce text-blue-600' : ''}`} />
              </button>
            </div>

            <h3 className="font-display font-extrabold text-blue-900 text-sm uppercase tracking-wide mb-3">
              (Our Action Plan)
            </h3>

            <p className="text-xs font-light leading-relaxed mb-4 text-[#1e1b4b]">
              {t(
                "We propose a 5-STEP SOLUTION to promote equal access to affordable and quality technical, vocational and tertiary education for all.",
                "Here is our clear 5-STEP PLAN to create cheap, high-quality, fair technical and college paths."
              )}
            </p>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-xs text-blue-950 font-sans">
                    Affordable Education for All
                  </h4>
                  <p className="text-[10px] font-light text-slate-700 leading-normal">
                    {t("Provide scholarships, tuition subsidies and low-interest loans for disadvantaged students.", "Create free scholarships, cash grants, and easy-to-pay federal loans for families in need.")}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-xs text-blue-950">
                    Expand Access & Infrastructure
                  </h4>
                  <p className="text-[10px] font-light text-slate-700 leading-normal">
                    {t("Improve schools and internet access in rural areas; build more training centers.", "Build steady internet structures and high-tech workshops in distant countryside schools.")}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-xs text-blue-950">
                    Empower Girls & Women
                  </h4>
                  <p className="text-[10px] font-light text-slate-700 leading-normal">
                    {t("Offer mentorship, safe environments, and scholarships for girls in STEM.", "Offer female mentorship circles, protect learning labs, and subsidize engineering entry.")}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-xs text-blue-950">
                    Career Guidance & Awareness
                  </h4>
                  <p className="text-[10px] font-light text-slate-700 leading-normal">
                    {t("Strengthen career counseling to help students make informed choices.", "Establish friendly local job counselors to match kids with appropriate apprenticeships.")}
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-0.5">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-xs text-blue-950">
                    Quality Improvement & Innovation
                  </h4>
                  <p className="text-[10px] font-light text-slate-700 leading-normal">
                    {t("Update curricula, train teachers, and promote school-industry digital partnerships.", "Upgrade syllabus content, train modern coaches, and link workshops directly to tech jobs.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* POSTER SECTION 4: EXPECTED IMPACT & TRANSFORM LIVES PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-950 border-t-2 border-slate-950">
          
          {/* Left Block: 4. EXPECTED IMPACT */}
          <div className="p-6 bg-[#f5f3ff] relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#8b5cf6]"></div>
            
            <span className="inline-flex py-1 px-2.5 rounded bg-purple-100 text-purple-800 text-[10px] font-mono tracking-widest uppercase font-extrabold border border-purple-300/40 mb-3">
              4. Expected Impact
            </span>

            <h3 className="font-display font-extrabold text-purple-900 text-xs uppercase tracking-wide mb-4">
              (The Positive Change We Envision)
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Impact 1 */}
              <div className="space-y-1">
                <span className="font-bold text-xs text-purple-950 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  Inclusive Society
                </span>
                <p className="text-[10px] text-slate-600 leading-relaxed font-light">
                  {t("Everyone has equal opportunities to learn and grow.", "All human beings get a steady shot at real training.")}
                </p>
              </div>

              {/* Impact 2 */}
              <div className="space-y-1">
                <span className="font-bold text-xs text-purple-950 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  Stronger Economy
                </span>
                <p className="text-[10px] text-slate-600 leading-relaxed font-light">
                  {t("A skilled workforce drives innovation and growth.", "Smart, trained workers start local shops and make jobs.")}
                </p>
              </div>

              {/* Impact 3 */}
              <div className="space-y-1">
                <span className="font-bold text-xs text-purple-950 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  Empowered People
                </span>
                <p className="text-[10px] text-slate-600 leading-relaxed font-light">
                  {t("Education builds confidence and independence.", "Apprentices gain self-pride, solid income, and life freedom.")}
                </p>
              </div>

              {/* Impact 4 */}
              <div className="space-y-1">
                <span className="font-bold text-xs text-purple-950 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  Sustainable Future
                </span>
                <p className="text-[10px] text-slate-600 leading-relaxed font-light">
                  {t("Quality education creates a better world.", "Communities remain healthy and preserve assets safely.")}
                </p>
              </div>
            </div>

            {/* Simulated background illustration block of sky and human shapes from poster bottom */}
            <div className="mt-6 h-12 bg-gradient-to-t from-slate-100 to-transparent flex items-end justify-center gap-1 overflow-hidden rounded-lg">
              <span className="w-6 h-8 bg-purple-300 rounded-t-full opacity-40"></span>
              <span className="w-6 h-10 bg-purple-400 rounded-t-full opacity-60"></span>
              <span className="w-6 h-12 bg-purple-500 rounded-t-full opacity-80"></span>
              <span className="w-6 h-10 bg-purple-400 rounded-t-full opacity-60"></span>
              <span className="w-6 h-8 bg-purple-300 rounded-t-full opacity-40"></span>
            </div>
          </div>

          {/* Right Block: EDUCATION TRANSFORMS LIVES */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between space-y-4">
            <div className="p-4 border-2 border-dashed border-[#c51a2d]/40 rounded-2xl bg-white text-center space-y-2">
              <span className="font-display font-black text-[#c51a2d] text-base block tracking-tight">
                Education transforms lives.
              </span>
              <span className="font-display font-extrabold text-indigo-950 text-xs block leading-tight">
                Equal access transforms the world.
              </span>
              <p className="text-[11px] text-[#475569] leading-relaxed font-light">
                Let's work together to make SDG 4.3 a reality by 2030!
              </p>
            </div>

            {/* 4 grid callout boxes */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-center font-bold">
              <div className="p-2 border border-slate-200 bg-white rounded-lg shadow-sm text-slate-800">
                ❤️ Leave No One Behind
              </div>
              <div className="p-2 border border-slate-200 bg-white rounded-lg shadow-sm text-slate-800">
                🤝 Invest Today, Empower Tomorrow
              </div>
              <div className="p-2 border border-slate-200 bg-white rounded-lg shadow-sm text-slate-800">
                🎓 Learn, Skill Up, Lead
              </div>
              <div className="p-2 border border-slate-200 bg-white rounded-lg shadow-sm text-slate-800">
                🌍 Sustainable Tomorrow
              </div>
            </div>
          </div>
        </div>

        {/* POSTER SECTION 5: QUOTE STRIP */}
        <div className="bg-[#0f766e] p-4 text-center text-white font-serif italic text-xs md:text-sm tracking-wide border-t-2 border-slate-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-teal-400/20"></div>
          "{t(
            "Education is the most powerful weapon which you can use to change the world.",
            "Learning is the strongest tool you can find to build a beautiful, friendly world."
          )}" 
          <span className="font-sans text-[10px] font-bold tracking-widest block uppercase mt-1 text-teal-200">
            — Nelson Mandela
          </span>
        </div>

        {/* POSTER FOOTER: SOURCES & QR CODE MOCK */}
        <div className="p-4 bg-white text-slate-500 overflow-hidden text-[9px] flex flex-wrap justify-between items-center gap-4 border-t-2 border-slate-950">
          <div className="space-y-1">
            <span className="font-bold text-slate-705 uppercase block">Sources & Studies:</span>
            <ul className="list-disc pl-3.5 space-y-0.5">
              <li>UNESCO (2023). Global Education Monitoring Report 2023.</li>
              <li>Ministry of Education, Taiwan (2023). Local Education Statistics.</li>
              <li>United Nations. Sustainable Development Goals Official Guidance.</li>
            </ul>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
            {/* Mock QR Code in CSS */}
            <div className="w-8 h-8 border-2 border-slate-700 bg-indigo-950 relative flex items-center justify-center p-1 shrink-0">
              <div className="w-full h-full bg-checkerboard"></div>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">SCAN OR CLICK</span>
              <span className="text-slate-400 block lowercase text-[8px]">about sdg 4.3!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
