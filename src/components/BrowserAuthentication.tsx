// src/components/BrowserAuthentication.tsx
'use client'

import { useEffect } from 'react'
import Bowser from 'bowser'
import { usePathname, useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'

export default function BrowserAuthentication({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const router = useRouter()
  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent)
    const browserName = browser.getBrowserName()
    if (browserName !== 'Chrome') {
      if (pathname !== '/error') {
        router.push('/error')
      }
    }
  }, [pathname, router])

  return <div>{children}</div>
}
