import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockFeedback, mockQuestions, sessions } from '../services/mockData.js'

export const useInterviewStore = create(
  persist(
    (set, get) => ({
      generatedQuestions: mockQuestions,
      savedQuestions: [],
      sessions,
      feedback: mockFeedback,
      activeRoom: null,
      setGeneratedQuestions: (generatedQuestions) => set({ generatedQuestions }),
      saveQuestion: (question) =>
        set((state) => {
          if (state.savedQuestions.some((item) => item.id === question.id)) return state
          return { savedQuestions: [question, ...state.savedQuestions] }
        }),
      setFeedback: (feedback) => set({ feedback }),
      startRoom: (room) => set({ activeRoom: room }),
      endRoom: () => set({ activeRoom: null }),
      addSession: (session) =>
        set((state) => ({
          sessions: [
            {
              id: `sess-${Date.now()}`,
              date: new Date().toISOString().slice(0, 10),
              ...session,
            },
            ...state.sessions,
          ],
        })),
      averageScore: () => {
        const list = get().sessions
        if (!list.length) return 0
        return Math.round(list.reduce((sum, session) => sum + session.score, 0) / list.length)
      },
    }),
    {
      name: 'interviewpilot_interviews',
      partialize: (state) => ({
        generatedQuestions: state.generatedQuestions,
        savedQuestions: state.savedQuestions,
        sessions: state.sessions,
        feedback: state.feedback,
      }),
    },
  ),
)
