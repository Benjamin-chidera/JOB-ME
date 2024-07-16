export { default } from "next-auth/middleware";

export const config = {
  matcher: [ "/employer/post-jobs", "/get-jobs", "/jobs/:path*"],
};
