import { NextResponse } from "next/server";

export function middleware(request) {

    if (request.nextUrl.pathname.includes('/dashboard')) {
        console.log('validating dashboard');
    }

  return NextResponse.next()
}
