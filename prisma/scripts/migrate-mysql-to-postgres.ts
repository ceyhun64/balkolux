// Bir kerelik veri taşıma script'i: MySQL kaynağından PostgreSQL hedefine kopyalar.
// Kullanım: SOURCE_MYSQL_URL ve TARGET_POSTGRES_URL env değişkenlerini vererek çalıştırılır.
//   npx tsx prisma/scripts/migrate-mysql-to-postgres.ts
import mysql from "mysql2/promise";
import { Client } from "pg";

const SOURCE_MYSQL_URL = process.env.SOURCE_MYSQL_URL;
const TARGET_POSTGRES_URL = process.env.TARGET_POSTGRES_URL;

if (!SOURCE_MYSQL_URL || !TARGET_POSTGRES_URL) {
  console.error("SOURCE_MYSQL_URL ve TARGET_POSTGRES_URL environment değişkenleri gerekli.");
  process.exit(1);
}

// Foreign key bağımlılıklarına göre sıralı: önce bağımsız tablolar, sonra bağımlılar.
const TABLES_IN_ORDER = [
  "user",
  "category",
  "sub_category",
  "product",
  "blog",
  "Banner",
  "coupons",
  "address",
  "order",
  "orderitem",
  "orderaddress",
  "cartitem",
  "review",
  "favorite",
  "subscribe",
] as const;

// Autoincrement (SERIAL) id kolonu olan tablolar (coupons hariç, onun id'si TEXT/cuid).
const SERIAL_ID_TABLES = TABLES_IN_ORDER.filter((t) => t !== "coupons");

// MySQL'de BOOLEAN aslında TINYINT(1) olarak döner (0/1 number); Postgres BOOLEAN kolonuna
// yazarken gerçek boolean'a çevrilmesi gereken kolonlar.
const BOOLEAN_COLUMNS: Record<string, string[]> = {
  coupons: ["isActive"],
};

async function main() {
  const mysqlConn = await mysql.createConnection(SOURCE_MYSQL_URL!);
  const pg = new Client({ connectionString: TARGET_POSTGRES_URL });
  await pg.connect();

  try {
    await pg.query("BEGIN");

    for (const table of TABLES_IN_ORDER) {
      const [rows] = await mysqlConn.query<mysql.RowDataPacket[]>(
        `SELECT * FROM \`${table}\``
      );

      if (rows.length === 0) {
        console.log(`${table}: 0 satır, atlanıyor`);
        continue;
      }

      const columns = Object.keys(rows[0]);
      const boolCols = new Set(BOOLEAN_COLUMNS[table] ?? []);

      const colList = columns.map((c) => `"${c}"`).join(", ");
      const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
      const insertSql = `INSERT INTO "${table}" (${colList}) VALUES (${placeholders})`;

      for (const row of rows) {
        const values = columns.map((c) => {
          const v = row[c];
          if (boolCols.has(c)) return v === null ? null : Boolean(v);
          return v;
        });
        await pg.query(insertSql, values);
      }

      console.log(`${table}: ${rows.length} satır kopyalandı`);
    }

    for (const table of SERIAL_ID_TABLES) {
      await pg.query(
        `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE((SELECT MAX(id) FROM "${table}"), 1), (SELECT MAX(id) IS NOT NULL FROM "${table}"))`
      );
    }
    console.log("Sequence'ler senkronize edildi.");

    await pg.query("COMMIT");
    console.log("Taşıma tamamlandı.");
  } catch (err) {
    await pg.query("ROLLBACK");
    console.error("Hata oluştu, tüm değişiklikler geri alındı:", err);
    process.exit(1);
  } finally {
    await mysqlConn.end();
    await pg.end();
  }
}

main();
