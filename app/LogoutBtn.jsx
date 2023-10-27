'use client'

import { signOut } from "next-auth/react"
import style from './page.module.css'

export default function LogoutBtn() {
    return(
        <button className={style.barLogoutBtn} onClick={() => {signOut({callbackUrl: `${window.location.origin}`})}}>Logout</button>
    )
}