// With `output: 'hybrid'` configured:
// export const prerender = false;
import type { APIRoute } from "astro";
import { userRole } from "../../../stores/user";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  userRole.set("");
  return redirect("/signin");
};