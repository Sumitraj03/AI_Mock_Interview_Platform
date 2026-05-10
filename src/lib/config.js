const env = import.meta.env

export const appConfig = {
  name: 'InterviewPilot AI',
  description: 'AI mock interviews, video rooms, feedback, and analytics for frontend candidates.',
  demoUser: {
    id: 'demo-candidate',
    name: 'Aarav Sharma',
    email: 'aarav.demo@interviewpilot.ai',
    role: 'Frontend Developer',
    imageUrl: '',
  },
}

export const serviceConfig = {
  clerk: {
    publishableKey: env.VITE_CLERK_PUBLISHABLE_KEY,
    enabled: Boolean(env.VITE_CLERK_PUBLISHABLE_KEY),
  },
  supabase: {
    url: env.VITE_SUPABASE_URL,
    anonKey: env.VITE_SUPABASE_ANON_KEY,
    enabled: Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY),
  },
  ai: {
    enabled: env.VITE_ENABLE_REAL_AI === 'true',
    questionEndpoint: env.VITE_AI_QUESTION_ENDPOINT || '/api/generate-questions',
    feedbackEndpoint: env.VITE_AI_FEEDBACK_ENDPOINT || '/api/generate-feedback',
  },
  stream: {
    apiKey: env.VITE_STREAM_API_KEY,
    userToken: env.VITE_STREAM_USER_TOKEN,
    tokenEndpoint: env.VITE_STREAM_TOKEN_ENDPOINT,
    enabled: Boolean(env.VITE_STREAM_API_KEY && (env.VITE_STREAM_USER_TOKEN || env.VITE_STREAM_TOKEN_ENDPOINT)),
  },
}

export const isMockMode = {
  auth: !serviceConfig.clerk.enabled,
  database: !serviceConfig.supabase.enabled,
  ai: !serviceConfig.ai.enabled,
  video: !serviceConfig.stream.enabled,
}
