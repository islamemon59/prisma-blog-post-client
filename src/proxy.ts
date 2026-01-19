import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  console.log(request.url);
  NextResponse.next();
  let isAuthenticated = false;
  let isAdmin = false;
  const pathname = request.nextUrl.pathname;
  const {data} = await userService.getSession();

  if(data){
    isAuthenticated = true;
    isAdmin = data.user.role === roles.admin;
  }


  if(!isAuthenticated){
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if(isAdmin && pathname.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/admin-dashboard", request.url) );
  }


  if(!isAdmin && pathname.startsWith("/admin-dashboard")){
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/admin-dashboard", "/admin-dashboard/:path*", "/dashboard/:path*"]
};
