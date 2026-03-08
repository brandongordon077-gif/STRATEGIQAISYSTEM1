import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Copy, Check, Image as ImageIcon, Type as TextIcon, Sparkles } from 'lucide-react';
import { Tool } from '../constants';
import { generateToolResponse } from '../services/geminiService';

interface ToolInterfaceProps {
  tool: Tool;
  onClose: () => void;
}

export const ToolInterface: React.FC<ToolInterfaceProps> = ({ tool, onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: string; data: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const prompt = tool.promptTemplate.replace('{input}', input);
      const isImage = tool.category === 'Images';
      const response = await generateToolResponse('gemini-3-flash-preview', prompt, isImage);
      setResult(response as any);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.data) {
      navigator.clipboard.writeText(result.data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl glass rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-bottom border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{tool.icon}</span>
            <div>
              <h2 className="text-xl font-display font-bold">{tool.name}</h2>
              <p className="text-sm text-white/50">{tool.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Check className="w-6 h-6 rotate-45" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-white/40">Input Prompt</label>
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you want to create..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[120px] focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className="absolute bottom-4 right-4 bg-white text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">Result</label>
                  {result.type === 'text' && (
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy Text'}
                    </button>
                  )}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[200px]">
                  {result.type === 'image' ? (
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src={result.data}
                        alt="Generated content"
                        className="max-w-full rounded-xl shadow-2xl"
                        referrerPolicy="no-referrer"
                      />
                      <a
                        href={result.data}
                        download={`strategiqai-${tool.id}.png`}
                        className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                      >
                        Download Image
                      </a>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap font-sans leading-relaxed text-white/90">
                      {result.data}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
