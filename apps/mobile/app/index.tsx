import { useEffect, useState } from "react";
import { FlatList, View, Text, Image } from "react-native";

type Article = {
  id: number;
  title: string;
  content?: any;
  slug?: string;
};

export default function Hopme() {
  const [articles, setArticles] = useState<Article[]>([]);

  async function load() {
    const res = await fetch("http://localhost:1337/api/articles");
    const data = await res.json();
    setArticles(Array.isArray(data.data) ? data.data : []);
  }

  useEffect(() => {
    load();
  }, []);

  //Det verkar inte finnas nån block renderer för react native
  // den här funktionen plockar bara ut texten och bilderna från artikeln (Tack ChatGpt)
  function renderContent(blocks: any[]) {
    if (!Array.isArray(blocks)) return null;

    return blocks.map((block, i) => {
      if (block.type === "image" && block.image?.url) {
        return (
          <Image
            key={i}
            source={{ uri: block.image.url }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 8,
              marginVertical: 8,
              backgroundColor: "#eee",
            }}
            resizeMode="cover"
          />
        );
      }
      const text = block.children?.map((c: any) => c.text).join(" ") ?? "";
      return (
        <Text key={i} style={{ fontSize: 16, marginBottom: 4 }}>
          {text}
        </Text>
      );
    });
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.title}
            </Text>
            {renderContent(item.content)}
          </View>
        )}
      />
    </View>
  );
}
