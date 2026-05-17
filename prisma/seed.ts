import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    const hashedPassword = await bcrypt.hash("senha_loja_teste", 10)

    const store = await prisma.store.upsert({
        where: { email: "storeTest@test.com" },
        update: {},
        create: { name: "storeTest", email: "storeTest@test.com", password: hashedPassword },
    });
     
    const category = await prisma.category.upsert({
        where: { name: "categoryTest" },
        update: {},
        create: { name: "categoryTest" }
    });

    const product = await prisma.product.upsert({
        where: { 
            sku_storeId: {
                sku: "SKU-001", storeId: store.id
            } 
        },
        update: {},
        create: {
            sku: "SKU-001",
            name: "productTest",
            price: 50.00,
            stock: 5,
            storeId: store.id,
            categoryId: category.id
        }
    });

    console.log({ store: store.email, category: category.name, product: product.sku });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () =>  {
        await prisma.$disconnect()
    })


