import type { Metadata } from "next";
import { allPosts } from "contentlayer2/generated";
import { PageHeader } from "@/components/PageHeader";
import { BlogCard } from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Insights & Updates",
  description:
    "Perspectives on OCPP, fleet electrification, and sustainable logistics from Augmentaa Digital.",
};

export default function BlogIndexPage() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <PageHeader
        title="Blog"
        description="Practical notes for operators modernising charging and fleet operations in India."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
