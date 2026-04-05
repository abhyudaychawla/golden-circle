import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed testimonials
  const testimonialData = [
    {
      name: "Priya S.",
      role: "Senior Product Manager, Tech Industry",
      category: "clarity",
      quote:
        "I came to Alexandra completely burned out and unsure if I even wanted to stay in my career. After three months of working together, I didn't just find clarity — I found myself again.",
      rating: 5,
      featured: true,
      approved: true,
    },
    {
      name: "James T.",
      role: "Founder & CEO, Design Studio",
      category: "transition",
      quote:
        "I was at a crossroads — a business that was succeeding but a life that felt hollow. Alexandra helped me untangle what I actually wanted from what I thought I should want.",
      rating: 5,
      featured: true,
      approved: true,
    },
    {
      name: "Rachel M.",
      role: "Partner, Law Firm",
      category: "confidence",
      quote:
        "I'm trained to be decisive. But my personal life was full of second-guessing and patterns I kept repeating. Alexandra was the first person who helped me see those patterns without making me feel judged.",
      rating: 5,
      featured: false,
      approved: true,
    },
    {
      name: "David K.",
      role: "Creative Director",
      category: "relationships",
      quote:
        "Our work surfaced things about how I show up in relationships that I'd been successfully avoiding for years. It wasn't comfortable. But it was exactly what I needed.",
      rating: 5,
      featured: true,
      approved: true,
    },
    {
      name: "Nadia H.",
      role: "Nonprofit Executive Director",
      category: "transition",
      quote:
        "I was leaving a 15-year career and terrified. Alexandra didn't try to make me feel better with platitudes. She helped me get grounded in my values and make a decision I could actually stand behind.",
      rating: 5,
      featured: false,
      approved: true,
    },
    {
      name: "Marcus W.",
      role: "Financial Analyst",
      category: "clarity",
      quote:
        "I always assumed coaching was for people in crisis. I was wrong. I came in feeling vaguely dissatisfied and left with a completely reorganized sense of what I'm building toward.",
      rating: 5,
      featured: false,
      approved: true,
    },
  ];

  for (const t of testimonialData) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`Seeded ${testimonialData.length} testimonials`);

  // Seed sample booking requests
  const bookingData = [
    {
      fullName: "Sample Client One",
      email: "client1@example.com",
      phone: "+1 555 000 0001",
      preferredDate: "2026-04-15",
      preferredTime: "10:00 AM",
      serviceInterest: "foundations",
      message: "Looking to explore career transition options.",
      status: "pending",
    },
    {
      fullName: "Sample Client Two",
      email: "client2@example.com",
      serviceInterest: "clarity-intensive",
      message: "Need help with a major decision I'm facing.",
      status: "confirmed",
    },
  ];

  for (const b of bookingData) {
    await prisma.bookingRequest.create({ data: b });
  }
  console.log(`Seeded ${bookingData.length} booking requests`);

  // Seed a sample contact message
  await prisma.contactMessage.create({
    data: {
      fullName: "Sample Visitor",
      email: "visitor@example.com",
      subject: "General Inquiry",
      message: "I'd love to learn more about your coaching approach.",
      status: "unread",
    },
  });
  console.log("Seeded 1 contact message");

  console.log("Database seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
