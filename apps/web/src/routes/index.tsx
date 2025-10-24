import { createFileRoute, Link } from "@tanstack/react-router";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const Route = createFileRoute("/")({
  loader: async () => {
    const res = await fetch("http://localhost:1337/api/homepage");
    const data = await res.json();
    const homepage = data.data;
    return { homepage };
  },
  component: HomePage,
});

function HomePage() {
  const { homepage } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold mb-6">Startsida</h1>

      <nav className="flex gap-4 mb-8">
        <Link
          to="/articles"
          className="px-4 py-2 bg-blue-600 text-white rounded "
        >
          Articles
        </Link>
        <Link
          to="/categories"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Categories
        </Link>
      </nav>

      <BlocksRenderer content={homepage.home || []} />
    </main>
  );
}
