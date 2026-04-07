import Link from "next/link";

type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  description,
  crumbs,
}: {
  title: string;
  description?: string;
  crumbs: Crumb[];
}) {
  return (
    <header className="border-b border-black/5 bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <nav className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-black/20">/</span>}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-brand"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-lg leading-[1.75] text-gray-600">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
