'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey', authRequired: true },
]

export const NavItems = () => {
  const pathname = usePathname()
  const { isSignedIn } = useAuth()

  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, href, authRequired }) => {
        if (authRequired && !isSignedIn) {
          return null
        }

        return (
          <Link href={href} key={href} className={cn(pathname === href && 'text-primary font-semibold')}>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
