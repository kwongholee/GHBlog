'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import LinkBtn from "./Linkbtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import style from './profile.module.css'

export default function Board(props) {
  let router = useRouter();
  let [list, setList] = useState(props.list);
  let [search, setSearch] = useState('');
  console.log(props.result);


  if(list.length > 0) {
    return(
      <div>
        <div className={style.btncontainer}>
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
        </div>
        <div className={style.searchcontainer}>
          <input className={style.searchInput} id="searchInput" autoComplete="off" placeholder="제목 검색창" onChange={(e) => {setSearch(e.target.value)}} />
          <button className={style.searchbtn} onClick={() => {
            fetch('/api/detail/list', {method: 'POST', body: search})
            .then((r) => r.json())
            .then((result) => {
              setList(result);
              document.getElementById('searchInput').value = '';
              setSearch('');
            })
          }}>검색</button>
        </div>
        {
          list.map((a,i) => {
            return(
              <div className="list-item" key={i} onClick={() => {router.push('/detail/' + a._id);}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <h4 style={{marginRight: 'auto'}}>{a.title}</h4>
                  <p style={{marginLeft: 'auto'}}>{a.date}</p>
                </div>
                <p>{a.writer}</p>
                <div style={{display:'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                  <p style={{position: 'absolute', left: '1.5%'}}>👍: {a.like}</p>
                  <FontAwesomeIcon icon={faPenToSquare} style={{color: "#3b3e45",cursor: 'pointer'}} size="2x" onClick={(e) => {
                    e.stopPropagation();
                    router.push('/edit/' + a._id);
                  }}/>
                  <span style={{width: '1%'}}></span>
                  <FontAwesomeIcon icon={faTrashCan} style={{color: "#514d4d",cursor: 'pointer'}} size="2x" onClick={(e) => {
                    e.stopPropagation();
                    fetch('/api/post/delete', {method: 'DELETE', body: a._id})
                    .then((r) => {r.json()})
                    .then(() => {
                      console.log(e.target.parentElement.parentElement.parentElement)
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
        <LinkBtn list={list}></LinkBtn>
      </div>
    )
  } else {
    return(
      <div>글 쓴 게 없는데염</div>
    )
  }
}