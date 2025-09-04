import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { userSchema } from "@/database/schema/index.schema";

export const friendSchema = pgTable("friend", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => userSchema.id, {
      onDelete: "cascade",
      onUpdate: "no action",
    }),
  friendId: text("friend_id")
    .notNull()
    .references(() => userSchema.id, {
      onDelete: "cascade",
      onUpdate: "no action",
    }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const friendRelation = relations(friendSchema, ({ one }) => ({
  friends: one(userSchema, {
    fields: [friendSchema.friendId],
    references: [userSchema.id],
  }),
}));
