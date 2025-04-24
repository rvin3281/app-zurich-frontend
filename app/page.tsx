"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Image
              src="/zurich_logo.png"
              width={150}
              height={60}
              alt="MyZurich Logo"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome to MyZurich Customer Portal
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Please click the button below to login and access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="mt-6 w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
