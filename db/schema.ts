import { sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
export const favorites = sqliteTable('favorites', {
 userId: text('user_id').notNull(), wineId: text('wine_id').notNull(), vintage: text('vintage').notNull(), createdAt: text('created_at').notNull(),
}, table => [primaryKey({columns:[table.userId,table.wineId,table.vintage]})]);
