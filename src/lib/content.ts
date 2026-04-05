export interface SiteConfig {
  name: string;
  coachName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  calendlyUrl: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface HeroContent {
  headline: string;
  subtext: string;
  ctaButtons: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export interface Pillar {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Credential {
  icon: string;
  label: string;
  detail: string;
}

export const siteConfig: SiteConfig = {
  name: "Golden Circle Coaching",
  coachName: "Alexandra Mercer",
  tagline: "Find Your Center. Move Forward with Clarity.",
  email: "hello@goldencirclecoaching.com",
  phone: "+1 (555) 234-5678",
  whatsapp: "15552345678",
  whatsappMessage: "Hi Alexandra, I found your coaching website and would love to learn more.",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/golden-circle/30min",
  socialLinks: {
    instagram: "https://instagram.com/goldencirclecoaching",
    linkedin: "https://linkedin.com/in/alexandramercer",
  },
};

export const heroContent: HeroContent = {
  headline: "Find Your Center.\nMove Forward with Clarity.",
  subtext:
    "When everything feels uncertain, coaching creates a grounded space to find your direction — without pressure, without judgment. Let's discover what truly matters to you.",
  ctaButtons: {
    primary: { label: "Book a Free Discovery Call", href: "/contact" },
    secondary: { label: "Explore Coaching", href: "/coaching" },
  },
};

export const pillars: Pillar[] = [
  {
    title: "Clarity Over Chaos",
    description:
      "Cut through the noise of competing priorities and conflicting voices to discover what genuinely matters to you — and what to release.",
    icon: "✦",
  },
  {
    title: "Confident Decision-Making",
    description:
      "Move from analysis paralysis to grounded choices. Learn to trust your own judgment even when the path ahead isn't fully clear.",
    icon: "◎",
  },
  {
    title: "Purposeful Transitions",
    description:
      "Navigate career pivots, relationship changes, and life crossroads with intention — not just reaction. Make your next chapter your best chapter.",
    icon: "◈",
  },
  {
    title: "Sustainable Momentum",
    description:
      "Build habits, mindsets, and structures that support long-term wellbeing — not just short-term fixes that fade after the session ends.",
    icon: "⬡",
  },
];

export const situations: string[] = [
  "Feeling stuck despite outward success",
  "A major career decision looming",
  "A relationship that needs honest attention",
  "Burnout that won't respond to rest alone",
  "A life transition you didn't choose",
  "Feeling like you've lost yourself",
  "Wanting more — but not knowing what",
  "A nagging sense of misalignment",
  "Struggling to set boundaries confidently",
  "Preparing for a bold new chapter",
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "A free 15-minute conversation to explore what you're navigating and whether we're a good fit. No pressure, no pitching — just an honest conversation.",
  },
  {
    number: "02",
    title: "First Session",
    description:
      "We go deeper. You share what's really going on. I listen without agenda and help you see patterns, possibilities, and priorities you may have overlooked.",
  },
  {
    number: "03",
    title: "Ongoing Work",
    description:
      "Each session builds on the last. We move between insight and action, reflection and forward motion — always at your pace, always toward your goals.",
  },
  {
    number: "04",
    title: "Reflection & Integration",
    description:
      "Between sessions, you apply what you've discovered. Brief check-ins and journaling prompts keep momentum alive without adding to your to-do list.",
  },
  {
    number: "05",
    title: "Integration & Independence",
    description:
      "The goal isn't to create dependency — it's to build your capacity to navigate life with confidence long after our work together ends.",
  },
];

export const credentials: Credential[] = [
  {
    icon: "🎓",
    label: "ICF Certified",
    detail: "International Coaching Federation — Professional Level",
  },
  {
    icon: "📚",
    label: "12+ Years Experience",
    detail: "Individual and group coaching since 2012",
  },
  {
    icon: "🌍",
    label: "Global Practice",
    detail: "Clients across 18 countries",
  },
  {
    icon: "🏛️",
    label: "Graduate Training",
    detail: "M.A. in Applied Psychology, Columbia University",
  },
];

export const aboutBio = {
  intro:
    "I became a coach because I've sat where you're sitting — successful on paper, quietly wondering if this is really it.",
  full: `I spent years in a career that looked impressive from the outside. The title, the salary, the carefully curated LinkedIn profile. But somewhere in the middle of all that achievement, I lost the thread of what I actually wanted.

It took a professional crisis and a very honest conversation with a coach I'd been resistant to seeing to start asking better questions.

That experience changed everything. Not because coaching handed me answers — but because it finally helped me ask the right questions.

Today, I work with professionals and high-achievers who are navigating pivots, questioning their path, or simply trying to reconnect with themselves amid the demands of modern life.

My approach blends psychological depth with practical clarity. Sessions are grounded in active listening, honest reflection, and an unwavering belief in your capacity to find your own way forward.`,
  philosophy:
    "Clarity doesn't come from thinking more. It comes from seeing clearly. My role is to create the conditions for that seeing — and to walk alongside you as you act on what you find.",
};

export const whatMakesDifferent = [
  {
    title: "No scripts or frameworks forced onto your story",
    description:
      "Coaching works when it's tailored to you — not when your life is squeezed into someone else's model.",
  },
  {
    title: "Depth without drama",
    description:
      "We go beneath the surface without making every session feel like a crisis. Growth can be grounded and even graceful.",
  },
  {
    title: "Your timeline, not mine",
    description:
      "I'm not interested in creating dependency. The work is about building your capacity — not filling mine.",
  },
  {
    title: "Full confidentiality, always",
    description:
      "What happens in sessions stays there. You can explore the hardest things safely.",
  },
];

export const whatToExpect = [
  "An initial 15-minute discovery call — free and no obligation",
  "60-minute sessions, typically every 2 weeks",
  "A structured-but-flexible approach that responds to what you bring",
  "Email support and journaling prompts between sessions",
  "Progress reviews every 3 months",
  "Genuine challenge alongside deep support",
];
