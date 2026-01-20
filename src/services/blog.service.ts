import { env } from "@/env";

const API_URL = env.API_URL;

interface Options {
  cache?: RequestCache;
  revalidate?: number;
}
interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
}

export const blogService = {
  getBlog: async function (params?: GetBlogsParams, options?: Options) {
    try {
      const url = new URL(`${API_URL}/api/v1/posts`);
      //   url.searchParams.append("Key", "Value");
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }
      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      console.log(url.toString(), config);
      const res = await fetch(url);

      const data = await res.json();

      return { data };
    } catch (error) {
      console.log(error);
    }
  },
};
