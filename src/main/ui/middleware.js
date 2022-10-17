import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

export async function middleware(request, response) {
  // console.log('hello from middleware');

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

  if (token == undefined) {
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );
    // console.log(payload);
    if (payload) {
      if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        request.nextUrl.pathname = '/';
        return NextResponse.redirect(request.nextUrl);
      }
    }

    return NextResponse.next();
  } catch (error) {
    request.nextUrl.pathname = '/api/logout';
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: [],
// };
