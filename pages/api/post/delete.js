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

    // credential로 로그인한 유저랑 OAuth로 로그인한 유저랑 구분하는 방법 없는지 체크해볼 것. 구분할 방법이 생기면 코드 더 짧아지고 효율적일 듯
    const db1 = (await connectDB).db('test');
    let result1 = await db1.collection('user_cred').findOne({_id: new ObjectId(result.writerId)});
    let result2 = await db1.collection('users').findOne({_id: new ObjectId(result.writerId)});
    if(result1) {
      if(result1.email === session.user.email) {
        let deleteResult = await db.collection('post').deleteOne({_id: new ObjectId(req.body)});
        let deleteComment = await db.collection('comment').deleteMany({_id: new ObjectId(result._id)});
        return res.redirect(302, '/list');
      }
    } else if(result2) {
      if(result2.email === session.user.email) {
        let deleteResult = await db.collection('post').deleteOne({_id: new ObjectId(req.body)});
        let deleteComment = await db.collection('comment').deleteMany({_id: new ObjectId(result._id)});
        return res.redirect(302, '/list');
      }
    }
  }
}