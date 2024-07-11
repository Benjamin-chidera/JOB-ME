export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/jobs", "/employer/post-jobs", "/get-jobs", "/jobs/:path*"],
};
