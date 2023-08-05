import { connectDB } from "@/util/database";

export default async function handler(req,res) {
  if(req.method == 'GET') {
    // console.log(req.query.search) undefined
    const db = (await connectDB).db('GHBlog');
    let data = await db.collection('post').find().toArray();
    let copy = [...data];
    let pageNum = parseInt(req.query.page)
    copy = copy.slice(10 * (pageNum - 1), 10 * pageNum);
    let result = {
      totalPage: parseInt(data.length/10) + 1,
      page: pageNum,
      result: copy,
      totalLength: data.length,
    }
    return res.status(200).json(result);
  }
}