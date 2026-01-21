import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const data = await blogService.getBlog({
    isFeatured: false,
    search: ""
  },
{
  cache: "no-store",
  revalidate: 10
})
  return (
    <div className=" flex justify-center items-center gap-10">
      {data?.data?.data?.data.map((post: BlogPost) =>( 
        <BlogCard key={post.id} post={post}/>
      ))}
    </div>
  );
}
