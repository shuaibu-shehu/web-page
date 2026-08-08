"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

import SectionLabel from "@/components/section-label";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "General",
  "Research",
  "Partnerships",
  "Careers",
  "Technical",
];

/**
 * Questions come from the `v2-faq-page` frame, where every row is drawn collapsed.
 * The answer copy is not in the Figma — it is drafted from the site's own
 * mission/partnership/ethics copy and should be reviewed before launch.
 */
const faqs = [
  {
    category: "General",
    q: "What is CodeTherapy's mission?",
    a: "We build robust, clinically-validated AI diagnostics that run locally, so world-class medical intelligence reaches every low-resource clinic. We believe high-quality healthcare is a fundamental human right, not a privilege — and we co-create with the frontline health workers who will actually use the tools.",
  },
  {
    category: "Partnerships",
    q: "How can my institution partner with CodeTherapy?",
    a: "Start by submitting an inquiry describing your research focus, local clinical needs, or available testing infrastructure. From there we co-design validation protocols and offline deployment configurations with your team, then integrate, evaluate, and deploy the validated system into frontline clinics.",
  },
  {
    category: "Technical",
    q: "Are your AI models open-source?",
    a: "Yes. Every diagnostic model we ship is open-source and publicly auditable. We thoroughly reject exploitative medical datasets, and we publish our weights, evaluation results, and release notes so partner institutions can verify our claims independently.",
  },
  {
    category: "General",
    q: "What regions do you currently operate in?",
    a: "Our headquarters is in Bamako, Mali, with offices in Addis Ababa, Ethiopia and Lagos, Nigeria. Through our partner network we support deployments across 23 countries, concentrated in sub-Saharan Africa but extending to collaborators in India and the United States.",
  },
  {
    category: "Research",
    q: "How do you ensure ethical AI development?",
    a: "Ethical courage is one of our core ideals. We build with medical institutions and clinicians inside their own clinics rather than from isolated hubs, we refuse datasets gathered without meaningful consent, and every model is open to public audit. A dedicated ethics lead oversees data privacy compliance, model auditing, and clinical equity.",
  },
  {
    category: "Careers",
    q: "Can I contribute to your research as an individual?",
    a: "Absolutely. Clinicians, ML engineers, and biomedical hardware specialists all contribute to our open-source repositories. Active residency, fellowship, and core developer postings are updated weekly on our LinkedIn organizational channel — or reach out directly through our contact form.",
  },
  {
    category: "Technical",
    q: "What technologies do you use?",
    a: "Our stack spans on-device machine learning, computer vision and object detection, convolutional networks for medical imaging, and edge AI with IoT sensing. Models are optimized to run offline on accessible hardware — including sub-$50 devices and mid-tier consumer smartphones.",
  },
  {
    category: "General",
    q: "How is CodeTherapy funded?",
    a: "We are supported by philanthropic foundations and research grants, including the Gates Foundation and the Google AI for Social Good programme, alongside institutional research partnerships. We take no funding that would require us to close-source a diagnostic model.",
  },
];

export default function FaqPage() {
  const reduceMotion = useReducedMotion();
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState<string | null>(faqs[0].q);

  const visible = useMemo(
    () =>
      category === "All" ? faqs : faqs.filter((f) => f.category === category),
    [category],
  );

  return (
    <main className="bg-cream">
      {/* -------------------------------------------------------- header */}
      <section className="shell flex flex-col gap-6 pb-12 pt-20">
        <SectionLabel tone="clay" size="md">
          Questions &amp; Answers
        </SectionLabel>
        <h1 className="font-serif text-[38px] font-semibold leading-[1.1] text-ink md:text-[64px]">
          Frequently Asked Questions
        </h1>
        <p className="max-w-[720px] text-[18px] leading-[1.6] text-ink-soft">
          Find detailed information regarding our open-source research
          methodologies, partnership validation programs, operational scale, and
          data security models.
        </p>
      </section>

      {/* ---------------------------------------------------- categories */}
      <section className="shell flex flex-wrap gap-3 pb-12">
        {categories.map((chip) => {
          const active = chip === category;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setCategory(chip)}
              aria-pressed={active}
              className={cn(
                "rounded-[20px] border px-5 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "border-sage bg-sage text-white"
                  : "border-line bg-white text-ink hover:border-sage hover:text-sage",
              )}
            >
              {chip}
            </button>
          );
        })}
      </section>

      {/* ----------------------------------------------------- accordion */}
      <section className="shell flex flex-col gap-4 pb-20">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((faq) => {
            const isOpen = open === faq.q;
            return (
              <motion.div
                key={faq.q}
                layout={reduceMotion ? false : "position"}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-xl border border-line bg-white"
              >
                <h2>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : faq.q)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-serif text-lg font-semibold text-ink md:text-[22px]">
                      {faq.q}
                    </span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cream">
                      <Plus
                        className={cn(
                          "size-4 text-sage transition-transform duration-200",
                          isOpen && "rotate-45",
                        )}
                      />
                    </span>
                  </button>
                </h2>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={
                        reduceMotion
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{
                        duration: reduceMotion ? 0 : 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[900px] px-6 pb-6 text-[15px] leading-[1.7] text-ink-soft">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>

      {/* ----------------------------------------------------------- cta */}
      <section className="shell pb-32 pt-20">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-sage-soft p-8 text-center md:p-16">
          <h2 className="font-serif text-[28px] font-semibold text-ink md:text-[36px]">
            Still Have Questions?
          </h2>
          <p className="max-w-[600px] text-base text-ink-soft">
            Can&rsquo;t find the answers you are looking for? Reach out directly
            to our global coordination team for detailed programmatic requests.
          </p>
          <Link href="/contact" className="btn-ink">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
