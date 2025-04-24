"use client";

import { setUserData } from "@/app/store/feature/authSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SessionRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      dispatch(
        setUserData({
          name: session.user.name ?? "",
          email: session.user.email ?? "",
          role: session.user.role ?? "",
        })
      );
    }
  }, [dispatch, router, session, status]);

  return null;
}
