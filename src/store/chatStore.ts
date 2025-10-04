import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Message, SessionInfo } from '../../worker/types';
export type ChatStore = {
  sessions: SessionInfo[];
  currentSessionId: string | null;
  messages: Message[];
  streamingMessage: string | null;
  isLoading: boolean;
  isProcessing: boolean;
  error: string | null;
  // Actions
  setSessions: (sessions: SessionInfo[]) => void;
  addSession: (session: SessionInfo) => void;
  updateSession: (session: SessionInfo) => void;
  deleteSession: (sessionId: string) => void;
  setCurrentSessionId: (sessionId: string | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setStreamingMessage: (content: string | null) => void;
  appendStreamingMessage: (chunk: string) => void;
  setIsLoading: (loading: boolean) => void;
  setIsProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
};
export const useChatStore = create<ChatStore>()(
  immer((set) => ({
    sessions: [],
    currentSessionId: null,
    messages: [],
    streamingMessage: null,
    isLoading: true,
    isProcessing: false,
    error: null,
    setSessions: (sessions) => set({ sessions }),
    addSession: (session) => {
      set((state) => {
        state.sessions.unshift(session);
      });
    },
    deleteSession: (sessionId) => {
      set((state) => {
        state.sessions = state.sessions.filter((s) => s.id !== sessionId);
      });
    },
    updateSession: (session) => {
      set((state) => {
        const index = state.sessions.findIndex((s) => s.id === session.id);
        if (index !== -1) {
          state.sessions[index] = session;
        }
      });
    },
    setCurrentSessionId: (sessionId) => set({ currentSessionId: sessionId }),
    setMessages: (messages) => set({ messages }),
    addMessage: (message) => {
      set((state) => {
        state.messages.push(message);
      });
    },
    setStreamingMessage: (content) => set({ streamingMessage: content }),
    appendStreamingMessage: (chunk) => {
      set((state) => {
        state.streamingMessage = (state.streamingMessage || '') + chunk;
      });
    },
    setIsLoading: (loading) => set({ isLoading: loading }),
    setIsProcessing: (processing) => set({ isProcessing: processing }),
    setError: (error) => set({ error }),
    clearChat: () => set({ messages: [], streamingMessage: null, error: null }),
  }))
);