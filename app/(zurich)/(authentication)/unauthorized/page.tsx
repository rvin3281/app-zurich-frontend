"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md text-center space-y-6">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <AlertTitle className="text-xl font-bold">
            Unauthorized Access
          </AlertTitle>
          <AlertDescription className="mt-2 text-base">
            You are not authorized to access this page.
          </AlertDescription>
        </Alert>
        <Button onClick={handleBackHome} className="mt-4">
          Back to Home Page
        </Button>
      </div>
    </div>
  );
}
