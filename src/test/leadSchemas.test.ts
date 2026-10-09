import { describe, it, expect } from "vitest";
import { contactSchema, quoteSchema } from "@/lib/leadSchemas";

const future = (days: number) => new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);
const quote = { name: "Ada", email: "ada@example.com", phone: "+234 801 234 5678", destination: "lagos", travellers: 2, budget: 1500, startDate: future(10), endDate: future(15), notes: "" };

describe("lead validation", () => {
  it("accepts a valid quote", () => expect(quoteSchema.safeParse(quote).success).toBe(true));
  it("rejects invalid email", () => expect(contactSchema.safeParse({ name: "Ada", email: "nope", subject: "Hi there", message: "Hello there friend" }).success).toBe(false));
  it("rejects invalid phone", () => expect(quoteSchema.safeParse({ ...quote, phone: "abc" }).success).toBe(false));
  it("rejects budget under 100", () => expect(quoteSchema.safeParse({ ...quote, budget: 50 }).success).toBe(false));
  it("rejects past start date", () => expect(quoteSchema.safeParse({ ...quote, startDate: future(-2) }).success).toBe(false));
  it("rejects end date before start", () => expect(quoteSchema.safeParse({ ...quote, endDate: future(5) }).success).toBe(false));
});
