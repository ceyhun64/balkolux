import dotenv from "dotenv";
dotenv.config();
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import productData from "@/data/products.json" assert { type: "json" };

// 👑 Admin Role enum
enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

// 👑 Admin interface
interface Admin {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRole;
}

// 🛍 Product interface (seed için gerekli alanlar)
interface ProductSeed {
  title: string;
  price: number;
  rating: number;
  reviewCount?: number;
  mainImage: string;
  subImage?: string;
  subImage2?: string;
  subImage3?: string;
  subImage4?: string;
  description: string;
  category: string;
  subCategory?: string;
}

// 🏷 Category interface
interface CategorySeed {
  name: string;
}

//
// 👑 ADMIN SEED
//
async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME;
  const adminSurname = process.env.ADMIN_SURNAME;

  if (!adminEmail || !adminPassword || !adminName || !adminSurname) {
    console.log("⚠️ Admin .env bilgileri eksik, admin oluşturulmadı.");
    return;
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (existingAdmin) {
    console.log("✅ Admin zaten mevcut, atlanıyor.");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin: Admin = {
    name: adminName,
    surname: adminSurname,
    email: adminEmail,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  await prisma.user.create({ data: admin });
  console.log("👑 Admin başarıyla oluşturuldu.");
}

//
// 🧩 CATEGORY SEED
//
async function seedCategories() {
  const mainCategories: string[] = [
    "Oturma Takımları",
    "Masa Takımları",
    "Salıncak",
    "Şezlong",
    "Şemsiye",
    "Barbekü",
  ];

  for (const name of mainCategories) {
    const exists = await prisma.category.findFirst({ where: { name } });
    if (!exists) {
      const category: CategorySeed = { name };
      await prisma.category.create({ data: category });
    }
  }

  console.log("✅ Kategori seed tamamlandı.");
}

//
// 🛒 PRODUCT SEED
//
async function seedProducts() {
  console.log("Ürün sayısı:", productData.length);

  for (const p of productData as ProductSeed[]) {
    const exists = await prisma.product.findFirst({
      where: { title: p.title },
    });
    if (exists) continue;

    const category = await prisma.category.findFirst({
      where: { name: p.category },
    });
    if (!category) {
      console.log(
        `⚠️ Category bulunamadı: ${p.category}, ürün atlandı: ${p.title}`
      );
      continue;
    }

    const subCategory = p.subCategory
      ? await prisma.subCategory.findFirst({
          where: { name: p.subCategory, categoryId: category.id },
        })
      : null;

    await prisma.product.create({
      data: {
        title: p.title,
        price: p.price,
        rating: Math.round(p.rating),
        reviewCount: p.reviewCount ?? null,
        mainImage: p.mainImage,
        subImage: p.subImage ?? null,
        subImage2: p.subImage2 ?? null,
        subImage3: p.subImage3 ?? null,
        subImage4: p.subImage4 ?? null,
        description: p.description,
        categoryId: category.id,
        subCategoryId: subCategory?.id ?? null,
      },
    });

    console.log(`✅ Ürün eklendi: ${p.title}`);
  }

  console.log("🎉 Ürün seed tamamlandı.");
}

//
// 🚀 MAIN
//
async function main() {
  await seedAdmin();
  await seedCategories();
  await seedProducts();
}

main()
  .then(() => console.log("🎉 Seed işlemi başarıyla tamamlandı!"))
  .catch((e) => {
    console.error("🚨 Seed sırasında hata oluştu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
