import { env } from "@/env";

const API_URL = env.API_URL;

export const blogService = {
  getBlog: async function () {
    try {
      const res = await fetch(`${API_URL}/api/v1/posts`, {
        next: {
            revalidate: 10
        }
      });

      const data = await res.json();

      return { data };
    } catch (error) {
      console.log(error);
    }
  },
};
