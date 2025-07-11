/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("threads", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "VARCHAR(150)",
      notNull: true,
    },
    body: {
      type: "TEXT",
      notNull: true,
    },
    owner: {
      type: "VARCHAR(50)",
      references: "users",
      onDelete: "CASCADE",
      notNull: true,
    },
    created_at: {
      type: "TEXT",
      notNull: true,
      default: pgm.func("NOW()"), // Mengatur nilai default ke waktu saat ini
    },
    updated_at: {
      type: "TEXT",
      notNull: true,
      default: pgm.func("NOW()"), // Mengatur nilai default ke waktu saat ini
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("threads");
};
