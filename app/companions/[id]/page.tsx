import { Suspense } from 'react'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'

import {
  CompanionError,
  CompanionIdViewShell,
  CompanionLoading
} from '@/modules/companions/ui/views/companion-id-view-shell'

interface Props {
  params: Promise<{ id: string }>
}

const CompanionSession = async ({ params }: Props) => {
  const { id } = await params
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <Suspense fallback={<CompanionLoading />}>
      <ErrorBoundary fallback={<CompanionError />}>
        <CompanionIdViewShell companionId={id} />
      </ErrorBoundary>
    </Suspense>
  )
}

export default CompanionSession
