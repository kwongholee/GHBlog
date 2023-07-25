import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import LoginBtn from "./LoginBtn";
import Mainpage from "./Mainpage";

export default async function Home() {
  let session = await getServerSession(authOptions);
  
  if(session) {
    return (
      <div style={{height: '20000px'}}>
        <Mainpage></Mainpage>
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
