'use client'

import { useRouter } from "next/navigation"

export default function LightMode() {
  let router = useRouter()
  
  return(
    <span onClick={() => {
      document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
      router.refresh();
    }} style={{cursor: 'pointer'}}>☀️</span>
  )
}