'use client'

import {signIn, signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginBtn() {
    let router = useRouter()

    return(
        <div className='button-container'>
            <button className='main-login-btn' onClick={() => {signIn()}}>Login</button>
            <button className='main-login-btn' onClick={() => {router.push('/register')}}>Register</button>
        </div>
    )
}