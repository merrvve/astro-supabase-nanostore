// With `output: 'hybrid'` configured:
// export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { userRole } from "../../../stores/user";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (signInError) {
    return new Response(signInError.message, { status: 500 });
  }
  
  const { access_token, refresh_token } = signInData.session;
  const { data: userDetailsData, error: userDetailsError } = await supabase
    .from('UserDetails')
    .select('*')
    .eq('id', signInData.user.id);  // Correct usage here
  
  if (userDetailsError) {
    return new Response(userDetailsError.message, { status: 500 });
  }

  console.log(userDetailsData, "details",signInData.user.id);

  userRole.set(userDetailsData[0].role)
  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });
  if(userDetailsData[0].role==="admin") {
    return redirect("/admin/dashboard");
  }
  return redirect("/dashboard");
};