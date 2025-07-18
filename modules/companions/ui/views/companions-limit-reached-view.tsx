import Image from 'next/image'
import Link from 'next/link'

export const CompanionsLimitReachedView = () => {
  return (
    <article className="companion-limit">
      <Image src="/images/limit.svg" alt="Companion limit reached" width={360} height={230} />
      <div className="cta-badge">
        Upgrade your plan
      </div>

      <h1>You&apos;ve Reached Your Limit</h1>
      <p>You&apos;ve reached your companion limit. Upgrade to create more companions and premium features.</p>
      <Link href="/subscription" className="btn-primary w-full justify-center">
        Upgrade My Plan
      </Link>
    </article>
  )
}