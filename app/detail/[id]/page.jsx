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
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{marginRight: 'auto'}}>Title: {result.title}</h1>
        <p style={{marginRight: '2%'}}>Writer: {result.writer}</p>
      </div>
      <h3>Content: {result.content}</h3>
      <Like like={result.like} id={result._id}></Like>
      <Comment id={result._id}></Comment>
    </div>
  )
}