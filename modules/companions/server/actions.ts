'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

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
  const { userId } = await auth()

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

  if (!userId) {
    return companions
  }

  const companionIds = companions.map(({ id }) => id)

  const { data: bookmarks } = await supabase
    .from('bookmarked_companions')
    .select()
    .eq('user_id', userId)
    .in('companion_id', companionIds)

  const marks = new Set(bookmarks?.map(({ companion_id }) => companion_id))

  companions.forEach((companion) => {
    companion.bookmarked = marks.has(companion.id)
  })

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
  const { userId, isAuthenticated } = await auth()

  if (!isAuthenticated) {
    return []
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId)
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


export const getBookmarkedCompanions = async (userId: string, limit = 10) => {
  const { userId: author, isAuthenticated } = await auth()

  if (!isAuthenticated || author !== userId) {
    throw new Error('Authentication failed')
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('bookmarked_companions')
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(error.message || 'Failed to fetch bookmarked companions')
  }

  return data.map(({ companions }) => companions)
}

export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth()

  if (!userId) return

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('bookmarked_companions')
    .insert({
      companion_id: companionId,
      user_id: userId,
    })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(path)

  return data
}

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth()

  if (!userId) return

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('bookmarked_companions')
    .delete()
    .eq('companion_id', companionId)
    .eq('user_id', userId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(path)

  return data
}
export const newCompanionPermissions = async () => {
  const { userId, has, isAuthenticated } = await auth()
  const supabase = createSupabaseClient()

  if (!isAuthenticated || !userId) {
    return false
  }

  let limit = 0

  if (has({ plan: 'pro' })) {
    return true
  } else if (has({ feature: '3_companions_limit' })) {
    limit = 3
  } else if (has({ feature: '10_companions_limit' })) {
    limit = 10
  }

  const { data, error } = await supabase
    .from('companions')
    .select('id', { count: 'exact' })
    .eq('author', userId)

  if (error) {
    throw new Error(error.message)
  }

  const companionCount = data?.length

  return companionCount < limit
}
