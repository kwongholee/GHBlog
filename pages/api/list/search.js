import { connectDB } from "@/util/database";

export default async function handler(req,res) {
  let clientData = JSON.parse(req.body);
  const db = (await connectDB).db('GHBlog');
  if(clientData.what == '글제목') {
    if(clientData.search == '') {
      let data = await db.collection('post').find().toArray();
      return res.status(200).send(data);
    }
    else {
      let data = await db.collection('post').find({title: clientData.search}).toArray();
      return res.status(200).send(data);
    }
  }
  else {
    if(clientData.search == '') {
      let data = await db.collection('post').find().toArray();
      return res.status(200).send(data);
    }
    else {
      let data = await db.collection('post').find({writer: clientData.search}).toArray();
      return res.status(200).send(data);
    }
  }
}