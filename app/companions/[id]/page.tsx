import { Suspense } from 'react'

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

  return (
    <Suspense fallback={<CompanionLoading />}>
      <ErrorBoundary fallback={<CompanionError />}>
        <CompanionIdViewShell companionId={id} />
      </ErrorBoundary>
    </Suspense>
  )
}

export default CompanionSession
