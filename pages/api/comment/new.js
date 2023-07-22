import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if(req.method == 'POST') {
    let session = await getServerSession(req,res,authOptions);
    try {
      let data = JSON.parse(req.body);
      let parent = data.parent;
      data.parent = new ObjectId(data.parent);
      data.writer = session.user.name;
      const db = (await connectDB).db('test');
      let sessionResult = await db.collection('users').findOne({email: session.user.email});
      let sessionResult2 = await db.collection('user_cred').findOne({email: session.user.email});
      if(sessionResult) {
        data.writerId = new ObjectId(sessionResult._id);
      } else if(sessionResult2) {
        data.writerId = new ObjectId(sessionResult2._id);
      }
      const db1 = (await connectDB).db('GHBlog');
      let result = await db1.collection('comment').insertOne(data);
      let commentData = await db1.collection('comment').find({parent: new ObjectId(parent)}).toArray();
      res.status(200).json(commentData);
    } catch(err) {
      console.log(err)
    }
  }
}