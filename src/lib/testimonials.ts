export type TestimonialCategory = "clarity" | "relationships" | "transition" | "confidence";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: TestimonialCategory;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya S.",
    role: "Senior Product Manager, Tech Industry",
    category: "clarity",
    quote:
      "I came to Alexandra completely burned out and unsure if I even wanted to stay in my career. After three months of working together, I didn't just find clarity — I found myself again. She has a rare gift for asking the question you didn't know you needed to hear.",
    rating: 5,
  },
  {
    id: "2",
    name: "James T.",
    role: "Founder & CEO, Design Studio",
    category: "transition",
    quote:
      "I was at a crossroads — a business that was succeeding but a life that felt hollow. Alexandra helped me untangle what I actually wanted from what I thought I should want. The session that changed everything was the third one, when she asked me what I would do if no one was watching.",
    rating: 5,
  },
  {
    id: "3",
    name: "Rachel M.",
    role: "Partner, Law Firm",
    category: "confidence",
    quote:
      "I'm trained to be decisive. In my professional life, I rarely hesitate. But my personal life was another story — full of second-guessing and patterns I kept repeating. Alexandra was the first person who helped me see those patterns without making me feel judged for them.",
    rating: 5,
  },
  {
    id: "4",
    name: "David K.",
    role: "Creative Director",
    category: "relationships",
    quote:
      "Our work together surfaced things about how I show up in relationships — personal and professional — that I'd been successfully avoiding for years. It wasn't comfortable. But it was exactly what I needed. My closest relationships are fundamentally different now.",
    rating: 5,
  },
  {
    id: "5",
    name: "Nadia H.",
    role: "Nonprofit Executive Director",
    category: "transition",
    quote:
      "I was leaving a 15-year career and terrified. Alexandra didn't try to make me feel better with platitudes. She helped me get grounded in my values and make a decision I could actually stand behind. Six months later, I'm exactly where I wanted to be.",
    rating: 5,
  },
  {
    id: "6",
    name: "Marcus W.",
    role: "Financial Analyst",
    category: "clarity",
    quote:
      "I always assumed coaching was for people in crisis. I was wrong. I came in feeling vaguely dissatisfied and left six sessions later with a completely reorganized sense of what I'm building toward. Worth every penny and every uncomfortable conversation.",
    rating: 5,
  },
  {
    id: "7",
    name: "Sophia L.",
    role: "Doctor & Working Parent",
    category: "confidence",
    quote:
      "Between medicine, family, and trying to maintain some semblance of a self — I was running on empty and not even good at the things I cared most about. Alexandra helped me stop trying to be everything and start being intentional. Game-changing.",
    rating: 5,
  },
  {
    id: "8",
    name: "Tom R.",
    role: "VP of Engineering",
    category: "relationships",
    quote:
      "I came in to work on leadership. What I discovered was a much deeper pattern in how I avoid vulnerability with people I actually care about. Alexandra's ability to hold that space — without rushing to fix it — was unlike anything I'd experienced.",
    rating: 5,
  },
];
