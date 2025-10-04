import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/store/chatStore';
import { useShallow } from 'zustand/react/shallow';
import { useChatManager } from '@/hooks/useChatManager';
import { cn } from '@/lib/utils';
import { ApiKeyDisclaimer } from './ApiKeyDisclaimer';
export function SessionSidebar() {
  const { sessions, currentSessionId, isLoading } = useChatStore(
    useShallow((state) => ({
      sessions: state.sessions,
      currentSessionId: state.currentSessionId,
      isLoading: state.isLoading,
    }))
  );
  const { createNewSession, switchSession, deleteSession, updateSessionTitle: renameSession } = useChatManager();
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingSessionId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingSessionId]);

  const handleRename = (sessionId: string) => {
    if (newTitle.trim() && newTitle.trim() !== sessions.find(s => s.id === sessionId)?.title) {
      renameSession(sessionId, newTitle.trim());
    }
    setEditingSessionId(null);
    setNewTitle('');
  };

  return (
    <div className="flex flex-col h-full bg-background p-4 border-r">
      <div className="flex items-center justify-between pb-4 border-b mb-4">
        <h1 className="text-2xl font-display text-primary">CogniCanvas</h1>
        <Button
          onClick={createNewSession}
          size="sm"
          className="rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 -mx-4">
        <div className="px-4 space-y-2">
          <AnimatePresence>
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors duration-200',
                  currentSessionId === session.id
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-secondary'
                )}
                onClick={() => switchSession(session.id)}
              >
                <div className="flex items-center gap-3 truncate">
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  {editingSessionId === session.id ? (
                    <input
                      ref={inputRef}
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onBlur={() => handleRename(session.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(session.id);
                        if (e.key === 'Escape') {
                          setEditingSessionId(null);
                          setNewTitle('');
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-transparent border border-primary/50 rounded-md px-1 py-0 text-sm font-medium w-full focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  ) : (
                    <span className="truncate text-sm font-medium">{session.title}</span>
                  )}
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingSessionId(session.id);
                      setNewTitle(session.title);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
      <div className="pt-4 mt-auto">
        <ApiKeyDisclaimer />
      </div>
    </div>
  );
}