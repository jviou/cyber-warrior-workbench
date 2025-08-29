import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY || ""; // minimum pour commencer

app.use(cors({ origin: true, credentials: false }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("tiny"));

// mini auth par API key (à améliorer plus tard)
app.use((req, res, next) => {
  const key = req.header("x-api-key");
  if (API_KEY && key !== API_KEY) return res.status(401).json({ error: "unauthorized" });
  next();
});

// ===== Actions (exemple) =====
const actionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  owner: z.string().optional(),
  priority: z.enum(["low", "med", "high"]).optional(),
  status: z.enum(["todo", "doing", "done"]).default("todo"),
  dueAt: z.string().datetime().optional(),
});
app.get("/api/actions", async (_req, res) => {
  const data = await prisma.actionItem.findMany({ orderBy: { createdAt: "desc" } });
  res.json(data);
});
app.post("/api/actions", async (req, res) => {
  const parsed = actionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  const created = await prisma.actionItem.create({ data: parsed.data });
  await prisma.auditLog.create({
    data: { entity: "ActionItem", op: "create", after: created }
  });
  res.status(201).json(created);
});
app.patch("/api/actions/:id", async (req, res) => {
  const id = req.params.id;
  const before = await prisma.actionItem.findUnique({ where: { id } });
  if (!before) return res.status(404).json({ error: "not found" });
  const parsed = actionSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  const after = await prisma.actionItem.update({ where: { id }, data: parsed.data });
  await prisma.auditLog.create({ data: { entity: "ActionItem", op: "update", before, after } });
  res.json(after);
});
app.delete("/api/actions/:id", async (req, res) => {
  const id = req.params.id;
  const before = await prisma.actionItem.findUnique({ where: { id } });
  if (!before) return res.status(204).end();
  await prisma.actionItem.delete({ where: { id } });
  await prisma.auditLog.create({ data: { entity: "ActionItem", op: "delete", before } });
  res.status(204).end();
});

// ===== Journal (exemple simple) =====
const journalSchema = z.object({
  kind: z.string(),
  at: z.string().datetime().optional(),
  summary: z.string().min(1),
  details: z.string().optional(),
  actionId: z.string().optional(),
});
app.get("/api/journal", async (_req, res) => {
  const data = await prisma.journalEvent.findMany({ orderBy: { at: "desc" } });
  res.json(data);
});
app.post("/api/journal", async (req, res) => {
  const parsed = journalSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  const created = await prisma.journalEvent.create({ data: parsed.data });
  await prisma.auditLog.create({ data: { entity: "JournalEvent", op: "create", after: created } });
  res.status(201).json(created);
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`[api] listening on :${PORT}`));
