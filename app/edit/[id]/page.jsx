import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import style from './edit.module.css'

export default async function Edit(props) {
  const db = (await connectDB).db('GHBlog');
  let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})

  return(
    <div>
      <h1 style={{textAlign: 'center'}}>Edit Page</h1>
      <form action="/api/post/edit" method="POST">
        <input name="_id" defaultValue={result._id.toString()} style={{display: 'none'}} />
        <div className={style.container}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <label style={{flex: 1}}>title</label>
            <input defaultValue={result.title} name="title" placeholder="title" className={style.titleInput} style={{flex: 'none'}} />
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <label style={{flex: 1}}>content</label>
            <textarea defaultValue={result.content} name="content" placeholder="content" cols={100} rows={20} className={style.contentInput} style={{flex: 'none'}} />
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button type="submit" className={style.inputBtn}>작성 완료</button>
          </div>
        </div>
      </form>
    </div>
  )
}