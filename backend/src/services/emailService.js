import taskRunner from "../utils/taskRunner.js";
import logger from "../utils/logger.js";

class EmailService {
  /**
   * Triggers a Welcome email for new sign-ups.
   */
  async sendWelcomeEmail(email, userName) {
    const subject = "Welcome to YogaWoman — Your AI Wellness Journey Begins 🧘✨";
    const body = `
Dear ${userName || "Yogi"},

Welcome to YogaWoman, your premium AI Wellness Operating System! 

We are thrilled to accompany you on your path to mindfulness, inner strength, and restorative energy. 

Here are your first steps:
1. Complete your Onboarding to generate your personalized AI Wellness Profile.
2. Meet 'Aria', your dedicated AI Wellness Coach, for emotional support and yoga advice.
3. Discover customized yoga practices and meditation tracks in your Dashboard.

"Your breathing is your guide; let it lead you home."

Warmly,
The YogaWoman Team
    `.trim();

    taskRunner.enqueueJob("EMAIL_NOTIFICATION_PUSH", { email, subject, body });
    logger.info(`Welcome email queued for ${email}`);
  }

  /**
   * Triggers an onboarding profile complete email.
   */
  async sendProfileCompletedEmail(email, userName, focusPath, aura) {
    const subject = "Your AI Wellness Profile is Ready! 🌟";
    const body = `
Dear ${userName || "Yogi"},

Your onboarding details have been processed by our AI wellness engines!

Here is your initial spiritual profile snapshot:
- Primary Focus Path: ${focusPath || "Hatha Yoga & Meditation"}
- Energizing Aura: ${aura || "Centered & Calming"}

Check your dashboard today to view your detailed day-by-day healing routines, recommended breathing intervals, and custom yoga recommendation lists.

In balance and breath,
The YogaWoman Team
    `.trim();

    taskRunner.enqueueJob("EMAIL_NOTIFICATION_PUSH", { email, subject, body });
    logger.info(`Profile setup confirmation email queued for ${email}`);
  }

  /**
   * Triggers streak warning motivational reminder.
   */
  async sendStreakWarningEmail(email, userName, currentStreak) {
    const subject = "Keep the flame burning: Your ${currentStreak}-Day Streak! 🔥";
    const body = `
Hi ${userName || "Yogi"},

You have maintained an active streak of ${currentStreak} days! Don't let the flame fade.

Taking just 5 minutes today for deep breathing (Sama Vritti) or a gentle child's pose (Balasana) will keep your momentum flowing and preserve your wellness streak score.

"Small acts of self-care lead to grand shifts in consciousness."

Flow with intent today,
The YogaWoman Team
    `.trim();

    taskRunner.enqueueJob("EMAIL_NOTIFICATION_PUSH", { email, subject, body });
    logger.info(`Streak warning email queued for ${email}`);
  }

  /**
   * Triggers abandoned cart recovery email.
   */
  async sendAbandonedCartEmail(email, userName, cartItemsCount = 1) {
    const subject = "Complete your sanctuary: Items left in your cart 🌿";
    const body = `
Hi ${userName || "Yogi"},

We noticed you left some organic wellness items in your YogaWoman cart. 

Our eco-friendly mats and premium crystal singing bowls are handcrafted in limited quantities to maintain energy purity.

Return to your cart today to complete your checkout and finalize your sacred meditation space.

Return to cart: https://yogawoman.com/store

Breathe deep,
The YogaWoman Team
    `.trim();

    taskRunner.enqueueJob("EMAIL_NOTIFICATION_PUSH", { email, subject, body });
    logger.info(`Abandoned cart recovery email queued for ${email}`);
  }

  /**
   * Triggers Premium upgrade confirmation email.
   */
  async sendPremiumUpgradeEmail(email, userName) {
    const subject = "Welcome to YogaWoman Pro — Access Unlimited Healing 👑🧘";
    const body = `
Dear ${userName || "Yogi"},

Congratulations! You are now a YogaWoman Pro Member.

You have unlocked unlimited access to the entire platform:
- Advanced GPT-4 Vision Palm readings & detailed line analyses.
- Custom-tailored daily multi-week wellness routines.
- Premium live schedules and classes.
- Exclusive meditation tracks and deep dashboard metrics.

We are honored to support your deep wellness transformation.

In infinite light,
The YogaWoman Team
    `.trim();

    taskRunner.enqueueJob("EMAIL_NOTIFICATION_PUSH", { email, subject, body });
    logger.info(`Premium upgrade email queued for ${email}`);
  }
}

export const emailService = new EmailService();
export default emailService;
