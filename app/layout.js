import Link from 'next/link'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import LogoutBtn from './LogoutBtn'
import {cookies} from 'next/headers'
import DarkMode from './DarkMode'
import LightMode from './LightMode'
import { connectDB } from '@/util/database'

export const metadata = {
  title: 'GHBLOG',
  description: 'Blog made by kwongholee',
  icons: {
    icon: '/mainIcon.png'
  },
}

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions)

  if(session) { // 로그인 후 메인 페이지 레이아웃
    const db = (await connectDB).db('test');
    let result = await db.collection('users').findOne(session.user);
            
    return (
      <html lang="en"> 
        <body>
          <div className="navbar">  
            <Link href="/" className="logo" style={{fontSize: '50px'}}>GHBLOG</Link> 
            <Link href="/introduce">소개어떤데</Link> 
            <Link href="/list/1">게시판</Link> 
            <Link href="/write">글쓰기</Link>
            <span style={{float: 'right', marginTop: '2%'}}>
              {session.user.name} 
              <Link href={"/profile/" + result._id}> 프로필</Link>
              <LogoutBtn></LogoutBtn></span>
          </div> 
          {children}
        </body>
      </html>
    )
  } else { // 로그인 전 메인 페이지 레이아웃 (뭔가 로그아웃 페이지에는 안 맞는 듯 걍 page.js로 빼야할 듯)
    return (
      <html lang='en'>
        <body className='before-login-main'>
          {children}
        </body>
      </html>
    )
  }
}