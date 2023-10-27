import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req,res) {
  let session = await getServerSession(req,res,authOptions)

  const db = (await connectDB).db('GHBlog');
  const db1 = (await connectDB).db('test');
  let result = await db.collection('post').findOne({_id: new ObjectId(req.body)});  
  let writerResult = await db1.collection('users').findOne({_id: new ObjectId(result.writerId)});
  
  if(writerResult && session.user.email === writerResult.email) {
    return res.send('okay')
  }
  else return res.status(500).send('당신은 글쓴이가 아니므로 수정할 수 없습니다')
}