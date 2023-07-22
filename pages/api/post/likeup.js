import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if(req.method == 'PUT') {
    try {
      const db = (await connectDB).db('GHBlog');
      let result = await db.collection('post').updateOne({_id: new ObjectId(req.query.id)}, {$inc: {like: 1}});
      return res.status(200).json('success');
    } catch(err) {
      console.log(err);
    }
  }
}