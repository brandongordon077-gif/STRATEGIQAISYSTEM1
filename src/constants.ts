import { Type } from "@google/genai";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  promptTemplate: string;
  responseSchema?: any;
}

export type ToolCategory = 'Writing' | 'Images' | 'Video' | 'Business' | 'Creative';

export const TOOLS: Tool[] = [
  // Writing
  {
    id: 'blog-post',
    name: 'Blog Post Generator',
    description: 'Generate high-quality blog posts on any topic.',
    category: 'Writing',
    icon: '✍️',
    promptTemplate: 'Write a comprehensive blog post about: {input}. Include an introduction, subheadings, and a conclusion.'
  },
  {
    id: 'email-writer',
    name: 'Professional Email',
    description: 'Draft professional emails for any situation.',
    category: 'Writing',
    icon: '📧',
    promptTemplate: 'Draft a professional email regarding: {input}. Tone: Professional and clear.'
  },
  {
    id: 'grammar-fixer',
    name: 'Grammar & Style Fixer',
    description: 'Polish your writing for clarity and correctness.',
    category: 'Writing',
    icon: '✨',
    promptTemplate: 'Correct the grammar and improve the style of the following text: {input}'
  },
  // Images
  {
    id: 'image-gen',
    name: 'AI Image Generator',
    description: 'Create stunning visuals from text descriptions.',
    category: 'Images',
    icon: '🎨',
    promptTemplate: '{input}'
  },
  {
    id: 'logo-designer',
    name: 'Logo Concept Creator',
    description: 'Generate creative logo concepts for your brand.',
    category: 'Images',
    icon: '🎯',
    promptTemplate: 'Create a logo concept for: {input}. Describe the visual elements, colors, and typography.'
  },
  // Video
  {
    id: 'video-script',
    name: 'YouTube Script Writer',
    description: 'Create engaging scripts for your video content.',
    category: 'Video',
    icon: '🎬',
    promptTemplate: 'Write a YouTube video script for: {input}. Include timestamps and visual cues.'
  },
  {
    id: 'tiktok-ideas',
    name: 'Viral TikTok Ideas',
    description: 'Get trending ideas for your short-form videos.',
    category: 'Video',
    icon: '📱',
    promptTemplate: 'Generate 5 viral TikTok ideas for: {input}'
  },
  // Business
  {
    id: 'business-plan',
    name: 'Business Plan Pro',
    description: 'Draft a detailed business plan in minutes.',
    category: 'Business',
    icon: '💼',
    promptTemplate: 'Create a detailed business plan for a startup called: {input}. Include executive summary, market analysis, and revenue model.'
  },
  {
    id: 'swot-analysis',
    name: 'SWOT Analysis',
    description: 'Analyze your business strengths and weaknesses.',
    category: 'Business',
    icon: '📊',
    promptTemplate: 'Perform a SWOT analysis for: {input}'
  },
  // Creative
  {
    id: 'story-writer',
    name: 'Creative Storyteller',
    description: 'Write imaginative stories and narratives.',
    category: 'Creative',
    icon: '🎭',
    promptTemplate: 'Write a creative story about: {input}'
  },
  {
    id: 'song-lyrics',
    name: 'Song Lyricist',
    description: 'Compose lyrics for your next musical project.',
    category: 'Creative',
    icon: '🎵',
    promptTemplate: 'Write song lyrics for a song about: {input}'
  }
];

export const CATEGORIES: { name: ToolCategory; count: number; icon: string }[] = [
  { name: 'Writing', count: 40, icon: '✍️' },
  { name: 'Images', count: 15, icon: '🎨' },
  { name: 'Video', count: 20, icon: '🎬' },
  { name: 'Business', count: 16, icon: '💼' },
  { name: 'Creative', count: 14, icon: '🎭' },
];
