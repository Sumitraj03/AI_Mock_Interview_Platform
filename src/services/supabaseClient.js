import { createClient } from '@supabase/supabase-js'
import { serviceConfig } from '../lib/config.js'

export const supabase = serviceConfig.supabase.enabled
  ? createClient(serviceConfig.supabase.url, serviceConfig.supabase.anonKey)
  : null

export async function persistInterviewSession(session) {
  if (!supabase) {
    return { data: session, error: null, mocked: true }
  }

  const { data, error } = await supabase.from('interview_sessions').insert(session).select().single()
  return { data, error, mocked: false }
}

export async function fetchInterviewSessions(userId) {
  if (!supabase) {
    return { data: [], error: null, mocked: true }
  }

  const { data, error } = await supabase
    .from('interview_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error, mocked: false }
}
