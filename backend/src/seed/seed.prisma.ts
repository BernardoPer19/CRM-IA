// src/seed/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
  console.log("🚨 Eliminando todos los datos...");

  await prisma.message.deleteMany();
  await prisma.product.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  console.log("🧹 Datos eliminados");

  // Crear categorías
  const categorias = await Promise.all([
    prisma.category.create({ data: { name: 'Electrónica' } }),
    prisma.category.create({ data: { name: 'Ropa' } }),
    prisma.category.create({ data: { name: 'Hogar' } }),
  ]);

  console.log("📁 Categorías creadas");

  // Crear el admin fijo
  const admin = await prisma.user.create({
    data: {
      name: "Agustin Bernardo",
      lastName: "Preedo Rodriguz",
      phone: 64854829,
      img: faker.image.avatarGitHub(), 
      email: "wawxper08@gmail.com",
      password:await bcrypt.hash("123123", 10), 
      role: Role.ADMIN,
    },
  });

  console.log(`👑 Admin creado: ${admin.name} ${admin.lastName}`);

  const empleados = await Promise.all(
    Array.from({ length: 9 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.number.int({ min: 60000000, max: 79999999 }),
          img: faker.image.avatarGitHub(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: Role.EMPLOYEE,
        },
      })
    )
  );

  const usuarios = [admin, ...empleados];

  console.log(`👷‍♂️ Se crearon ${usuarios.length} usuarios en total`);

  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.client.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          assignedToId: i < 5 ? usuarios[i]!.id : null,
        },
      })
    )
  );

  console.log("👥 Clientes creados");

  await Promise.all(
    Array.from({ length: 30 }).map(() => {
      const categoria = faker.helpers.arrayElement(categorias);
      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
          stock: faker.number.int({ min: 0, max: 100 }),
          img: faker.image.url(),
          categoryId: categoria.id,
        },
      });
    })
  );

  const iaUser = await prisma.user.create({
    data: {
      name: "Bot",
      lastName: "IA",
      phone: 70000000,
      img: "https://i.pravatar.cc/150?img=3", // avatar fijo
      email: "bot@example.com",
      password: await bcrypt.hash("123123", 10),
      role: Role.IA,
    },
  });

  console.log(`🤖 Usuario IA creado: ${iaUser.email} (rol IA)`);

  console.log("📦 30 Productos creados");

  console.log("✅ Seed ejecutado con éxito 🚀");
}
