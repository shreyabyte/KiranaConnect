import { MOCK_STORES, MOCK_PRODUCTS } from "../constants";

const buildLocalChatReply = (query: string) => {
  const lower = query.toLowerCase();
  const keywords = [
    "milk",
    "paneer",
    "dairy",
    "atta",
    "flour",
    "rice",
    "oil",
    "pickle",
    "achar",
    "sweet",
    "laddu",
    "ladoo",
    "cake",
    "bread",
    "cookie"
  ];

  const matchedKeyword = keywords.find(k => lower.includes(k));

  let relevantProducts = MOCK_PRODUCTS;
  if (matchedKeyword) {
    relevantProducts = MOCK_PRODUCTS.filter(p => {
      const name = p.name.toLowerCase();
      const category = p.category.toLowerCase();
      return name.includes(matchedKeyword) || category.includes(matchedKeyword);
    });
  }

  if (relevantProducts.length === 0) {
    relevantProducts = MOCK_PRODUCTS;
  }

  const storeMap = new Map<string, { storeName: string; distance: string; rating: number; }>();

  for (const product of relevantProducts) {
    if (!storeMap.has(product.storeId)) {
      const store = MOCK_STORES.find(s => s.id === product.storeId);
      if (store) {
        storeMap.set(product.storeId, {
          storeName: store.name,
          distance: store.distance,
          rating: store.rating,
        });
      }
    }
  }

  const rankedStores = Array.from(storeMap.values())
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  if (rankedStores.length === 0) {
    return "I'm in demo mode right now, but you can explore the neighborhood stores above – look for the orange 'Best Price' badge for the sharpest deals!";
  }

  const intro = matchedKeyword
    ? `Here's how I'd shop for ${matchedKeyword} around you right now:`
    : "Here's how I'd explore your neighborhood kirana options:";

  const bullets = rankedStores
    .map((s, idx) => `${idx + 1}. ${s.storeName} (★${s.rating.toFixed(1)}, ~${s.distance})`)
    .join("\n");

  return `${intro}\n\n${bullets}\n\nTip: KiranaConnect connects you to real neighborhood families, not cold dark stores – try mixing one big monthly order with quick top-ups for fresh items like milk, dahi and bread.`;
};

export const getPriceTrendAnalysis = async (productName: string) => {
  return `For ${productName}, local kirana prices usually stay fairly stable with a small bump during major festivals. If you see a good offer from your trusted neighborhood shop, it's usually safe to stock up for 2–4 weeks without worrying about big price swings.`;
};

export const generateProductImage = async (_productDescription: string) => {
  // Basic mode: no AI image generation, just fall back to the default placeholder image
  return null;
};

export const getChatResponse = async (query: string, _history: { role: 'user' | 'model', text: string }[]) => {
  // Purely local "AI" that responds using mock store & product data
  return buildLocalChatReply(query);
};
