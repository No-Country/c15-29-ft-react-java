'use client'

import NavbarApp from '@/components/NavbarApp'
import { Button } from '@nextui-org/react'
import React from 'react'

export default function HomePage() {
  return (
    <>
      <NavbarApp/>
      <div>HomePage</div>
      <Button>Prueba</Button>
    </>
  )
}
