import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Register() {
  let session = await getServerSession(authOptions);
  if(!session) {
    return(
      <div>
        <h1>Register Page</h1>
        <form action="/api/auth/signup">
          <input name="name" type="text" placeholder="이름 적으셈" />
          <input name="email" type="text" placeholder="email 적으셈" />
          <input name="pw" type="password" placeholder="비번 적으셈" />
          <button type="submit">register</button>
        </form>
      </div>
    )
  }
}