import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

// 아직 실행 안 해봤음 테스트해봐야 함
export default async function handler(req, res) {
  if(req.method == 'DELETE') {
    let session = await getServerSession(req, res, authOptions);

    const db = (await connectDB).db('GHBlog');
    let result = await db.collection('post').findOne({_id: new ObjectId(req.body)});

    const db1 = (await connectDB).db('test');
    let result2 = await db1.collection('users').findOne({_id: new ObjectId(result.writerId)});
    if(result2) {
      if(result2.email === session.user.email) {
        let deleteResult = await db.collection('post').deleteOne({_id: new ObjectId(req.body)});
        let deleteComment = await db.collection('comment').deleteMany({parent: new ObjectId(req.body)});
        return res.redirect(302, '/list');
      }
    }
  }
}