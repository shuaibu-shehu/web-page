/**
 * Migrates the current static content into Postgres.
 * Idempotent — safe to re-run; upserts everything by unique key.
 *
 * Run with: npx prisma db seed   (requires DATABASE_URL)
 * Admin account is created from ADMIN_EMAIL + ADMIN_PASSWORD in .env.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Relative imports on purpose: tsx runs this outside Next's `@/` resolution.
import { projects } from "../lib/projects";
import { featuredPost, posts } from "../lib/posts";
import { teamMembers, partnersList, faqList, settingsDefaults } from "../lib/content";

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn(
      "⚠ ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin account. Set them and re-run the seed.",
    );
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      role: "admin",
    },
  });
  console.log(`✓ admin account ready for ${email}`);
}

// CMS card metrics shown on the projects management screen (per the design).
const projectExtras: Record<string, { leadResearcher: string; videoUrl: string | null; milestones: { title: string; date: string; status: string }[]; publicationEntries: { title: string; journal: string; status: string }[] }> = {
  "ai-in-laparoscopy": {
    leadResearcher: "Dr. Amara Osei",
    videoUrl: null,
    milestones: [
      { title: "Prototype Complete", date: "Completed June 2024", status: "completed" },
      { title: "Clinical Trial Phase 1", date: "Completed Sept 2024", status: "completed" },
      { title: "WHO Validation", date: "In Progress", status: "inProgress" },
      { title: "Public Release", date: "Target Q1 2026", status: "planned" },
    ],
    publicationEntries: [
      { title: "Real-Time Anatomical Semantic Segmentation on Low-Power Laparoscopes", journal: "Nature Digital Med", status: "Published" },
      { title: "Neural Network Coach: Feedback-Guided Surgical Overlays", journal: "IEEE Transactions on Biomedical Engineering", status: "Published" },
    ],
  },
};

const projectMetrics: Record<string, { completion: number; publications: number; teamSize: number; partnerCount: number }> = {
  "ai-in-laparoscopy": { completion: 65, publications: 4, teamSize: 8, partnerCount: 2 },
  "malaria-detection": { completion: 82, publications: 6, teamSize: 12, partnerCount: 4 },
  "mammography-ai": { completion: 40, publications: 1, teamSize: 5, partnerCount: 3 },
};

async function seedProjects() {
  for (const p of projects) {
    const { paper, ...data } = p;
    const metrics = projectMetrics[p.slug] ?? { completion: 0, publications: 0, teamSize: 0, partnerCount: 0 };
    const extras = projectExtras[p.slug] ?? {
      leadResearcher: null,
      videoUrl: null,
      milestones: [],
      publicationEntries: [],
    };
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: { ...data, ...metrics, ...extras, body: data.body as never },
      create: {
        ...data,
        ...metrics,
        ...extras,
        body: data.body as never,
        paperJournal: paper?.journal ?? null,
        paperUrl: paper?.url ?? null,
      },
    });
  }
  console.log(`✓ ${projects.length} projects`);
}

async function seedPosts() {
  const all = [featuredPost, ...posts];
  for (const post of all) {
    const { body, ...data } = post;
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: data,
      create: {
        ...data,
        body: (body ?? null) as never,
        status: "published",
        authorName: "CodeTherapy",
      },
    });
  }
  console.log(`✓ ${all.length} posts`);
}

async function seedContent() {
  await prisma.teamMember.deleteMany();
  await prisma.teamMember.createMany({
    data: teamMembers.map((m, i) => ({ ...m, order: i })),
  });

  const partnerDefaults: Record<string, { category: string; startDate: string; contact: string }> = {
    "Addis Ababa University": { category: "Academic", startDate: "Jan 12, 2023", contact: "Dr. Rachel Green" },
    "Université Cheikh Anta Diop": { category: "Academic", startDate: "Mar 30, 2022", contact: "Jean-Laurent Pierre" },
    "Pan-African Health": { category: "NGO", startDate: "Jun 08, 2023", contact: "Dr. Ngozi Okafor" },
    "Johns Hopkins": { category: "Academic", startDate: "Feb 02, 2024", contact: "Dr. Sarah Chen" },
    "WHO Africa Office": { category: "NGO", startDate: "Mar 30, 2022", contact: "Jean-Laurent Pierre" },
    "Gates Foundation": { category: "NGO", startDate: "Jul 15, 2024", contact: "Sundar Pichai (Ops Office)" },
  };
  await prisma.partner.deleteMany();
  await prisma.partner.createMany({
    data: partnersList.map((p, i) => ({
      ...p,
      order: i,
      ...(partnerDefaults[p.name] ?? { category: "Academic", startDate: "", contact: "" }),
    })),
  });

  await prisma.faq.deleteMany();
  await prisma.faq.createMany({
    data: faqList.map((f, i) => ({ ...f, order: i })),
  });

  console.log(`✓ ${teamMembers.length} team members, ${partnersList.length} partners, ${faqList.length} FAQs`);
}

async function seedSettings() {
  for (const [key, value] of Object.entries(settingsDefaults)) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: value as never },
      create: { key, value: value as never },
    });
  }
  console.log(`✓ ${Object.keys(settingsDefaults).length} settings`);
}

async function main() {
  console.log("Seeding CodeTherapy CMS…");
  await seedAdmin();
  await seedProjects();
  await seedPosts();
  await seedContent();
  await seedSettings();
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
