import { connectDB } from "@/util/database";
import Listitem from "./Listitem";
import { useState } from "react";

export default async function Search(props) {
  let [result, setResult] = useState([]);
  const getData = () => {
    fetch('/api/list/search').then((r) => r.json)
    .then((data) => {setResult(data)})
  }

  result.sort((a,b) => {return b.date.localeCompare(a.date, 'ko-kr')});
  result = result.map((a) => {
    a._id = a._id.toString();
    a.writerId = a.writerId.toString();
    return a;
  })

  let copy = [...result];
  copy = copy.slice(10 * (parseInt(props.params.id) - 1), 10 * parseInt(props.params.id));

  return(
    <div className="list-bg">
      <h1 style={{textAlign: 'center'}}>게시판</h1>
      <Listitem result={result} id={props.params.id} copy={copy}></Listitem>
    </div>
  )
}

// search 부분 갈아야함