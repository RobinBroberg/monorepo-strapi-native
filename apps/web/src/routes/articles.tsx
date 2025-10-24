import { createFileRoute, Link } from "@tanstack/react-router";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Article } from "@/types";

export const Route = createFileRoute("/articles")({
  loader: async () => {
    const res = await fetch("http://localhost:1337/api/articles");
    const data = await res.json();
    return { articles: data.data } satisfies { articles: Article[] };
  },
  component: ArticlesPage,
});

function ArticlesPage() {
  const { articles } = Route.useLoaderData();

  return (
    <main className="mx-auto max-w-6xl p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Articles</h1>

      <ul className="columns-1 sm:columns-2 gap-6 space-y-6">
        {articles.map((a: Article) => (
          <li key={a.id} className="break-inside-avoid mb-6">
            <Link
              to="/articles/$slug"
              params={{ slug: a.slug }}
              className="block rounded-2xl bg-white shadow-xl  transition-all duration-200 hover:-translate-y-1 overflow-hidden"
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
    </main>
  );
}
