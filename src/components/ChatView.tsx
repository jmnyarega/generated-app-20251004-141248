import React, { useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import { useShallow } from 'zustand/react/shallow';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { useChatManager } from '@/hooks/useChatManager';
import { Skeleton } from './ui/skeleton';
import { Bot } from 'lucide-react';
export function ChatView() {
  const { sendMessage } = useChatManager();
  const { messages, streamingMessage, isLoading, isProcessing } = useChatStore(
    useShallow((state) => ({
      messages: state.messages,
      streamingMessage: state.streamingMessage,
      isLoading: state.isLoading,
      isProcessing: state.isProcessing,
    }))
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingMessage]);
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };
  if (isLoading) {
    return (
      <div className="flex flex-col h-full p-8 space-y-4">
        <Skeleton className="h-20 w-3/4 rounded-2xl" />
        <Skeleton className="h-20 w-3/4 self-end rounded-2xl" />
        <Skeleton className="h-24 w-2/3 rounded-2xl" />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-secondary/50">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {messages.length === 0 && !isProcessing ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
        {streamingMessage && (
          <ChatMessage
            message={{
              id: 'streaming',
              role: 'assistant',
              content: streamingMessage,
              timestamp: Date.now(),
            }}
          />
        )}
        {isProcessing && !streamingMessage && (
            <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                    <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center space-x-1 pt-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
            </div>
        )}
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}