import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer2/generated";
import Link from "next/link";
import { Mdx } from "@/components/Mdx";
import { BlogPostViewTracker } from "@/components/BlogPostViewTracker";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white pb-20 pt-8 sm:pb-24">
      <BlogPostViewTracker slug={post.slug} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <span className="mx-2 text-black/20">/</span>
          <Link href="/blog" className="hover:text-brand">
            Blog
          </Link>
          <span className="mx-2 text-black/20">/</span>
          <span className="text-ink">{post.title}</span>
        </nav>
        <header className="mt-8">
          <p className="text-sm font-medium text-brand">{date}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{post.description}</p>
        </header>
        <div className="prose-divider mt-10 border-t border-black/10 pt-10">
          <Mdx code={post.body.code} />
        </div>
        <div className="mt-12">
          <Link
            href="/blog"
            className="text-sm font-semibold text-brand hover:underline"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    </article>
  );
}
