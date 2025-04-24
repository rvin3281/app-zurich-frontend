// import SessionRedirect from "@/components/auth/sessionRedirect";
import SessionRedirect from "@/components/auth/sessionRedirect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SessionRedirect />
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
}
