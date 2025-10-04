import { useEffect, useCallback } from 'react';
import { useChatStore } from '@/store/chatStore';
import { chatService } from '@/lib/chat';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
export function useChatManager() {
  const {
    setCurrentSessionId,
    setSessions,
    addSession,
    updateSession: updateSessionInStore,
    deleteSession: deleteSessionFromStore,
    setMessages,
    addMessage,
    appendStreamingMessage,
    setStreamingMessage,
    setIsLoading,
    setIsProcessing,
    clearChat,
  } = useChatStore();
  const { currentSessionId, sessions } = useChatStore(
    useShallow((state) => ({
      currentSessionId: state.currentSessionId,
      sessions: state.sessions,
    }))
  );
  const switchSession = useCallback(async (sessionId: string) => {
    if (sessionId === currentSessionId) return;
    setIsLoading(true);
    chatService.switchSession(sessionId);
    setCurrentSessionId(sessionId);
    clearChat();
    const res = await chatService.getMessages();
    if (res.success && res.data) {
      setMessages(res.data.messages);
    } else {
      toast.error('Failed to load messages for this session.');
    }
    setIsLoading(false);
  }, [currentSessionId, setIsLoading, setCurrentSessionId, setMessages, clearChat]);
  const createNewSession = useCallback(async () => {
    setIsLoading(true);
    chatService.newSession();
    const newSessionId = chatService.getSessionId();
    const res = await chatService.createSession(undefined, newSessionId);
    if (res.success && res.data) {
      addSession({
        id: res.data.sessionId,
        title: res.data.title,
        createdAt: Date.now(),
        lastActive: Date.now(),
      });
      setCurrentSessionId(res.data.sessionId);
      clearChat();
    } else {
      toast.error('Failed to create a new session.');
    }
    setIsLoading(false);
  }, [setIsLoading, addSession, setCurrentSessionId, clearChat]);
  const initialize = useCallback(async () => {
    setIsLoading(true);
    const res = await chatService.listSessions();
    if (res.success && res.data) {
      setSessions(res.data);
      if (res.data.length > 0) {
        const latestSessionId = res.data[0].id;
        await switchSession(latestSessionId);
      } else {
        await createNewSession();
      }
    } else {
      toast.error('Failed to load sessions.');
      await createNewSession();
    }
    setIsLoading(false);
  }, [setIsLoading, setSessions, switchSession, createNewSession]);
  useEffect(() => {
    initialize();
  }, [initialize]);
  const deleteSession = useCallback(async (sessionId: string) => {
    const res = await chatService.deleteSession(sessionId);
    if (res.success) {
      deleteSessionFromStore(sessionId);
      toast.success('Session deleted.');
      if (currentSessionId === sessionId) {
        const nextSession = sessions.find(s => s.id !== sessionId);
        if (nextSession) {
          await switchSession(nextSession.id);
        } else {
          await createNewSession();
        }
      }
    } else {
      toast.error('Failed to delete session.');
    }
  }, [currentSessionId, sessions, deleteSessionFromStore, switchSession, createNewSession]);
  const updateSessionTitle = useCallback(async (sessionId: string, newTitle: string) => {
    const res = await chatService.updateSessionTitle(sessionId, newTitle);
    if (res.success) {
      updateSessionInStore(sessionId, { title: newTitle });
      toast.success('Session title updated.');
    } else {
      toast.error('Failed to update session title.');
    }
  }, [updateSessionInStore]);
  const sendMessage = useCallback(async (message: string) => {
    if (!currentSessionId) {
      toast.error('No active session.');
      return;
    }
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content: message,
      timestamp: Date.now(),
    };
    addMessage(userMessage);
    setIsProcessing(true);
    setStreamingMessage('');
    // If it's the first message, create a session on the backend
    const currentSession = sessions.find(s => s.id === currentSessionId);
    const isNewSession = currentSession && currentSession.title.startsWith('Chat');
    if (isNewSession) {
        await chatService.createSession(undefined, currentSessionId, message);
        const res = await chatService.listSessions();
        if (res.success && res.data) setSessions(res.data);
    }
    await chatService.sendMessage(message, undefined, (chunk) => {
      appendStreamingMessage(chunk);
    });
    const res = await chatService.getMessages();
    if (res.success && res.data) {
      setMessages(res.data.messages);
    }
    setStreamingMessage(null);
    setIsProcessing(false);
  }, [currentSessionId, sessions, addMessage, setIsProcessing, setStreamingMessage, appendStreamingMessage, setMessages, setSessions]);
  return {
    createNewSession,
    switchSession,
    deleteSession,
    updateSessionTitle,
    sendMessage,
  };
}