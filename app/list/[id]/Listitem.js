'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Listitem(props) {
  let router = useRouter();
  let [result, setResult] = useState(props.copy);
  let [search, setSearch] = useState('');
  let [what, setWhat] = useState('글제목');

  const getList = (pageparams = 1) => 
    axios.get(`/api/list/normal?page=${pageparams}`)
    .then((r) => console.log(r))

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <div>
        <select onChange={(e) => {setWhat(e.target.value);}}>
          <option>글제목</option>
          <option>작성자</option>
        </select>
        <input autoComplete="off" id="search" onChange={(e) => {setSearch(e.target.value)}} placeholder="검색창" />
        <button onClick={() => {
          fetch('/api/post/list', {method: 'POST', body: JSON.stringify({what: what, search: search})}).then((r) => r.json())
          .then((r) => {
            setResult(r);
            document.querySelector('#search').value = '';
            setSearch('');
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
                  router.push('/edit/' + a._id);
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

// 검색 후 /list로 재접속시 result를 다시 바꿔놔야 함
// url paramter 문법으로 어떻게 해볼 생각이었는데 생각해보니 그게 안될 거 같음 어떻게 해야 함?
// 뭔가 useEffect 2번째 파라미터 자리에 들어갈 거 찾으면 될 거 같은데 뭔지 잘 모르겠음
// 라우팅 설계 다시 하세연
// + 게시물 지우면 다시 새로고침되게 해야할 거 같은데? 걍 무한 스크롤링으로 할 까 이거하니까 너무 귀찮네;;
// 진지하게 무한 스크롤링 나쁘지 않은 거 같음