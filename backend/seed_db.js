import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

const db = admin.firestore();

const categories = [
  { name: "Yoga Essentials", slug: "yoga-essentials" },
  { name: "Crystal & Aura", slug: "crystal-aura" },
  { name: "Meditation Accessories", slug: "meditation-accessories" },
  { name: "Energy Healing", slug: "energy-healing" },
  { name: "Aromatherapy", slug: "aromatherapy" },
  { name: "Ayurveda Wellness", slug: "ayurveda-wellness" },
  { name: "Spiritual Essentials", slug: "spiritual-essentials" },
  { name: "Premium Healing Kits", slug: "premium-healing-kits" },
  { name: "Combo Wellness Bundles", slug: "combo-wellness-bundles" }
];

const products = [
  // Yoga Essentials
  {
    name: "Eco-Grip Organic Jute Mat",
    description: "Crafted from hand-harvested organic jute fibers and natural tree rubber. Features custom alignment markers etched into the surface to guide your asanas, with a non-slip, premium textured grip.",
    price: 3499,
    image_url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=600",
    stock: 25,
    is_featured: false,
    slug: "eco-grip-organic-jute-mat",
    category_slug: "yoga-essentials",
    rating: 4.9,
    reviews: 148,
    discount: 15,
    old_price: 4120
  },
  {
    name: "Cork Yoga Block Duo",
    description: "Set of two high-density, sustainably harvested cork yoga blocks. Provides stable support, firm grip, and natural antimicrobial properties for your alignment and stretching rituals.",
    price: 1499,
    image_url: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&q=80&w=600",
    stock: 40,
    is_featured: false,
    slug: "cork-yoga-block-duo",
    category_slug: "yoga-essentials",
    rating: 4.7,
    reviews: 86,
    discount: 10,
    old_price: 1665
  },
  // Crystal & Aura
  {
    name: "Amethyst Clusters Sound Bath Kit",
    description: "Deep purple natural Uruguayan Amethyst cluster, paired with a hand-hammered mini Tibetan brass singing bowl. Perfect for cleansing negative auric fields and charging your third-eye chakra.",
    price: 4200,
    image_url: "https://images.unsplash.com/photo-1567861911437-538298e4232c?auto=format&fit=crop&q=80&w=600",
    stock: 15,
    is_featured: true, // Pro exclusive
    slug: "amethyst-clusters-sound-bath-kit",
    category_slug: "crystal-aura",
    rating: 4.9,
    reviews: 215,
    discount: 20,
    old_price: 5250
  },
  {
    name: "Raw Rose Quartz Heart Core",
    description: "Exquisite raw Rose Quartz crystal selected for its soft pink hue. Emits calming vibrations to open your heart chakra (Anahata), encouraging self-love, emotional healing, and deep peace.",
    price: 1899,
    image_url: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=600",
    stock: 20,
    is_featured: false,
    slug: "raw-rose-quartz-heart-core",
    category_slug: "crystal-aura",
    rating: 4.8,
    reviews: 94,
    discount: 5,
    old_price: 1999
  },
  // Meditation Accessories
  {
    name: "Zabuton & Zafu Cushion Set",
    description: "Ergonomic meditation cushions stuffed with 100% organic buckwheat hulls. Hand-stitched soft cotton cover designed to align your spine and support knees during prolonged Zen meditation sessions.",
    price: 5999,
    image_url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600",
    stock: 12,
    is_featured: true, // Pro exclusive
    slug: "zabuton-zafu-cushion-set",
    category_slug: "meditation-accessories",
    rating: 4.9,
    reviews: 130,
    discount: 10,
    old_price: 6665
  },
  {
    name: "Tibetan Singing Bowl (7 Metals)",
    description: "Handcrafted in Nepal using an ancient alloy of 7 cosmic metals. Resonates with a rich, long-lasting harmonic drone to instantly transition your mind into a deep alpha-wave meditative state.",
    price: 2800,
    image_url: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&q=80&w=600",
    stock: 18,
    is_featured: false,
    slug: "tibetan-singing-bowl-7-metals",
    category_slug: "meditation-accessories",
    rating: 4.8,
    reviews: 112,
    discount: 15,
    old_price: 3290
  },
  // Energy Healing
  {
    name: "Chakra Balancing Crystal Wand",
    description: "Double-terminated Clear Quartz wand embedded with seven chakra gemstones: Red Jasper, Carnelian, Yellow Jade, Green Aventurine, Lapis Lazuli, Amethyst, and Clear Quartz for energy amplification.",
    price: 2499,
    image_url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=600",
    stock: 15,
    is_featured: false,
    slug: "chakra-balancing-crystal-wand",
    category_slug: "energy-healing",
    rating: 4.6,
    reviews: 58,
    discount: 10,
    old_price: 2775
  },
  {
    name: "Copper Sacred Geometry Grid",
    description: "Pure copper energy grid plate laser-cut with the Flower of Life. Placed in your room to coordinate, filter, and amplify positive orgone energies.",
    price: 3200,
    image_url: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=600",
    stock: 10,
    is_featured: true, // Pro exclusive
    slug: "copper-sacred-geometry-grid",
    category_slug: "energy-healing",
    rating: 4.9,
    reviews: 73,
    discount: 20,
    old_price: 4000
  },
  // Aromatherapy
  {
    name: "Royal Sandalwood Incense Ritual",
    description: "Premium Mysore Sandalwood incense cones, hand-rolled with organic honey and essential oils. Includes a custom ceramic lotus burner to channel peaceful smoke plumes.",
    price: 1299,
    image_url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600",
    stock: 50,
    is_featured: false,
    slug: "royal-sandalwood-incense-ritual",
    category_slug: "aromatherapy",
    rating: 4.8,
    reviews: 175,
    discount: 5,
    old_price: 1365
  },
  {
    name: "Ultrasonic Ceramic Mist Diffuser",
    description: "Handcrafted white matte ceramic ultrasonic essential oil diffuser. Operates silently, diffusing natural micro-particles to humidify and scent your sacred space. Features warm ambient glow lighting.",
    price: 3899,
    image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    stock: 22,
    is_featured: true, // Pro exclusive
    slug: "ultrasonic-ceramic-mist-diffuser",
    category_slug: "aromatherapy",
    rating: 4.9,
    reviews: 192,
    discount: 15,
    old_price: 4585
  },
  // Ayurveda Wellness
  {
    name: "Pure Copper Water Pitcher",
    description: "Hand-hammered pure copper water pitcher. In accordance with ancient Ayurvedic principles, storing water overnight in copper (Tamra Jal) balances your three doshas (Vata, Pitta, and Kapha).",
    price: 2999,
    image_url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600",
    stock: 30,
    is_featured: false,
    slug: "pure-copper-ayurvedic-water-pitcher",
    category_slug: "ayurveda-wellness",
    rating: 4.8,
    reviews: 122,
    discount: 10,
    old_price: 3330
  },
  {
    name: "Organic Ashwagandha & Tulsi Elixir",
    description: "Superfood adaptogen elixir formulated with organic Ashwagandha root extract and Holy Basil (Tulsi). Promotes stress relief, immune defense, and calm vitality.",
    price: 1199,
    image_url: "https://images.unsplash.com/photo-1611070973770-b1a60c268ab6?auto=format&fit=crop&q=80&w=600",
    stock: 45,
    is_featured: false,
    slug: "organic-ashwagandha-tulsi-elixir",
    category_slug: "ayurveda-wellness",
    rating: 4.7,
    reviews: 67,
    discount: 0,
    old_price: 1199
  },
  // Premium Healing Kits
  {
    name: "Full Moon Ritual Cleansing Kit",
    description: "A complete spiritual kit containing white sage smudge sticks, sweetgrass braids, palo santo blocks, raw selenite charging sticks, and a natural abalone shell tray.",
    price: 4500,
    image_url: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?auto=format&fit=crop&q=80&w=600",
    stock: 15,
    is_featured: true, // Pro exclusive
    slug: "full-moon-ritual-cleansing-kit",
    category_slug: "premium-healing-kits",
    rating: 4.9,
    reviews: 88,
    discount: 25,
    old_price: 6000
  },
  // Combo Wellness Bundles
  {
    name: "Ultimate Sanctuary Meditation Bundle",
    description: "Bring the yoga studio sanctuary into your home. Includes the Jute Asana Mat, the Zafu Cushion Set, Mysore Sandalwood incense, and a double-terminated Amethyst crystal cluster.",
    price: 8999,
    image_url: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=600",
    stock: 8,
    is_featured: true, // Pro exclusive
    slug: "ultimate-sanctuary-meditation-bundle",
    category_slug: "combo-wellness-bundles",
    rating: 5.0,
    reviews: 44,
    discount: 30,
    old_price: 12850
  }
];

async function seed() {
  console.log("Starting Seeding Process...");

  // 1. Clear existing products and categories
  const productsSnap = await db.collection("products").get();
  console.log(`Deleting ${productsSnap.size} existing products...`);
  const prodBatch = db.batch();
  productsSnap.docs.forEach(doc => prodBatch.delete(doc.ref));
  await prodBatch.commit();

  const categoriesSnap = await db.collection("categories").get();
  console.log(`Deleting ${categoriesSnap.size} existing categories...`);
  const catBatch = db.batch();
  categoriesSnap.docs.forEach(doc => catBatch.delete(doc.ref));
  await catBatch.commit();

  // 2. Seed Categories
  const categoryIdMap = {};
  for (const cat of categories) {
    const docRef = await db.collection("categories").add({
      name: cat.name,
      slug: cat.slug,
      created_at: new Date().toISOString()
    });
    categoryIdMap[cat.slug] = {
      id: docRef.id,
      name: cat.name
    };
    console.log(`Category seeded: ${cat.name} with ID: ${docRef.id}`);
  }

  // 3. Seed Products
  for (const prod of products) {
    const catInfo = categoryIdMap[prod.category_slug];
    const productData = {
      name: prod.name,
      description: prod.description,
      price: prod.price,
      image_url: prod.image_url,
      stock: prod.stock,
      is_featured: prod.is_featured,
      slug: prod.slug,
      rating: prod.rating,
      reviews: prod.reviews,
      discount: prod.discount,
      old_price: prod.old_price,
      category_id: catInfo ? catInfo.id : null,
      categories: catInfo ? { id: catInfo.id, name: catInfo.name } : null,
      created_at: new Date().toISOString()
    };

    const docRef = await db.collection("products").add(productData);
    console.log(`Product seeded: ${prod.name} with ID: ${docRef.id}`);
  }

  console.log("Seeding Completed Successfully! 🧘✨");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
