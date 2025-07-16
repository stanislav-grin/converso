import type { SearchParams } from 'nuqs'

import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { loadSearchParams } from '@/modules/companions/params'
import { getCompanions } from '@/modules/companions/server/actions'
import { CompanionsView } from '@/modules/companions/ui/views/companions-view'

interface Props {
  searchParams: Promise<SearchParams>
}

export const CompanionsShell = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams)
  const { subject, topic } = filters

  const companions = await getCompanions({ subject, topic })

  return (
    <CompanionsView companions={companions} />
  )
}

export const CompanionsLoading = () => (
  <LoadingState
    title="Loading Companions..."
    description="It may take a while..."
  />
)

export const CompanionsError = () => (
  <ErrorState
    title="Error loading Companions"
    description="Something went wrong :( Please try again!"
  />
)