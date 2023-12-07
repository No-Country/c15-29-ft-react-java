'use client'

import {NextUIProvider} from '@nextui-org/react'
import NavbarApp from '@/components/NavbarApp'

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <NavbarApp />
      {children}
    </NextUIProvider>
  )
}