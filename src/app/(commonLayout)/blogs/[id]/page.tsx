import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";
import { blogService } from "@/services/blog.service";

// ✅ Static params for SSG
export async function generateStaticParams() {
  const res = await blogService.getBlog();
  const blogs: BlogPost[] = res?.data?.data?.data || [];

  return blogs.map((blog) => ({
    id: blog.id,
  }));
}

// const formatDate = (date: string | Date) => {
//   const d = typeof date === "string" ? new Date(date) : date;
//   return d.toLocaleDateString(undefined, {
//     year: "numeric",
//     month: "long",
//     day: "2-digit",
//   });
// };

const getReadingTime = (text: string) => {
  const words = text?.trim()?.split(/\s+/).filter(Boolean).length || 0;
  const minutes = Math.max(1, Math.ceil(words / 200)); // ~200 wpm
  return { words, minutes };
};

const DynamicBlogPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const blog = await blogService.getBlogPosts(id);
  console.log(blog);
  const post: BlogPost | null = blog || null;

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-2xl font-semibold text-gray-900">Post not found</h1>
        <p className="mt-2 text-gray-600">
          The blog you’re looking for doesn’t exist or was removed.
        </p>
        <Link
          href="/blogs"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          ← Back to blogs
        </Link>
      </div>
    );
  }

  const { minutes } = getReadingTime(post.content);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Top nav */}
      <div className="mb-6">
        <Link
          href="/blogs"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to blogs
        </Link>
      </div>

      {/* Cover */}
      <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="relative h-60 w-full bg-gray-100 sm:h-85">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No thumbnail
            </div>
          )}

          {/* Badges */}
          <div className="absolute left-4 top-4 flex gap-2">
            {post.isFeatured && (
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                Featured
              </span>
            )}
            {post.status && post.status !== "PUBLISHED" && (
              <span className="rounded-full bg-gray-900/80 px-3 py-1 text-xs font-semibold text-white">
                {post.status}
              </span>
            )}
          </div>
        </div>

        {/* Content wrapper */}
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <article>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              {/* <time dateTime={new Date(post?.createdAt).toISOString()}>
                {formatDate(post.createdAt)}
              </time> */}

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span>{post.views?.toLocaleString?.() ?? 0} views</span>

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span>{minutes} min read</span>
            </div>

            {/* Body */}
            <div className="prose prose-gray mt-6 max-w-none">
              {/* If your content is plain text */}
              <p className="whitespace-pre-line">{post.content}</p>

              {/* If your content is HTML from DB, use dangerouslySetInnerHTML safely:
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  (Only if sanitized!)
              */}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Tags */}
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">Tags</h3>

              {post.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-600">No tags</p>
              )}
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">
                Quick actions
              </h3>

              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/blogs"
                  className="rounded-xl border px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Browse more posts
                </Link>

                <a
                  href="#"
                  className="rounded-xl border px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Share (add later)
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default DynamicBlogPage;
