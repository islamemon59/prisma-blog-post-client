"use server";
import { BlogData, blogService } from "@/services/blog.service";
import { revalidateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlog();
};


export const createBlogPost = async (data: BlogData) => {
  revalidateTag("blogPost", "max");
  return await blogService.createBlogPost(data)
}