import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const db = (await connectDB).db('GHBlog');
  let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})
  console.log(result);

  return(
    <div>
      <h1>Edit Page</h1>
      <form action="/api/post/edit" method="POST">
        <input name="_id" defaultValue={result._id.toString()} style={{display: 'none'}} />
        <input name="title" defaultValue={result.title}  style={{width: '20%'}} />
        <textarea name="content" defaultValue={result.content}  cols={100} rows={20} /><br></br>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  )
}