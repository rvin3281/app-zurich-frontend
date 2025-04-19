"use client";
import { signInWithGoogle } from "@/lib/auth/auth-signin-google";

export default function GoogleLogin() {
  return (
    <form action={signInWithGoogle}>
      <button type="submit">Google</button>
    </form>
  );
}
