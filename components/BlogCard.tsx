import Link from "next/link";
import type { Post } from "contentlayer2/generated";

export function BlogCard({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="card-premium group flex h-full flex-col bg-[#E8F5F1] p-6">
      <span className="card-premium-topline" />
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {date}
      </p>
      <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink group-hover:text-[#00C9A7]">
        <Link href={post.url}>{post.title}</Link>
      </h2>
      <p className="mt-2 flex-1 text-sm leading-[1.75] text-gray-600">
        {post.description}
      </p>
      <Link
        href={post.url}
        data-umami-event="blog-read-more"
        data-umami-event-slug={post.slug}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink after:block after:h-0.5 after:w-0 after:bg-[#00C9A7] after:transition-all group-hover:text-[#00C9A7] group-hover:after:w-full"
      >
        Read more →
      </Link>
    </article>
  );
}
