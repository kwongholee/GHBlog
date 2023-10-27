import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if(req.method == 'POST') {
    try {
      let session = await getServerSession(req, res, authOptions);
      const db1 = (await connectDB).db('test');
      let sessionResult = await db1.collection('users').findOne({email: session.user.email});
      if(req.body == '') {
        const db = (await connectDB).db('GHBlog');
        let result = await db.collection('post').find({writerId: new ObjectId(sessionResult._id)}).toArray();
        return res.status(200).json(result);
      } else {
        const db = (await connectDB).db('GHBlog');
        let result = await db.collection('post').find({writerId: new ObjectId(sessionResult._id), title: req.body}).toArray();
        return res.status(200).json(result);
      }
    } catch(err) {
      console.log(err);
    }
  }
}