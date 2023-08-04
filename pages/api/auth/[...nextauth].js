import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from "next-auth/providers/google";

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
  ],
  secret : process.env.AUTHSECRET,
  adapter: MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 