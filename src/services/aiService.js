import { apiClient } from './apiClient.js'
import { mockFeedback, mockQuestions } from './mockData.js'
import { serviceConfig } from '../lib/config.js'

function wait(ms = 700) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function filterMockQuestions({ category, difficulty, type }) {
  const filtered = mockQuestions.filter((question) => {
    const categoryMatch = category === 'All' || question.category === category
    const difficultyMatch = difficulty === 'All' || question.difficulty === difficulty
    const typeMatch = type === 'All' || question.type === type
    return categoryMatch && difficultyMatch && typeMatch
  })

  return filtered.length ? filtered : mockQuestions
}

export async function generateQuestions(payload) {
  if (serviceConfig.ai.enabled) {
    try {
      const response = await apiClient.post(serviceConfig.ai.questionEndpoint, payload)
      return response.data.questions
    } catch (error) {
      if (error.response?.data?.questions) return error.response.data.questions
      throw error
    }
  }

  await wait()
  return filterMockQuestions(payload).map((question, index) => ({
    ...question,
    id: `${question.id}-${payload.difficulty}-${index}-${Date.now()}`,
  }))
}

export async function generateFeedback(payload) {
  if (serviceConfig.ai.enabled) {
    try {
      const response = await apiClient.post(serviceConfig.ai.feedbackEndpoint, payload)
      return response.data.feedback
    } catch (error) {
      if (error.response?.data?.feedback) return error.response.data.feedback
      throw error
    }
  }

  await wait(900)
  const transcriptLength = payload.transcript?.trim().length || 0
  const scoreBoost = transcriptLength > 500 ? 4 : transcriptLength > 200 ? 2 : 0
  return {
    ...mockFeedback,
    score: Math.min(mockFeedback.score + scoreBoost, 96),
    verdict: transcriptLength
      ? 'Mock AI analyzed your transcript and found a strong foundation with a few clear polish points.'
      : mockFeedback.verdict,
  }
}
