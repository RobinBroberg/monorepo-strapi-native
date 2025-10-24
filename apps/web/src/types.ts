import type { BlocksContent } from "@strapi/blocks-react-renderer";

export type Category = {
  id: number;
  name: string;
  slug: string;
  articles?: Article[];
};

export type Article = {
  id: number;
  title: string;
  slug: string;
  content: BlocksContent;
  category: Category;
};
