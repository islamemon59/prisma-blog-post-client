import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    FRONTED_API: z.url(),
    BACKEND_API: z.url(),
    API_URL: z.url(),
    AUTH_URL: z.url(),
  },

  // client

  runtimeEnv: {
    FRONTED_API: process.env.FRONTED_API,
    BACKEND_API: process.env.BACKEND_API,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
  },
});
