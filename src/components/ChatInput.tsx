import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStore } from '@/store/chatStore';
interface ChatInputProps {
  onSendMessage: (message: string) => void;
}
export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState('');
  const isProcessing = useChatStore((state) => state.isProcessing);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    onSendMessage(input.trim());
    setInput('');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-end gap-2 p-4 bg-background/80 backdrop-blur-sm border-t"
    >
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask CogniCanvas anything..."
        className="flex-1 resize-none rounded-2xl shadow-lg border-2 border-transparent focus:border-primary transition-all duration-300 max-h-48"
        rows={1}
        disabled={isProcessing}
      />
      <Button
        type="submit"
        size="icon"
        className="w-12 h-12 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:bg-muted disabled:cursor-not-allowed"
        disabled={!input.trim() || isProcessing}
      >
        <motion.div
          key={isProcessing ? 'loading' : 'send'}
          initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
        >
          <Send className="w-6 h-6" />
        </motion.div>
      </Button>
      <div className="absolute bottom-1 right-20 text-xs text-muted-foreground hidden md:flex items-center gap-1">
        <CornerDownLeft className="w-3 h-3" />
        <span>to send</span>
      </div>
    </form>
  );
}