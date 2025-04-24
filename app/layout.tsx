import type { Metadata } from "next";

import { SessionProvider } from "next-auth/react";
import "../styles/tailwind.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "MyZurich App",
  description: "Technical Assessment Zurich",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
