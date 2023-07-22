import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import Like from "./Like";

export default async function Detail(props) {
  const db = (await connectDB).db('GHBlog');
  let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})
  result._id = result._id.toString();
  result.writerId = result.writerId.toString();
    

  return (
    <div>
      <h4>Title: {result.title}</h4>
      <h4>Content: {result.content}</h4>
      <h4>Writer: {result.writer}</h4>
      <Like like={result.like} id={result._id}></Like>
      <Comment id={result._id}></Comment>
    </div>
  )
}