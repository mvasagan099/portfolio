import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const contactMessages = sqliteTable(
  "contact_messages",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    fingerprint: text("fingerprint").notNull(),
    createdAt: integer("created_at").notNull()
  },
  (t) => [index("contact_messages_created_idx").on(t.createdAt)]
);
export const contactRateLimits = sqliteTable(
  "contact_rate_limits",
  {
    key: text("key").primaryKey(),
    attempts: integer("attempts").notNull(),
    expiresAt: integer("expires_at").notNull()
  },
  (t) => [index("contact_rate_limits_expiry_idx").on(t.expiresAt)]
);
