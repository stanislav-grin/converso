import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { getCompanion } from '@/modules/companions/server/actions'

import { CompanionIdView } from './companion-id-view'

interface Props {
  companionId: string
}

export const CompanionIdViewShell = async ({ companionId }: Props) => {
  const [companion, user] = await Promise.all([
    getCompanion(companionId),
    currentUser()
  ])

  if (!user) {
    redirect('/sign-in')
  }

  if (!companion) {
    redirect('/companions')
  }

  return (
    <CompanionIdView companion={companion} user={ user } />
  )
}

export const CompanionLoading = () => (
  <LoadingState
    title="Loading Companion..."
    description="It may take a while..."
  />
)

export const CompanionError = () => (
  <ErrorState
    title="Error loading Companion"
    description="Something went wrong :( Please try again!"
  />
)