"use server";

import { signOut } from "@/auth";

export const signOutAuth = async () => {
  await signOut();
};
