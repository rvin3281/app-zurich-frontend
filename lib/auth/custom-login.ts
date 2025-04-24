"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "invalid",
          };

        default:
          return { success: false, message: "internal error" };
      }
    }
  }
}
