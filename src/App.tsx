import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ArrowRight, 
  Play, 
  Zap, 
  Globe, 
  Shield, 
  Cpu, 
  Menu, 
  X,
  ChevronRight,
  ExternalLink,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { TOOLS, CATEGORIES, Tool, ToolCategory } from './constants';
import { ToolInterface } from './components/ToolInterface';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Zap className="text-black w-6 h-6 fill-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold tracking-tighter leading-none">StrategiqAI</span>
              <span className="text-[7px] font-mono uppercase tracking-widest text-white/40 mt-1">Strategic Intelligence Architectures™️</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#tools" className="hover:text-white transition-colors">Tools</a>
            <a href="#categories" className="hover:text-white transition-colors">Categories</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <button className="bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-white/90 transition-all">
              Get Started
            </button>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 glass pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-display font-bold">
              <a href="#tools" onClick={() => setIsMenuOpen(false)}>Tools</a>
              <a href="#categories" onClick={() => setIsMenuOpen(false)}>Categories</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <button className="bg-white text-black px-6 py-4 rounded-2xl text-lg">
                Get Started
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-mono mb-8"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              105+ AI TOOLS LIVE NOW
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[0.9]"
            >
              One Platform.<br />
              <span className="text-white/40">Infinite Possibilities.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              The world's most powerful free AI toolkit. Generate content, images, video scripts, business plans, and more — all powered by cutting-edge AI, completely free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="#tools" className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                Explore All 105+ Tools
                <ArrowRight className="w-5 h-5" />
              </a>
              <button className="w-full sm:w-auto glass px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                <Play className="w-5 h-5 fill-white" />
                Watch Demo
              </button>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-20 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`p-6 rounded-3xl border transition-all text-left group ${
                    selectedCategory === cat.name 
                    ? 'bg-white border-white text-black' 
                    : 'bg-white/5 border-white/10 text-white hover:border-white/30'
                  }`}
                >
                  <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <h3 className="font-display font-bold text-lg">{cat.name}</h3>
                  <p className={`text-sm ${selectedCategory === cat.name ? 'text-black/60' : 'text-white/40'}`}>
                    {cat.count} Tools
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div>
                <h2 className="text-4xl font-display font-bold mb-2">AI Toolkit</h2>
                <p className="text-white/50">Browse our collection of specialized AI tools.</p>
              </div>
              
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredTools.map((tool) => (
                  <motion.div
                    layout
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass p-6 rounded-3xl hover:border-white/30 transition-all group cursor-pointer"
                    onClick={() => setActiveTool(tool)}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <div className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/40">
                        {tool.category}
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-white transition-colors">{tool.name}</h3>
                    <p className="text-white/50 text-sm mb-6 line-clamp-2">{tool.description}</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                      Launch Tool
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="py-20 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <Cpu className="text-emerald-500 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-bold">Cutting-Edge Models</h3>
                <p className="text-white/50 leading-relaxed">Powered by the latest Gemini 3.1 Pro and Flash models for unmatched speed and intelligence.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <Shield className="text-blue-500 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-bold">Privacy First</h3>
                <p className="text-white/50 leading-relaxed">Your data is never used for training. We prioritize security and user privacy in every interaction.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Globe className="text-purple-500 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-bold">Global Access</h3>
                <p className="text-white/50 leading-relaxed">Available worldwide, 24/7. Our mission is to democratize access to high-end AI tools.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Zap className="text-black w-5 h-5 fill-black" />
                </div>
                <span className="text-xl font-display font-bold tracking-tighter">StrategiqAI</span>
              </div>
              <p className="text-white/40 max-w-sm">
                Empowering creators, entrepreneurs, and businesses with the world's most comprehensive AI toolkit.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">All Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing (Free)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/30 uppercase tracking-widest">
            <p>© 2026 StrategiqAI — All Rights Reserved</p>
            <p>Built by Brandon Gordon © — Strategic Intelligence Architectures™️</p>
          </div>
        </div>
      </footer>

      {/* Tool Modal */}
      <AnimatePresence>
        {activeTool && (
          <ToolInterface 
            tool={activeTool} 
            onClose={() => setActiveTool(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
