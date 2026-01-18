import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {
  const session = await userService.getSession();
  console.log(session);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant="outline" size="lg">
        Click Me
      </Button>
    </div>
  );
}
