import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch("http://localhost:5000/api/auth/get-session", {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "Session is not found" } };
      }
      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },
};
