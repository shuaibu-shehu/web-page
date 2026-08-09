"use client";

import { useState } from "react";
import emailJs from "@emailjs/browser";
import { useToast } from "@/components/ui/use-toast";

/** `newsletter-box` input + pill button from the v2 blog page. */
export default function NewsletterForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    try {
      await emailJs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        {
          from_name: "Newsletter signup",
          to_name: "CodeTherapy",
          from_email: email,
          to_email: "contact@codetherapy.ml",
          message: `New newsletter subscription request from ${email}.`,
        },
        process.env.NEXT_PUBLIC_PUBLIC_KEY,
      );
      toast({
        title: "You're subscribed",
        description: "We'll send research updates straight to your inbox.",
      });
      setEmail("");
    } catch {
      toast({
        title: "Subscription failed",
        description: "Please try again, or email us at contact@codetherapy.ml.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[500px] flex-col gap-4 sm:flex-row sm:items-center"
    >
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        aria-label="Email address"
        className="h-12 flex-1 rounded-[30px] border border-line bg-cream px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-sage"
      />
      <button
        type="submit"
        disabled={sending}
        className="btn-sage shrink-0 disabled:opacity-60"
      >
        {sending ? "Subscribing…" : "Subscribe"}
      </button>
    </form>
  );
}
