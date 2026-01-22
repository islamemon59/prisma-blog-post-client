import { BlogPost } from "@/types";
import Image from "next/image";
import Link from "next/link";

const formatDate = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const PostCard = ({ post }: { post: BlogPost }) => {
  const isPublished = post.status === "PUBLISHED";

  return (
    <article
      className={[
        "group flex h-full flex-col overflow-hidden rounded-2xl border  shadow-sm transition",
        "hover:shadow-lg",
        post.isFeatured ? "border-blue-200" : "border-gray-200",
      ].join(" ")}
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={post.isFeatured}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm ">
            No thumbnail
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {post.isFeatured && (
            <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}

          {!isPublished && (
            <span className="rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-semibold text-white">
              {post.status}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h2 className="mb-2 line-clamp-2 text-lg font-semibold">
          {post.title}
        </h2>

        <p className="mb-4 line-clamp-3 text-sm">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                +{post.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-3">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {formatDate(post.createdAt)}
            </time>

            <span className="h-1 w-1 rounded-full bg-gray-300" />

            <span>{post.views.toLocaleString()} views</span>
          </div>

          <Link
            href={`/blogs/${post.id}`}
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
