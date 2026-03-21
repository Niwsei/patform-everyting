import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'host'
  time: string
}

export interface ChatSession {
  id: string
  hostName: string
  hostAvatar: string
  propertyTitle: string
  messages: Message[]
}

interface ChatState {
  sessions: ChatSession[]
  addMessage: (sessionId: string, message: Omit<Message, 'id' | 'time'>) => void
  getOrCreateSession: (hostName: string, hostAvatar: string, propertyTitle: string) => string
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [],
      getOrCreateSession: (hostName, hostAvatar, propertyTitle) => {
        const existing = get().sessions.find(s => s.hostName === hostName && s.propertyTitle === propertyTitle)
        if (existing) return existing.id

        const newId = Math.random().toString(36).substring(7)
        const newSession: ChatSession = {
          id: newId,
          hostName,
          hostAvatar,
          propertyTitle,
          messages: [
            { id: '1', text: `สวัสดีครับ ยินดีที่สนใจ ${propertyTitle} นะครับ มีคำถามส่วนไหนสอบถามได้เลยครับ`, sender: 'host', time: 'เมื่อสักครู่' }
          ]
        }
        set(state => ({ sessions: [newSession, ...state.sessions] }))
        return newId
      },
      addMessage: (sessionId, msg) => set(state => ({
        sessions: state.sessions.map(s => s.id === sessionId ? {
          ...s,
          messages: [...s.messages, { ...msg, id: Date.now().toString(), time: 'เมื่อสักครู่' }]
        } : s)
      }))
    }),
    { name: 'vte-nest-chats' }
  )
)
