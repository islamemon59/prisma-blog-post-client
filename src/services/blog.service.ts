import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface Options {
  cache?: RequestCache;
  revalidate?: number;
}
interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string
}

export interface BlogData {
  title: string;
  content: string;
  tags: string[];
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
      config.next = { ...config.next, tags: ["blogPost"] };
      const res = await fetch(url);

      const data = await res.json();

      return { data };
    } catch (error) {
      console.log(error);
    }
  },

  getBlogPosts: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/v1/posts/${id}`);

      return await res.json();
    } catch (error) {
      console.log(error);
    }
  },

  createBlogPost: async function (blogData: BlogData) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/v1/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });
      const data = await res.json();

      if (data.error) {
        return { data: null, error: { message: data.error } };
      }

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },
};
