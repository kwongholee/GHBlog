'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DarkMode() {
  let router = useRouter()
  
  useEffect(() => {
    let mode = ('; '+ document.cookie).split(`; mode=`).pop().split(';')[0]
    if(mode == '') {
      document.cookie = 'mode=light; max-age=' + (3600 * 24)
    }
  }, [])

  return(
    <span onClick={() => {
      document.cookie = 'mode=dark; max-age=' + (3600 * 24)
      router.refresh();
    }} style={{cursor: 'pointer'}}>🌙</span>
  )
}