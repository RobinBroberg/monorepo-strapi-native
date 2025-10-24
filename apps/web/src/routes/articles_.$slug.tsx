import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const Route = createFileRoute("/articles_/$slug")({
  loader: async ({ params }) => {
    const res = await fetch(
      `http://localhost:1337/api/articles?filters[slug][$eq]=${params.slug}&populate=category`
    );
    const data = await res.json();
    const article = data.data?.[0];
    return { article };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };

  if (!article) return <p>Article not found.</p>;

  return (
    <main className="max-w-3xl mx-auto p-6 prose bg-white mt-5 rounded-md">
      <h1 className="mb-2">{article.title}</h1>

      {article.category && (
        <p className="text-sm text-gray-500 mb-6 ">
          Category: {article.category.name}
        </p>
      )}

      <BlocksRenderer content={article.content || []} />
    </main>
  );
}
