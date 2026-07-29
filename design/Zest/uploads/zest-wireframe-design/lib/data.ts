export type Recipe = {
  id: string
  title: string
  image: string
  author: string
  authorAvatar: string
  category: "breakfast" | "lunch" | "dinner" | "quick" | "healthy"
  tags: string[]
  time: string
  difficulty: string
  servings: number
  description: string
  ingredients: { group?: string; items: { name: string; amount: string }[] }[]
  steps: string[]
  saves: number
}

export const recipes: Recipe[] = [
  {
    id: "citrus-avocado-salad",
    title: "Citrus & Avocado Salad",
    image: "/recipes/citrus-salad.png",
    author: "Lucía Moreno",
    authorAvatar: "/avatars/avatar-1.png",
    category: "healthy",
    tags: ["Vegan", "Gluten-free", "Fresh"],
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    description:
      "A bright, zesty salad that balances creamy avocado with juicy blood orange and a citrus vinaigrette. The perfect light lunch.",
    ingredients: [
      {
        items: [
          { name: "Blood oranges", amount: "2" },
          { name: "Ripe avocado", amount: "1" },
          { name: "Mixed greens", amount: "4 cups" },
          { name: "Red onion, thinly sliced", amount: "1/4" },
          { name: "Pistachios", amount: "1/4 cup" },
        ],
      },
      {
        group: "Vinaigrette",
        items: [
          { name: "Olive oil", amount: "3 tbsp" },
          { name: "Fresh lemon juice", amount: "2 tbsp" },
          { name: "Honey", amount: "1 tsp" },
          { name: "Salt & pepper", amount: "to taste" },
        ],
      },
    ],
    steps: [
      "Segment the blood oranges over a bowl to catch the juice.",
      "Whisk the vinaigrette ingredients with the reserved orange juice.",
      "Arrange greens on a platter, then layer avocado slices and orange segments.",
      "Scatter red onion and pistachios on top.",
      "Drizzle with the vinaigrette and serve immediately.",
    ],
    saves: 1240,
  },
  {
    id: "lemon-ricotta-pancakes",
    title: "Lemon Ricotta Pancakes",
    image: "/recipes/pancakes.png",
    author: "Marco Silva",
    authorAvatar: "/avatars/avatar-2.png",
    category: "breakfast",
    tags: ["Brunch", "Vegetarian"],
    time: "30 min",
    difficulty: "Easy",
    servings: 4,
    description:
      "Fluffy, tangy ricotta pancakes brightened with lemon zest and topped with fresh berries. A weekend staple.",
    ingredients: [
      {
        items: [
          { name: "Ricotta cheese", amount: "1 cup" },
          { name: "Eggs", amount: "3" },
          { name: "All-purpose flour", amount: "3/4 cup" },
          { name: "Lemon zest", amount: "2 tbsp" },
          { name: "Mixed berries", amount: "1 cup" },
        ],
      },
    ],
    steps: [
      "Separate eggs; whisk yolks with ricotta and lemon zest.",
      "Fold in flour until just combined.",
      "Beat egg whites to soft peaks and fold into the batter.",
      "Cook spoonfuls on a buttered skillet until golden on both sides.",
      "Serve stacked with berries and a dusting of powdered sugar.",
    ],
    saves: 980,
  },
  {
    id: "lemon-garlic-pasta",
    title: "Lemon Garlic Pasta",
    image: "/recipes/pasta.png",
    author: "Lucía Moreno",
    authorAvatar: "/avatars/avatar-1.png",
    category: "dinner",
    tags: ["Comfort", "Vegetarian"],
    time: "25 min",
    difficulty: "Easy",
    servings: 4,
    description:
      "Silky pasta tossed in a bright lemon-garlic sauce with parmesan and fresh herbs. Simple weeknight elegance.",
    ingredients: [
      {
        items: [
          { name: "Spaghetti", amount: "400 g" },
          { name: "Garlic cloves", amount: "4" },
          { name: "Lemon", amount: "1" },
          { name: "Parmesan", amount: "1/2 cup" },
          { name: "Fresh parsley", amount: "1/4 cup" },
        ],
      },
    ],
    steps: [
      "Cook pasta until al dente, reserving 1 cup of pasta water.",
      "Sauté garlic in olive oil until fragrant.",
      "Add lemon juice, zest, and a splash of pasta water.",
      "Toss in pasta and parmesan until glossy.",
      "Finish with parsley and cracked pepper.",
    ],
    saves: 2100,
  },
  {
    id: "rainbow-buddha-bowl",
    title: "Rainbow Buddha Bowl",
    image: "/recipes/buddha-bowl.png",
    author: "Marco Silva",
    authorAvatar: "/avatars/avatar-2.png",
    category: "healthy",
    tags: ["Vegan", "Meal prep", "Protein"],
    time: "40 min",
    difficulty: "Medium",
    servings: 2,
    description:
      "A nourishing bowl of roasted vegetables, quinoa, and chickpeas finished with a creamy tahini dressing.",
    ingredients: [
      {
        items: [
          { name: "Quinoa", amount: "1 cup" },
          { name: "Chickpeas", amount: "1 can" },
          { name: "Sweet potato", amount: "1" },
          { name: "Kale", amount: "2 cups" },
          { name: "Tahini", amount: "3 tbsp" },
        ],
      },
    ],
    steps: [
      "Roast cubed sweet potato and chickpeas until crisp.",
      "Cook quinoa according to package directions.",
      "Massage kale with olive oil and lemon.",
      "Whisk tahini with lemon juice and water until pourable.",
      "Assemble bowls and drizzle with dressing.",
    ],
    saves: 1560,
  },
  {
    id: "baja-fish-tacos",
    title: "Baja Fish Tacos",
    image: "/recipes/tacos.png",
    author: "Lucía Moreno",
    authorAvatar: "/avatars/avatar-1.png",
    category: "lunch",
    tags: ["Quick", "Pescatarian"],
    time: "20 min",
    difficulty: "Easy",
    servings: 3,
    description:
      "Crisp fish tacos with a tangy lime cabbage slaw and cilantro. Bright, fresh, and ready in twenty minutes.",
    ingredients: [
      {
        items: [
          { name: "White fish fillets", amount: "400 g" },
          { name: "Corn tortillas", amount: "6" },
          { name: "Cabbage", amount: "2 cups" },
          { name: "Lime", amount: "2" },
          { name: "Cilantro", amount: "1/4 cup" },
        ],
      },
    ],
    steps: [
      "Season and pan-sear the fish until flaky.",
      "Toss shredded cabbage with lime juice and salt.",
      "Warm the tortillas in a dry skillet.",
      "Flake fish into tortillas and top with slaw.",
      "Finish with cilantro and a squeeze of lime.",
    ],
    saves: 870,
  },
  {
    id: "mango-citrus-smoothie-bowl",
    title: "Mango Citrus Smoothie Bowl",
    image: "/recipes/smoothie.png",
    author: "Marco Silva",
    authorAvatar: "/avatars/avatar-2.png",
    category: "quick",
    tags: ["Vegan", "5-ingredient", "Breakfast"],
    time: "10 min",
    difficulty: "Easy",
    servings: 1,
    description:
      "A sunny smoothie bowl blending mango and orange, topped with granola and fresh fruit for crunch.",
    ingredients: [
      {
        items: [
          { name: "Frozen mango", amount: "1 cup" },
          { name: "Orange juice", amount: "1/2 cup" },
          { name: "Banana", amount: "1" },
          { name: "Granola", amount: "1/4 cup" },
          { name: "Fresh berries", amount: "1/4 cup" },
        ],
      },
    ],
    steps: [
      "Blend mango, banana, and orange juice until thick.",
      "Pour into a chilled bowl.",
      "Top with granola and fresh berries.",
      "Serve immediately with a spoon.",
    ],
    saves: 640,
  },
  {
    id: "lemon-herb-roast-chicken",
    title: "Lemon Herb Roast Chicken",
    image: "/recipes/roast-chicken.png",
    author: "Lucía Moreno",
    authorAvatar: "/avatars/avatar-1.png",
    category: "dinner",
    tags: ["Sunday roast", "Family"],
    time: "1 hr 30 min",
    difficulty: "Medium",
    servings: 6,
    description:
      "Golden, juicy roast chicken infused with lemon and herbs, surrounded by caramelized vegetables.",
    ingredients: [
      {
        items: [
          { name: "Whole chicken", amount: "1.5 kg" },
          { name: "Lemons", amount: "2" },
          { name: "Fresh thyme", amount: "1 bunch" },
          { name: "Garlic head", amount: "1" },
          { name: "Root vegetables", amount: "500 g" },
        ],
      },
    ],
    steps: [
      "Pat chicken dry and season generously.",
      "Stuff cavity with lemon halves and thyme.",
      "Arrange vegetables in a roasting pan.",
      "Roast at 200°C until the juices run clear.",
      "Rest before carving and serving.",
    ],
    saves: 3200,
  },
  {
    id: "vegan-lemon-tart",
    title: "Vegan Lemon Tart",
    image: "/recipes/dessert.png",
    author: "Marco Silva",
    authorAvatar: "/avatars/avatar-2.png",
    category: "dinner",
    tags: ["Vegan", "Dessert", "Citrus"],
    time: "50 min",
    difficulty: "Medium",
    servings: 8,
    description:
      "A silky vegan lemon tart with a crisp crust and bright citrus curd, topped with fresh berries.",
    ingredients: [
      {
        items: [
          { name: "Cashews", amount: "1.5 cups" },
          { name: "Lemons", amount: "3" },
          { name: "Coconut cream", amount: "1/2 cup" },
          { name: "Maple syrup", amount: "1/3 cup" },
          { name: "Almond flour", amount: "1.5 cups" },
        ],
      },
    ],
    steps: [
      "Blend almond flour crust and press into a tart pan.",
      "Blend soaked cashews with lemon, coconut cream, and maple.",
      "Pour filling into the crust.",
      "Chill until set, at least 4 hours.",
      "Top with berries before serving.",
    ],
    saves: 1120,
  },
]

export const categories = [
  { id: "all", label: "All" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "quick", label: "Quick" },
  { id: "healthy", label: "Healthy" },
] as const

export type Collection = {
  id: string
  name: string
  cover: string
  count: number
  accent: "grapefruit" | "lemon" | "lime" | "coral"
}

export const collections: Collection[] = [
  { id: "postres-veganos", name: "Postres Veganos", cover: "/recipes/dessert.png", count: 12, accent: "grapefruit" },
  { id: "favoritos", name: "Favoritos", cover: "/recipes/pasta.png", count: 28, accent: "lemon" },
  { id: "desayunos", name: "Desayunos", cover: "/recipes/pancakes.png", count: 9, accent: "lime" },
  { id: "comida-rapida", name: "Comida Rápida", cover: "/recipes/tacos.png", count: 15, accent: "coral" },
  { id: "saludable", name: "Saludable", cover: "/recipes/buddha-bowl.png", count: 21, accent: "lime" },
  { id: "para-compartir", name: "Para Compartir", cover: "/recipes/roast-chicken.png", count: 7, accent: "grapefruit" },
]

export function getRecipe(id: string) {
  return recipes.find((r) => r.id === id)
}
