import GoogleLogin from "@/components/auth/google-login";
import LoginForm from "@/components/form/ui/loginForm";
import ImageElement from "@/components/image/ImageElement";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyZurich-login",
  description: "Technical Assessment Zurich",
};
export default async function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8 grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <ImageElement
              src="/zurich_logo.png"
              width={250}
              height={100}
              alt="zurich logo login"
              parentClassName="mx-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
            <h3 className="text-gray-600 mt-2">Sign In To Your Account</h3>
          </div>
        </div>

        <div>
          <div>
            <LoginForm />
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 mb-4">
              You can also sign in using:
            </p>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="ghost">Facebook</Button>
              <GoogleLogin />
              <Button variant="default">Linked In</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
