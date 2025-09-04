import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { userSchema } from "@/database/schema/index.schema";

export const friendRequestStatusEnum = pgEnum("friend_request_status_enum", [
  "accepted",
  "rejected",
  "pending",
  "canceled",
]);

export const friendRequestSchema = pgTable("friend_request", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  sentFromId: text("sent_from")
    .notNull()
    .references(() => userSchema.id, {
      onDelete: "cascade",
      onUpdate: "no action",
    }),
  sentToId: text("sent_to")
    .notNull()
    .references(() => userSchema.id, {
      onDelete: "cascade",
      onUpdate: "no action",
    }),
  status: friendRequestStatusEnum("status").notNull().default("pending"),
});

export const friendRequestRelation = relations(
  friendRequestSchema,
  ({ one }) => ({
    sentFrom: one(userSchema, {
      fields: [friendRequestSchema.sentFromId],
      references: [userSchema.id],
    }),
    sentTo: one(userSchema, {
      fields: [friendRequestSchema.sentToId],
      references: [userSchema.id],
    }),
  }),
);
