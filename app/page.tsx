import { getSubjectColor } from '@/lib/utils'

import { CTA } from '@/components/cta'
import { getCompanions, getRecentSessions } from '@/modules/companions/server/actions'
import { CompanionCard } from '@/modules/companions/ui/components/companion-card'
import { CompanionsList } from '@/modules/companions/ui/components/companions-list'

const Page = async () => {
  const [companions, recentSessionsCompanions] = await Promise.all([
    getCompanions({ limit: 3 }),
    getRecentSessions(10)
  ])

  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        {companions.map((companion: Companion) => (
          <CompanionCard
            key={companion.$id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />

        <CTA />
      </section>
    </main>
  )
}

export default Page
