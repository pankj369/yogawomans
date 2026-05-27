class BlogService {
  constructor() {
    this.articles = [
      {
        title: "5 Restorative Yoga Poses for Anxiety & Stress Relief",
        slug: "5-restorative-poses-for-anxiety",
        description: "Discover simple Hatha and Yin postures designed to trigger your parasympathetic nervous system and melt daily stress.",
        author: "Meera Nair, Wellness Architect",
        createdAt: "2026-05-01T08:00:00Z",
        category: "Yoga",
        readTime: "6 min read",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a gentle child's pose (Balasana), the forward bend brings calm and grounding. Moving to Legs-Up-the-Wall (Viparita Karani) drains metabolic fatigue from the feet and lowers heart rate. Deep breathwork (Pranayama) acts as the bridge connecting mind and body, slowing heart rate and expanding lung capacity...",
      },
      {
        title: "Understanding Your Aura Mounts in Palmistry",
        slug: "understanding-aura-mounts-palmistry",
        description: "Learn how the Mount of Venus and Mount of Jupiter guide your inner strength and emotional capacity indicators.",
        author: "Aria, AI Spiritual Guide",
        createdAt: "2026-05-10T10:00:00Z",
        category: "Palmistry",
        readTime: "8 min read",
        body: "The mounts on your palm represent nodes of energy. The Mount of Venus, located at the base of the thumb, reflects your capacity for self-love, warmth, and vitality. A prominent Mount of Venus indicates a radiant aura of compassion. The Mount of Jupiter, located under the index finger, signifies confidence, personal alignment, and resilience during life changes...",
      },
      {
        title: "The Ultimate Guide to Box Breathing (Sama Vritti)",
        slug: "ultimate-guide-box-breathing",
        description: "Step-by-step instructions to center your thoughts, reduce cortisol, and achieve instant clarity under stress.",
        author: "Dr. Ananya Ray, Breathing Expert",
        createdAt: "2026-05-18T09:00:00Z",
        category: "Breathwork",
        readTime: "5 min read",
        body: "Sama Vritti, or equal breathing, is a powerful technique utilized by elite athletes and wellness practitioners alike. The instructions are simple: Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, and hold empty for 4 counts. Repeating this simple cycle four times resets your sympathetic nervous response and clears active mental clutter...",
      },
    ];
  }

  async getArticles() {
    return this.articles;
  }

  async getArticleBySlug(slug) {
    const article = this.articles.find((a) => a.slug === slug);
    if (!article) return null;
    return article;
  }
}

export const blogService = new BlogService();
export default blogService;
