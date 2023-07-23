'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Comment(props) {
  let router = useRouter();

  let [comment, setComment] = useState('');
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/comment/list?id=' + props.id).then((r) => r.json())
    .then((result) => {
      setData(result);
    })
  }, [])

  return(
    <div>
      <hr></hr>
      <h1>Comment</h1>
      <input id="input" onChange={(e) => {setComment(e.target.value)}} />
      <button onClick={() => {
        fetch('/api/comment/new', {method: 'POST', body: JSON.stringify({parent: props.id, comment: comment})})
        .then((r) => r.json())
        .then((result) => {
          setData(result);
          document.getElementById('input').value = '';
        })
      }}>comment 등록</button>
      {
        data.length > 0 ?
        data.map((a,i) => {
          return(
          <p key={i}><Link href={"/profile/" + a.writerId}>{a.writer}</Link>: {a.comment}</p>) //db에 writerId 저장하기
        }) : 'loading'
      }
    </div>
  )
}