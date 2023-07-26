import { connectDB } from "@/util/database";
import Listitem from "./Listitem";

export default async function List(props) {
  const db = (await connectDB).db('GHBlog');
  let result = await db.collection('post').find().toArray();
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

// 좋아요 수가 제대로 적용이 안 됨(새로고침해야만 적용됨 이거 cache 사용해야 할 듯)
// 사용자 검색 기능 만들어야지