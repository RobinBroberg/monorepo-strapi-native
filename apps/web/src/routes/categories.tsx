import { createFileRoute, Link } from "@tanstack/react-router";
import type { Category } from "../types";

export const Route = createFileRoute("/categories")({
  loader: async () => {
    const res = await fetch("http://localhost:1337/api/categories");
    const data = await res.json();
    return { categories: data.data } satisfies { categories: Category[] };
  },
  component: CategoriesPage,
});

function CategoriesPage() {
  const { categories } = Route.useLoaderData();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <ul className="grid gap-6 sm:grid-cols-2 list-none p-0 m-0">
        {categories.map((c: Category) => (
          <li key={c.id}>
            <Link
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="block rounded-2xl bg-white border shadow hover:shadow-lg transition-shadow p-5"
            >
              <h2 className="text-lg font-semibold">{c.name}</h2>
              {Array.isArray(c.articles) && (
                <p className="text-sm opacity-70 mt-1">
                  {c.articles.length} article(s)
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
