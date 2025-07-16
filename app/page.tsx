import { CTA } from '@/components/cta'
import { recentSessions } from '@/constants'
import { CompanionCard } from '@/modules/companions/ui/components/companion-card'
import { CompanionsList } from '@/modules/companions/ui/components/companions-list'

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Science"
          duration={42}
          color="#E5D0FF"
        />
        <CompanionCard
          id="234"
          name="Countsy the Number Wizard"
          topic="Derivatives & Integrals"
          subject="Maths"
          duration={42}
          color="#FFDA6E"
        />
        <CompanionCard
          id="345"
          name="Verba the Vocabulary Builder"
          topic="English Literature"
          subject="Language"
          duration={42}
          color="#BDE7FF"
        />
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />

        <CTA />
      </section>
    </main>
  )
}

export default Page
