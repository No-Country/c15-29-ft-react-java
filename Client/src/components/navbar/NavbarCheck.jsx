import { useAuth } from '@/Api/AuthContext'
import React from 'react'
import GuestNavbar from './GuestNavbar'
import UserNavbar from './UserNavbar'

export const NavbarCheck = () => {

    const { token } = useAuth()

  return token ? <UserNavbar /> : <GuestNavbar />
   

}
