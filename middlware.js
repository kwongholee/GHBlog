import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const session = await getToken({req: request})
  var path = request.nextUrl.pathname
  if(path.startsWith('/write') || path.startsWith('/profile')) {
    
    if(session == null) {
      return NextResponse.redirect('http://localhost:3000/api/auth/signin')
    }
  }

  if(path.startsWith('/edit')) {
    // if(session == null) {
    //   return NextResponse.redirect('http://localhost:3000/api/auth/signin')
    // } else if (session) {

    // } 
    console.log(request.headers);
  }
}