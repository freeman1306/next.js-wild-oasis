import { redirect } from "next/navigation";
import { auth } from "@/app/_lib/auth";

import SignInButton from "@/app/_components/SignInButton";

export const metadata = {
  title: "Login",
};


export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <SignInButton />
    </div>
  );
}