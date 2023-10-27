import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let session = await getServerSession(req,res,authOptions);

  const db = (await connectDB).db('GHBlog');
  const db1 = (await connectDB).db('test');
  let result = await db.collection('post').findOne({_id: new ObjectId(req.body._id)});  
  let writerResult = await db1.collection('users').findOne({_id: new ObjectId(result.writerId)});
  
  if(writerResult) {
    if(session.user.email === writerResult.email) {
      result.title = req.body.title;
      result.content = req.body.content;
      let editResult = await db.collection('post').updateOne({_id: new ObjectId(result._id)}, {$set: result})
      return res.redirect(302, '/list');
    } else {
      return res.status(500).json('너 글쓴이 아니자나 뭐임?');
    }
  }
}