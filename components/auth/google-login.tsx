import { signInWithGoogle } from "@/lib/auth/auth-signin-google";
import { Button } from "../ui/button";

export default function GoogleLogin() {
  return (
    <form action={signInWithGoogle}>
      <Button variant="default" type="submit">
        Google
      </Button>
    </form>
  );
}
