'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useObserver } from "./useObserver";
import style from './list.module.css';

export default function Listitem(props) {
  let router = useRouter();
  let [result, setResult] = useState(props.result);
  let [search, setSearch] = useState('');
  let [what, setWhat] = useState('글제목');

  const getList = (pageparams = 1) => 
    axios.get(`/api/list/normal?page=${pageparams}`)
    .then((r) => console.log(r))

  useEffect(() => {
    getList()
  }, [])

  // const {data, fetchNextPage, status} = useInfiniteQuery(
  //   ['list'],
  //   getList,
  //   {
  //     getNextPageParam: (lastPage) => {
  //       const page = lastPage.data.page;
  //       if(lastPage.data.totalPage == page) return false;
  //       return page + 1;
  //     }
  //   }
  // )

  // const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && fetchNextPage())

  // useObserver({target: bottom, onIntersect});

  return (
    <div>
      <div>
        <select onChange={(e) => {setWhat(e.target.value);}}>
          <option>글제목</option>
          <option>작성자</option>
        </select>
        <input className={style.searchInput} autoComplete="off" id="search" onChange={(e) => {setSearch(e.target.value)}} placeholder="검색창" />
        <button className={style.searchBtn} onClick={() => {
          fetch('/api/post/list', {method: 'POST', body: JSON.stringify({what: what, search: search})}).then((r) => r.json())
          .then((r) => {
            document.querySelector('#search').value = '';
            setSearch('');
            router.push('/search?' + what + '=' + search);
          })
        }}>검색</button>
      </div>
      {
        result.map((a,i) => {
          return(
            <div className="list-item" style={{cursor: 'pointer'}} key={i} onClick={() => {router.push('/detail/' + a._id);}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4 style={{marginRight: 'auto'}}>{a.title}</h4>
                <p style={{marginLeft: 'auto'}}>{a.date}</p>
              </div>
              <p>{a.writer}</p>
              <div style={{display:'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <p style={{position: 'absolute', left: '1.5%'}}>👍: {a.like}</p>
                <FontAwesomeIcon icon={faPenToSquare} style={{color: "#3b3e45",cursor: 'pointer'}} size="2x" onClick={(e) => {
                  e.stopPropagation();
                  fetch('/api/post/editcheck', {method: 'POST', body: a._id})
                  .then(() => {
                    router.push('/edit/' + a._id);
                  })
                  .catch((error) => {
                    alert(error);
                  })
                }}/>
                <span style={{width: '1%'}}></span>
                <FontAwesomeIcon icon={faTrashCan} style={{color: "#514d4d",cursor: 'pointer'}} size="2x" onClick={(e) => {
                  e.stopPropagation();
                  fetch('/api/post/delete', {method: 'DELETE', body: a._id})
                  .then((r) => {r.json()})
                  .then(() => {
                    e.target.parentElement.parentElement.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.parentElement.parentElement.style.display = 'none';
                    }, 1000)
                  })
                }}/>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

// 무한 스크롤 구현