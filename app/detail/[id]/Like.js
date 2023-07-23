'use client'

import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"

export default function Like(props) {
  let [like, setLike] = useState(props.like);
  let [count, setCount] = useState(0);

  if(count == 0) {
    return(
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <FontAwesomeIcon icon={faThumbsUp} size="3x" style={{color: "#e6e935", cursor: 'pointer', marginRight: '1%'}} fade onClick={() => {
            fetch('/api/post/likeup?id=' + props.id, {method: 'PUT', body: like})
            .then(() => {
              setLike(like+1);
              setCount(1);
            })
        }}/><span style={{marginRight: '5%'}}>: {like}</span>
      </div>
    )
  } else {
    return(
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <FontAwesomeIcon icon={faThumbsUp} size="3x" style={{color: "#e6e935", cursor: 'pointer', marginRight: '1%'}} onClick={() => {
            fetch('/api/post/likedown?id=' + props.id, {method: 'PUT', body: like})
            .then(() => {
              setLike(like-1);
              setCount(0);
            })
        }}/><span style={{marginRight: '5%'}}>: {like}</span>
      </div>
    )
  }
}