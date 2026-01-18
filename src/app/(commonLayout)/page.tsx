import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  // console.log(cookieStore);

  const res = await fetch("http://localhost:5000/api/auth/get-session", {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });
  const session = await res.json();
  console.log("Get Session", session);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant="outline" size="lg">
        Click Me
      </Button>
    </div>
  );
}
