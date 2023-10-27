import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import LoginBtn from "./LoginBtn";
import List from "./List";
import { connectDB } from "@/util/database";

export default async function Home() {
  let session = await getServerSession(authOptions);
  let db = (await connectDB).db('GHBlog');
  let result = await db.collection('post').find().toArray();
  result = result.map((a) => {
    a._id = a._id.toString();
    a.writerId = a.writerId.toString();
    return a;
  })

  let copy = [...result];
  copy.sort((a,b) => {
    return b.like - a.like;
  })
  copy = copy.slice(0, 5);
  
  if(session) {
    return (
      <div style={{height: '20000px'}}>
        <h1 style={{textAlign: 'center'}}>디자인 미완성...</h1>
        <List copy={copy}></List>
      </div>
    )
  } else {
    return(
      <div>
        <h1 className="main-title">Welcome to GHBlog!</h1>
        <LoginBtn></LoginBtn>
        <p className="main-writer">제작자: 이광호(kwongholee)</p>
      </div>
    )
  }
}
