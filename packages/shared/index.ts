export async function fetchArticles() {
  const res = await fetch("http://localhost:1337/api/articles");
  if (!res.ok) throw new Error("Failed to fetch articles");
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}
