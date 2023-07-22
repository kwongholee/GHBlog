'use client'

import { useState } from "react"

export default function Like(props) {
  let [like, setLike] = useState(props.like);
  let [count, setCount] = useState(0);

  return(
    <div>
      <p onClick={() => {
        if(count == 0) {
          fetch('/api/post/likeup?id=' + props.id, {method: 'PUT', body: like})
          .then(() => {
            setLike(like+1);
            setCount(1);
          })
        } else {
          fetch('/api/post/likedown?id=' + props.id, {method: 'PUT', body: like})
          .then(() => {
            setLike(like-1);
            setCount(0);
          })
        }
      }}>👍: {like}</p>
    </div>  
  )
}