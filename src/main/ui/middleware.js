import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(request) {
  console.log('hello from middleware');
  //const token = request.headers.get('Authorization');
  //const token = request.cookies.token;
  //try {
  //const {payload} = await jwtVerify(token, secret);
  //console.log(payload);
  //return NextResponse.next();
  //} catch (err) {
  //console.log(err);
  //return rewrite to login page
  //return NextResponse.rewrite('/login');
  //}
  //return NextResponse.next();
  // }

  //   const token = request.cookies.get('OutsiteJWT');
  const { pathname } = request.nextUrl;
  const PUBLIC_FILE = /\.(.*)$/;
  if (
    pathname.startsWith('/_next') || // exclude Next.js internals
    pathname.startsWith('/api') || //  exclude all API routes
    pathname.startsWith('/static') || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }
  const token = request.cookies.get('token');
  const url = request.url;

  if (
    token == undefined &&
    !pathname.startsWith('/login') &&
    !pathname.startsWith('/register')
  ) {
    request.nextUrl.pathname = '/login';
    return NextResponse.redirect(request.nextUrl);
  }

  //     try {
  //       const {payload} = await jwtVerify(token, secret);
  //       console.log(payload);
  //       if user is logged in and tries to access login page, redirect to home page
  //       if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
  //          req.nextUrl.pathname = "/";
  //         return NextResponse.redirect(req.nextUrl);
  //     }
  //       return NextResponse.next();
  //     } catch (error) {
  //       req.nextUrl.pathname = "/login";
  //       return NextResponse.redirect(req.nextUrl);
  //     }

  return NextResponse.next();
}

// export const config = {
//   matcher: [],
// };
