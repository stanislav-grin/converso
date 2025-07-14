import { CompanionCard } from '@/components/companion-card'
import { CompanionsList } from '@/components/companions-list'
import { CTA } from '@/components/cta'

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
        <CompanionsList />
        <CTA />
      </section>
    </main>
  )
}

export default Page
