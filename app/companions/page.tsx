import { Suspense } from 'react'

import type { SearchParams } from 'nuqs'
import { ErrorBoundary } from 'react-error-boundary'

import { CompanionsLoading, CompanionsError, CompanionsShell } from '@/modules/companions/ui/views/companions-shell'

interface Props {
  searchParams: Promise<SearchParams>
}

const CompanionsLibrary = async ({ searchParams }: Props) => {
  return (
    <Suspense fallback={<CompanionsLoading />}>
      <ErrorBoundary fallback={<CompanionsError />}>
        <CompanionsShell searchParams={searchParams} />
      </ErrorBoundary>
    </Suspense>
  )
}

export default CompanionsLibrary
