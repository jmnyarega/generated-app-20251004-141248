import { motion } from 'framer-motion';
import { Bot, Lightbulb, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}
const suggestions = [
  "What can you do?",
  "Explain quantum computing simply",
  "Write a poem about Cloudflare",
  "Plan a 3-day trip to Tokyo",
];
export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        className="relative mb-8"
      >
        <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-accent animate-pulse" />
        <Lightbulb className="absolute -bottom-4 -left-4 w-8 h-8 text-primary animate-pulse delay-500" />
        <div className="p-6 bg-primary/10 rounded-full">
          <div className="p-5 bg-primary/20 rounded-full">
            <Bot className="w-20 h-20 text-primary" />
          </div>
        </div>
      </motion.div>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-4xl font-display mb-4"
      >
        Welcome to CogniCanvas
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-muted-foreground max-w-md mb-8"
      >
        Your illustrative AI companion. How can I help you create something amazing today?
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {suggestions.map((s, i) => (
          <Button
            key={i}
            variant="outline"
            size="sm"
            className="rounded-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-accent/20"
            onClick={() => onSuggestionClick(s)}
          >
            {s}
          </Button>
        ))}
      </motion.div>
    </div>
  );
}