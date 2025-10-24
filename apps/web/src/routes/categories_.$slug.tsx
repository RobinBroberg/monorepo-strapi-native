import { createFileRoute, Link } from "@tanstack/react-router";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { Article, Category } from "../types";

type LoaderData = {
  category: Category;
  articles: Article[];
};

export const Route = createFileRoute("/categories_/$slug")({
  // @ts-expect-error
  loader: async ({ params }) => {
    const res = await fetch(
      `http://localhost:1337/api/categories?filters[slug][$eq]=${params.slug}&populate=articles`
    );
    const data = await res.json();
    const category = data.data[0] as Category;
    return {
      category: category,
      articles: category?.articles ?? [],
    } satisfies LoaderData;
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, articles } = Route.useLoaderData() as LoaderData;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold mb-6">
        {category ? category.name : "Category"}
      </h1>

      {articles.length === 0 ? (
        <p>No articles in this category.</p>
      ) : (
        <ul className="columns-1 sm:columns-2 gap-6 space-y-6 list-none p-0 m-0">
          {articles.map((a) => (
            <li key={a.id} className="break-inside-avoid mb-6">
              <Link
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="block rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 overflow-hidden"
              >
                <article>
                  <header className="p-5 border-b border-gray-100">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                      {a.title}
                    </h2>
                  </header>
                  <div className="prose prose-sm p-5 text-gray-600">
                    <BlocksRenderer content={a.content || []} />
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
