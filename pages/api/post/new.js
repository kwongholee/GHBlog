import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req,res) {
  let session = await getServerSession(req, res, authOptions);

  const db1 = (await connectDB).db('test');
  let result1 = await db1.collection('users').findOne(session.user);
  let writer = result1._id;
  let date = new Date();
  date = date.toLocaleString('ko-kr');

  var data = {
    writerId: new ObjectId(writer),
    writer: session.user.name,
    title: req.body.title,
    content: req.body.content,
    like: 0,
    date: date
  }

  const db2 = (await connectDB).db('GHBlog');
  let result2 = await db2.collection('post').insertOne(data);
  return res.redirect(302, '/list/1');
}