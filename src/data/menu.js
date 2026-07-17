export const menuCategories = ["All", "Mains", "Soups", "Grills", "Sides", "Drinks"];

export const menuItems = [
  {
    id: 1, category: "Mains",
    name: "Smoky Jollof & Suya Chicken",
    desc: "Party jollof with suya-spiced grilled chicken, crispy plantain & fresh coleslaw",
    price: 8500, emoji: "🍛", tag: "bestseller", time: "20 min",
    image: "https://images.unsplash.com/photo-1603496987674-79600a000f55?w=600&q=80",
    extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
  },
  {
    id: 2, category: "Soups",
    name: "Egusi & Assorted",
    desc: "Rich ground melon seed soup with assorted meat, stockfish & pounded yam",
    price: 5200, emoji: "🍲", tag: "chef's pick", time: "15 min",
    image: "/images/egusi soup.png",
    hasSwallow: true,
swallows: [
   { name:"Eba",         price:0   },  // 0 = included in base price
    { name:"Pounded Yam", price:200 },  // small premium for pounded yam
    { name:"Wheat",       price:200 },
    { name:"Amala",       price:0   },
    { name:"Fufu",        price:0   },
    { name:"Semo",        price:0   },
  ],
  extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
},
  {
    id: 3, category: "Grills",
    name: "Suya Platter",
    desc: "Spiced skewered beef with sliced onions, tomatoes & signature yaji spice",
    price: 5000, emoji: "🍖", tag: "spicy", time: "25 min",
    image: "/images/suyaplatter.png"
  },
  {
    id: 4, category: "Soups",
    name: "Banga Soup",
    desc: "Palm nut soup with fresh catfish, crayfish & native spices. Served with starch",
    price: 5800, emoji: "🥘", tag: null, time: "20 min",
    image: "/images/banga soup.png",
    hasSwallow: true,
    swallows: [
   { name:"Eba",         price:0   },  // 0 = included in base price
    { name:"Pounded Yam", price:200 },  // small premium for pounded yam
    { name:"Wheat",       price:200 },
    { name:"Amala",       price:0   },
    { name:"Fufu",        price:0   },
    { name:"Semo",        price:0   },
  ],
  extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
},
  // {
  //   id: 5, category: "Mains",
  //   name: "Ofada Rice & Ayamase",
  //   desc: "Native ofada rice with green pepper designer stew and assorted offals",
  //   price: 4200, emoji: "🍚", tag: "new", time: "20 min",
  //   image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&q=80"
  // },
  // {
  //   id: 6, category: "Sides",
  //   name: "Peppered Snail",
  //   desc: "Giant Congo snails in our signature pepper sauce, grilled to perfection",
  //   price: 6500, emoji: "🐌", tag: "premium", time: "30 min",
  //   image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80"
  // },
  {
    id: 7, category: "Sides",
    name: "Moi Moi",
    desc: "Steamed bean pudding with egg, fish & peppers wrapped in banana leaves",
    price: 1800, emoji: "🌿", tag: null, time: "10 min",
    image: "/images/moimoi.png"
  },

  {
    id: 8, category: "Sides",
    name: "Fried Plantain",
    desc: "Sweet golden-fried ripe plantain with house chilli dipping sauce",
    price: 1200, emoji: "🍌", tag: null, time: "10 min",
    image: "/images/friedplaintain.png"
  },
  {
    id: 9, category: "Drinks",
    name: "Missisippi punch ",
    desc: "A smooth, fruity cocktail with a refreshing citrus finish",
    price: 2500, emoji: "🥤", tag: "house special", time: "5 min",
    image: "/images/missisippi punch.png"
  },
  {
    id: 24, category: "Drinks",
    name: "Magarita ",
    desc: "A timeless blend of tequila, fresh lime, and orange liqueur, served with a salted rim for the perfect balance of sweet, sour, and refreshing.",
    price: 3500, emoji: "🥤", tag: "house special", time: "5 min",
    image: "/images/magarita.png"
  },
  {
    id: 25, category: "Drinks",
    name: "Chilton Cocktail",
    desc: "A crisp, refreshing mix of vodka, fresh lemon juice, and sparkling soda, finished with a salted rim for a clean, zesty taste.",
    price: 4500, emoji: "🥤", tag: "house special", time: "5 min",
    image: "/images/chilton cocktail.png"
  },
  {
    id: 26, category: "Drinks",
    name: "Black-Eyed Susan",
    desc: "A bright and fruity cocktail combining vodka, rum, citrus juices, and a touch of sweetness for a refreshing, crowd-pleasing sip.",
    price: 4500, emoji: "🥤", tag: "house special", time: "5 min",
    image: "/images/black-eyed susan.png"
  },
  {
    id: 27, category: "Drinks",
    name: "Rum Runner",
    desc: "A tropical favorite blending rum with banana and blackberry liqueurs, finished with fresh fruit juices for a sweet island-inspired escape.",
    price: 1500, emoji: "🥤", tag: "house special", time: "5 min",
    image: "/images/missisippi punch.png"
  },
  
  {
    id: 10, category: "Soups",
    name: "Pepper Soup",
    desc: "Native spiced broth — deeply aromatic, warming and restorative.",
    emoji: "🍲", tag: "spicy", time: "20 min",
    hasVariants: true,
    hasSwallow: false,
    variants: [
      { label:"Beef",    price:3200, image:"/images/beefpeppersoup.png" },
      { label:"Chicken", price:3000, image:"/images/chickenpeppersoup.png" },
      { label:"Catfish", price:3800, image:"/images/catfishpeppersoup.png" },
    ],
  },
  // {
  //   id: 11, category: "Mains",
  //   name: "Pounded Yam & Vegetable Soup",
  //   desc: "Vegetable soup with assorted meat & ponmo, served with smooth pounded yam",
  //   price: 5500, emoji: "🍲", tag: null, time: "20 min",
  //   image: "https://images.unsplash.com/photo-1673465580365-b96bef916770?w=600&q=80"
  // },
  {
    id: 12, category: "Drinks",
    name: "Cocktails",
    desc: "Iced fruit cocktails made fresh daily",
    price: 4500, emoji: "🍹", tag: "house special", time: "5 min",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80"
  },
  {
    id: 13, category: "Drinks",
    name: "Smoothies",
    desc: "Fresh strawberry & mixed fruit smoothies",
    price: 4500, emoji: "🥤", tag: null, time: "5 min",
    image: "https://images.unsplash.com/photo-1621797350488-fb28c9217e3b?w=600&q=80"
  },
  {
    id: 14, category: "Mains",
    name: "Yam and Pepper Sauce",
    desc: "Boiled soft Yam, Egg, Fish and Pepper Sauce  ",
    price: 4200, emoji: "🍚", tag: "new", time: "20 min",
    image: "/images/boiledyamandeggstew.png"
  },
    {
    id: 15, category: "Mains",
    name: "Coconut Rice",
    desc: "Coconut Rice with plaintain, assorted meat",
    price: 6200, emoji: "🍚", tag: "new", time: "20 min",
    image: "/images/coconut rice with beef.png",
    extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
  },
   {
    id: 16, category: "Mains",
    name: "Fried Rice",
    desc: "Fried Rice with Chicken",
    price: 6500, emoji: "🍚", tag: "new", time: "20 min",
    image: "/images/fried rice and chicken.png",
    extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
  },
  {
    id: 17, category: "Grills",
    name: "Roasted Turkey",
    desc: "Glazed Peppered Raosted Turkey",
    price: 4500, emoji: "🍖", tag: "new", time: "20 min",
    image: "/images/glazed roasted turkey.png"
  },
   {
    id: 18, category: "Mains",
    name: "Ofada rice",
    desc: "Ofada Rice with Ayamashe sauce",
    price: 6000, emoji: "🍚", tag: "new", time: "20 min",
    image: "/images/ofada and ayamashe.png",
    extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
  },
   {
    id: 19, category: "Sides",
    name: "Peppered Snail",
    desc: "Spicy Peppered Snail",
    price: 5200, emoji: "🍚", tag: "new", time: "20 min",
    image: "/images/peperedsnail.png"
  },
  {
    id: 20, category: "Mains",
    name: "Beef Pasta",
    desc: "Spicy ",
    price: 5200, emoji: "🍚", tag: "new", time: "20 min",
    image: "/images/spicy beef pasta.png",
    extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
  },

  {
    id: 23, category: "Mains",
    name: "White Rice and sauce",
    desc: "White rice and pepper sauce with assorted meats, eggs and plaintain",
    price: 5200, emoji: "🍌", tag: null, time: "10 min",
    image: "/images/whitericewithpepperplaintain.png",
    extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
  },
  {
    id: 21, category: "Mains",
    name: "Spicy Noodles",
    desc: "Spicy Beef Noodles with chicken ",
    price: 3200, emoji: "🍚", tag: "new", time: "20 min",
    image: "/images/spicy noodles with beef.png",
    extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
  },
{
    id: 22, category: "Soups",
    name: "Vegetable soup  & Assorted",
    desc: "Rich vegetable soup with assorted meat",
    price: 5200, emoji: "🍲", tag: "chef's pick", time: "15 min",
    image: "/images/vegetable soup.png",
    hasSwallow: true,
    swallows: [
  { name:"Eba",         price:0   },  // 0 = included in base price
    { name:"Pounded Yam", price:200 },  // small premium for pounded yam
    { name:"Wheat",       price:200 },
    { name:"Amala",       price:0   },
    { name:"Fufu",        price:0   },
    { name:"Semo",        price:0   },
  ],
  extraProteins: [
    { name:"Extra Meat",    price:800  },
    { name:"Chicken",       price:1200 },
    { name:"Turkey",        price:1500 },
  ],
},
]