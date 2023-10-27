import Link from 'next/link'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import LogoutBtn from './LogoutBtn'
import { connectDB } from '@/util/database'
import style from './page.module.css'

export const metadata = {
  title: 'GHBLOG',
  description: 'Blog made by kwongholee',
  icons: {
    icon: '/favicon.ico'
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
            <Link href="/" className={style.Logo} style={{fontSize: '50px', color: '#0D47A1'}}>GHBLOG</Link> 
            <Link className={style.barLinkBtn} href="/introduce">소개어떤데</Link> 
            <Link className={style.barLinkBtn} href="/list/1">게시판</Link> 
            <Link className={style.barLinkBtn} href="/write">글쓰기</Link>
            <Link className={style.barLinkBtn} href="/moredevelop">앞으로 개발될 것들</Link>
            <span style={{float: 'right', marginTop: '2%'}}>
              <strong>{session.user.name}</strong> 
              <Link className={style.barLinkBtn} href={"/profile/" + result._id}> 프로필</Link>
              <LogoutBtn></LogoutBtn>
            </span>
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