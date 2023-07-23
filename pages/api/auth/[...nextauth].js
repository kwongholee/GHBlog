import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLINET_KEY,
      clientSecret: process.env.GOOGLE_SECRET_KEY
    }),
    KakaoProvider({ //kakao 현재 회원가입 시 db에 모든 데이터가 null로 저장됨
      clientId: process.env.KAKAO_CLIENT_KEY,
      clientSecret: process.env.KAKAO_SECRET_KEY
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_KEY,
      clientSecret: process.env.NAVER_SECRET_KEY
    }),
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드 (로그인 페이지에 들어갈 input들 나열)
      name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db('GHBlog');
        let user = await db.collection('user_cred').findOne({email : credentials.email})
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return user
      }
    })
  ],
  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 30 // 1시간(로그인 유지 기간)
  },
  callbacks: {
    //4. jwt 만들 때 실행되는 코드  (jst에 기입할 정보)
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드 (컴퍼넌트 안에서 보여줄 유저 정보)
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
  },
  secret : process.env.AUTHSECRET,
  adapter: MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 

// 진지하게 credential 없애는 거 나쁘지 않은 거 같음 db 검색을 2번 돌려야 해서 너무 오래 걸릴 거 같음