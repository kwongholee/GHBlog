import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Board from "./Board";

export default async function Profile(props) {
  let id = props.params.id;

  const db = (await connectDB).db('test');
  const db1 = (await connectDB).db('GHBlog');
  let result = await db.collection('users').findOne({_id: new ObjectId(id)});
  let boardResult = await db1.collection('post').find({writerId: new ObjectId(id)}).toArray();
  boardResult = boardResult.map((a) => {
    a._id = a._id.toString();
    a.writerId = a.writerId.toString();
    return a;
  })

  return(
    <div>
      <h1>Profile Page</h1>
      <h3>이름: {result.name}</h3>
      <h3>이메일: {result.email}</h3>
      <hr></hr>
      <h4>발행한 글 목록</h4>
      <Board list={boardResult}></Board>
    </div>
  )
}

// 여기서 글 발행 리스트 10개씩 짜르는 거 안 적음