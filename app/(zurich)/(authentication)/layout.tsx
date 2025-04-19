import { SessionProvider } from "next-auth/react";

export default function AuthenticationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SessionProvider>{children}</SessionProvider>;
}
