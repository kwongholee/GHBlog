import { connectDB } from "@/util/database";

export default async function handler(req,res) {
  if(req.method == 'POST') {
    try {
      let data = JSON.parse(req.body);
      if(data.what == '글제목') {
        if(data.search == '') {
          const db = (await connectDB).db('GHBlog');
          let result = await db.collection('post').find().toArray();
          return res.status(200).json(result);
        } else {
          const db = (await connectDB).db('GHBlog');
          let result = await db.collection('post').find({title: data.search}).toArray();
          return res.status(200).json(result);
        }
      } else if(data.what == '작성자') {
        if(data.search != '') {
          const db = (await connectDB).db('GHBlog');
          let result = await db.collection('post').find({writer: data.search}).toArray();
          return res.status(200).json(result);
        } else {
          const db = (await connectDB).db('GHBlog');
          let result = await db.collection('post').find().toArray();
          return res.status(200).json(result);
        }
      }
    } catch(err) {
      console.log(err);
    }
  }
}

// 검색어가 글제목에 포함되어 있는 경우 해당 데이터 가져다주기