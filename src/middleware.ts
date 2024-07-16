export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/jobs", "/employer/post-jobs","/jobs/:path*"],
};
