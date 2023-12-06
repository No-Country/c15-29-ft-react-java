'use client'

import { NextUIProvider } from '@nextui-org/react'
import NavbarApp from '@/components/NavbarApp'
import Card from '@/components/Card'

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <NavbarApp />
      <Card />
      {children}
    </NextUIProvider>
  )
}