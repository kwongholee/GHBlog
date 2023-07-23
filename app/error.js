'use client'

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"

export default function Error({error, reset}) {
  let router = useRouter();

  return(
    <div>
      <FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#cf3030",}} size="10x" className="error" />
      <h1 style={{marginLeft: '43%'}}>Something is wrong!</h1>
      <button onClick={() => {router.back()}} style={{marginLeft: '45%', marginRight: '4%'}}>Go Back?</button>
      <button onClick={() => {reset()}}>Reset?</button>
    </div>
  )
}