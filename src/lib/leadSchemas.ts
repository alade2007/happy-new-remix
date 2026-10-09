import { z } from "zod";

const phoneRe = /^\+?[0-9\s().-]{7,20}$/;
const today = () => new Date().toISOString().slice(0, 10);

const name = z.string().trim().min(2, "Please enter your name").max(100, "Name must be under 100 characters");
const email = z.string().trim().email("Enter a valid email address").max(255, "Email is too long");

export const contactSchema = z.object({
  name,
  email,
  subject: z.string().trim().min(3, "Add a short subject").max(150, "Subject must be under 150 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be under 2000 characters"),
});

export const quoteSchema = z
  .object({
    name,
    email,
    phone: z.string().trim().regex(phoneRe, "Enter a valid phone number, e.g. +234 801 234 5678"),
    destination: z.string().trim().min(1, "Choose a destination"),
    travellers: z.coerce.number({ invalid_type_error: "Enter a number" }).int("Whole numbers only").min(1, "At least 1 traveller").max(50, "For groups over 50, contact us directly"),
    budget: z.coerce.number({ invalid_type_error: "Enter your budget in USD" }).min(100, "Minimum budget is $100").max(1_000_000, "Budget looks too high"),
    startDate: z.string().min(1, "Pick a start date").refine((v) => v >= today(), "Start date can't be in the past"),
    endDate: z.string().min(1, "Pick an end date"),
    notes: z.string().trim().max(1000, "Notes must be under 1000 characters").optional().or(z.literal("")),
  })
  .refine((v) => !v.startDate || !v.endDate || v.endDate > v.startDate, { path: ["endDate"], message: "End date must be after the start date" });

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
