import { useState } from "react";
import { useForm, type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { PageHero, Chip } from "@/components/site/Section";
import { contactSchema, quoteSchema, type ContactInput, type QuoteInput } from "@/lib/leadSchemas";
import { submitContact, submitQuote } from "@/services/leads";
import { destinationRecords } from "@/data/travelStore";
import { cn } from "@/lib/utils";

const inputCls = (err?: FieldError) =>
  cn("w-full rounded-lg border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring", err ? "border-destructive" : "border-input");

const Field = ({ id, label, error, children }: { id: string; label: string; error?: FieldError; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
    {children}
    {error && <p id={`${id}-err`} role="alert" className="mt-1 text-xs text-destructive">{error.message}</p>}
  </div>
);

const a11y = (id: string, err: FieldError | undefined, reg: UseFormRegisterReturn) => ({ id, ...reg, "aria-invalid": !!err, "aria-describedby": err ? `${id}-err` : undefined, className: inputCls(err) });

const SubmitBtn = ({ busy, label }: { busy: boolean; label: string }) => (
  <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-accent disabled:opacity-60">
    {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />} {busy ? "Sending…" : label}
  </button>
);

const done = (demo: boolean, msg: string) => toast.success(msg, { description: demo ? "Demo mode: no backend is connected yet, so nothing was stored." : undefined });

const QuoteForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", destination: "", travellers: 2, budget: undefined, startDate: "", endDate: "", notes: "" },
  });
  const onSubmit = async (v: QuoteInput) => {
    const r = await submitQuote(v);
    if (r.ok) { done(r.demo, "Quote request sent — we'll reply within 2 working days."); reset(); } else if (r.ok === false) toast.error(r.error);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="q-name" label="Full name" error={errors.name}><input {...a11y("q-name", errors.name, register("name"))} autoComplete="name" /></Field>
      <Field id="q-email" label="Email" error={errors.email}><input type="email" {...a11y("q-email", errors.email, register("email"))} autoComplete="email" /></Field>
      <Field id="q-phone" label="Phone" error={errors.phone}><input type="tel" {...a11y("q-phone", errors.phone, register("phone"))} autoComplete="tel" placeholder="+234 801 234 5678" /></Field>
      <Field id="q-dest" label="Destination" error={errors.destination}>
        <select {...a11y("q-dest", errors.destination, register("destination"))}>
          <option value="">Select a destination</option>
          {destinationRecords.map((d) => <option key={d.id} value={d.slug}>{d.title}{d.priceFrom ? ` — from $${d.priceFrom.toLocaleString()}` : ""}</option>)}
          <option value="other">Somewhere else</option>
        </select>
      </Field>
      <Field id="q-start" label="Start date" error={errors.startDate}><input type="date" {...a11y("q-start", errors.startDate, register("startDate"))} /></Field>
      <Field id="q-end" label="End date" error={errors.endDate}><input type="date" {...a11y("q-end", errors.endDate, register("endDate"))} /></Field>
      <Field id="q-trav" label="Travellers" error={errors.travellers}><input type="number" min={1} {...a11y("q-trav", errors.travellers, register("travellers"))} /></Field>
      <Field id="q-budget" label="Total budget (USD)" error={errors.budget}><input type="number" min={100} step={50} {...a11y("q-budget", errors.budget, register("budget"))} placeholder="2500" /></Field>
      <div className="sm:col-span-2"><Field id="q-notes" label="Anything else? (optional)" error={errors.notes}><textarea rows={4} {...a11y("q-notes", errors.notes, register("notes"))} /></Field></div>
      <div className="sm:col-span-2"><SubmitBtn busy={isSubmitting} label="Request a quote" /></div>
    </form>
  );
};

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  const onSubmit = async (v: ContactInput) => {
    const r = await submitContact(v);
    if (r.ok) { done(r.demo, "Message sent — thanks for getting in touch!"); reset(); } else if (r.ok === false) toast.error(r.error);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="c-name" label="Name" error={errors.name}><input {...a11y("c-name", errors.name, register("name"))} autoComplete="name" /></Field>
      <Field id="c-email" label="Email" error={errors.email}><input type="email" {...a11y("c-email", errors.email, register("email"))} autoComplete="email" /></Field>
      <div className="sm:col-span-2"><Field id="c-subject" label="Subject" error={errors.subject}><input {...a11y("c-subject", errors.subject, register("subject"))} /></Field></div>
      <div className="sm:col-span-2"><Field id="c-msg" label="Message" error={errors.message}><textarea rows={6} {...a11y("c-msg", errors.message, register("message"))} /></Field></div>
      <div className="sm:col-span-2"><SubmitBtn busy={isSubmitting} label="Send message" /></div>
    </form>
  );
};

const Contact = () => {
  const [tab, setTab] = useState<"quote" | "contact">(() => (window.location.hash === "#message" ? "contact" : "quote"));
  const seo = { title: "Contact & Request a Quote", description: "Get a tailored trip quote from Travel Scout or send our editors a message." };
  return (
    <Layout seo={seo}>
      <PageHero eyebrow="Get in touch" title="Plan your next trip with us" intro="Tell us where you'd like to go and we'll put together a tailored quote — or just drop our editors a line." />
      <section className="container-site max-w-3xl py-12 md:py-16">
        <div className="mb-8 flex gap-2" role="tablist" aria-label="Form type">
          <Chip active={tab === "quote"} onClick={() => setTab("quote")}>Request a quote</Chip>
          <Chip active={tab === "contact"} onClick={() => setTab("contact")}>Contact us</Chip>
        </div>
        <div className="rounded-xl bg-card p-6 shadow-card md:p-8">{tab === "quote" ? <QuoteForm /> : <ContactForm />}</div>
      </section>
    </Layout>
  );
};

export default Contact;
