'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LinkBtn from "./Linkbtn";

export default function Board(props) {
  let router = useRouter();
  let [list, setList] = useState(props.list);
  let [search, setSearch] = useState('');
  console.log(props.result);


  if(list.length > 0) {
    return(
      <div>
        <button onClick={() => {
          let copy = [...list];
          copy = copy.sort((a,b) => a.title.localeCompare(b.title));
          setList(copy);
        }}>제목순으로 정렬(오름차순)</button>
        <button onClick={() => {
          let copy = [...list];
          copy = copy.sort((a,b) => b.title.localeCompare(a.title));
          setList(copy);
        }}>제목순으로 정렬(내림차순)</button>
        <button onClick={() => {
          let copy = [...list];
          copy = copy.sort((a,b) => {
            return b.like - a.like;
          })
          setList(copy);
        }}>추천 수가 많은 순대로 정렬</button>
        <button onClick={() => {
          let copy = [...list];
          copy = copy.sort((a,b) => {
            return a.like - b.like;
          })
          setList(copy);
        }}>추천 수가 적은 순대로 정렬</button>
        <input id="searchInput" autoComplete="off" placeholder="제목 검색창" onChange={(e) => {setSearch(e.target.value)}} />
        <button onClick={() => {
          fetch('/api/detail/list', {method: 'POST', body: search})
          .then((r) => r.json())
          .then((result) => {
            setList(result);
            document.getElementById('searchInput').value = '';
            setSearch('');
          })
        }}>검색</button>
        {list.map((a,i) => {
          return(
            <div className="list-item" key={i} onClick={() => {router.push('/detail/' + a._id);}}>
              <h4>{a.title}</h4>
              <p>{a.writer}</p>
              <p>{a.date}</p>
              <p>👍: {a.like}</p>
              <span onClick={(e) => {
                e.stopPropagation();
                fetch('/api/post/delete', {method: 'DELETE', body: a._id})
                .then((r) => {r.json()})
                .then(() => {
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                        e.target.parentElement.style.display = 'none';
                    }, 1000)
                })
              }} style={{cursor: 'pointer'}}>Delete</span>
              <span onClick={(e) => {
                e.stopPropagation();
                router.push('/edit/' + a._id);
                }} style={{cursor: 'pointer'}}>Edit</span>
            </div>
          )
        })}
        <LinkBtn list={list}></LinkBtn>
      </div>
    )
  } else {
    return(
      <div>'nothing else'</div>
    )
  }
}