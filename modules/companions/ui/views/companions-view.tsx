import { getSubjectColor } from '@/lib/utils'

import { CompanionCard } from '@/modules/companions/ui/components/companion-card'
import { SearchInput } from '@/modules/companions/ui/components/search-input'
import { SubjectFilter } from '@/modules/companions/ui/components/subject-filter'

interface Props {
  companions: Companion[]
}

export const CompanionsView = ({ companions }: Props) => {
  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>

      <section className="companions-grid">
        {companions.map(companion => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  )
}