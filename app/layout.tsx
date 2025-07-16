import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Navbar } from '@/components/navbar'

import './globals.css'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Converso',
  description: 'Real-time AI Teaching Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NuqsAdapter>
      <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' } }}>
        <html lang="en">
          <body className={`${bricolage.variable} antialiased`}>
            <Navbar />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </NuqsAdapter>
  )
}
