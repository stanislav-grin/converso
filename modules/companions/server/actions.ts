'use server'

import { auth } from '@clerk/nextjs/server'

import { createSupabaseClient } from '@/lib/supabase'

import { DEFAULT_PAGE } from '@/constants'

export const createCompanion = async (
  formData: CreateCompanion,
): Promise<Companion> => {
  const { userId: author, isAuthenticated } = await auth()

  if (!isAuthenticated) {
    throw new Error('Authentication failed')
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select()

  if (error || !data) {
    throw new Error(error.message || 'Failed to create a companion')
  }

  return data[0]
}

export const getCompanions = async ({
  limit = 10,
  page = DEFAULT_PAGE,
  subject,
  topic,
}: GetAllCompanions): Promise<Companion[]> => {
  const supabase = createSupabaseClient()

  let query = supabase.from('companions').select()

  if (subject && topic) {
    query = query
      .ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`)
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  }

  query = query.range((page - 1) * limit, page * limit - 1)

  const { data: companions, error } = await query

  if (error) {
    throw new Error(error.message || 'Failed to fetch companions')
  }

  return companions
}

export const getCompanion = async (id: string) => {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    throw new Error('Authentication failed')
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('id', id)

  if (error || !data) {
    throw new Error(error.message || 'Failed to fetch companion')
  }

  return data[0]
}

export const addToSessionHistory = async (companionId: string) => {
  const { userId, isAuthenticated } = await auth()

  if (!isAuthenticated) {
    throw new Error('Authentication failed')
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('session_history')
    .insert({
      companion_id: companionId,
      user_id: userId,
    })

  if (error) {
    throw new Error(error.message || 'Failed to add session to history')
  }

  return data
}

export const getRecentSessions = async (limit = 10) => {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    throw new Error('Authentication failed')
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(error.message || 'Failed to fetch recent sessions')
  }

  return data.map(({ companions }) => companions)
}

export const getUserSessions = async (userId: string, limit = 10) => {
  const { userId: author, isAuthenticated } = await auth()

  if (!isAuthenticated || author !== userId) {
    throw new Error('Authentication failed')
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(error.message || 'Failed to fetch user sessions')
  }

  return data.map(({ companions }) => companions)
}

export const getUserCompanions = async (userId: string) => {
  const { userId: author, isAuthenticated } = await auth()

  if (!isAuthenticated || author !== userId) {
    throw new Error('Authentication failed')
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('author', userId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

