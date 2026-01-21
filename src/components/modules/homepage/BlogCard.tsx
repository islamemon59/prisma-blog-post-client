import { BlogPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      {/* Thumbnail */}
      {post.thumbnail && (
        <Image
          width={0}
          height={0}
          src={post?.thumbnail}
          alt={post?.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      )}

      {/* Title */}
      <h2 className="text-lg font-semibold mb-2">{post.title}</h2>

      {/* Short content */}
      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{post?.content}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {new Date(post?.createdAt).toDateString()}
        </span>

        <Link
          href={`/blogs/${post?.id}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
