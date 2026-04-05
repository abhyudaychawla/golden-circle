export interface CoachingService {
  id: string;
  title: string;
  description: string;
  duration: string;
  sessions?: string;
  includes: string[];
  ideal: string;
  highlighted?: boolean;
}

export const services: CoachingService[] = [
  {
    id: "discovery",
    title: "Discovery Call",
    description:
      "A free, no-obligation 15-minute conversation to explore what you're navigating and whether working together makes sense. No sales pitch — just an honest exchange.",
    duration: "15 minutes",
    includes: [
      "Overview of your current situation",
      "Honest fit assessment",
      "Questions answered",
      "Recommended next step",
    ],
    ideal:
      "Anyone curious about coaching who wants to explore without commitment.",
  },
  {
    id: "clarity-intensive",
    title: "Clarity Intensive",
    description:
      "A focused, single deep-dive session for those facing a specific decision or transition. We go deep and you leave with a clearer sense of your values, priorities, and next steps.",
    duration: "90 minutes",
    sessions: "1 session",
    includes: [
      "Pre-session questionnaire",
      "90-minute deep-dive session",
      "Post-session summary and action steps",
      "One follow-up email check-in",
    ],
    ideal:
      "Those facing a specific crossroads or needing a reset before a major decision.",
  },
  {
    id: "foundations",
    title: "Foundations Package",
    description:
      "A three-month coaching engagement designed to create meaningful, lasting change. Ideal for those ready to do real work over time.",
    duration: "60 minutes per session",
    sessions: "6 sessions over 3 months",
    highlighted: true,
    includes: [
      "6 x 60-minute coaching sessions",
      "Between-session email support",
      "Journaling and reflection prompts",
      "Progress review at 6-week mark",
      "Session recordings (optional)",
      "Resource library access",
    ],
    ideal:
      "Professionals and individuals seeking sustained transformation across career, identity, or relationships.",
  },
  {
    id: "deep-immersion",
    title: "Deep Immersion",
    description:
      "A six-month engagement for those committed to profound and lasting change. This is the full journey — from confusion to clarity to confident forward motion.",
    duration: "60 minutes per session",
    sessions: "12 sessions over 6 months",
    includes: [
      "12 x 60-minute coaching sessions",
      "Priority email and WhatsApp support",
      "Monthly progress reviews",
      "Unlimited journaling prompt access",
      "End-of-engagement reflection document",
      "90-day post-engagement check-in",
      "Referral to trusted specialists when relevant",
    ],
    ideal:
      "Leaders, executives, and high-achievers ready for significant personal and professional evolution.",
  },
];
